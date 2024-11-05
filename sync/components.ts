import { Glob } from "bun";

async function fetchDocumentationHTML(url: string): Promise<Response> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch documentation: ${response.statusText}`);
	}
	return response;
}

async function extractComponents(response: Response): Promise<string[]> {
	const components: string[] = [];
	await new HTMLRewriter()
		.on("aside div.pb-4:nth-of-type(3) div.grid a", {
			element(element) {
				for (const [name, value] of element.attributes) {
					if (name === "href") {
						components.push(value.replace("/docs/components/", ""));
					}
				}
			},
		})
		.transform(response)
		.text();

	return components;
}

export async function getLatestComponents() {
	const documentationURL = "https://ui.shadcn.com/docs";
	const res = await fetchDocumentationHTML(documentationURL);

	return await extractComponents(res);
}

function match(path: string) {
	const match = path.match(/src\/components\/ui\/(.*?)\./);

	if (match && match[1]) {
		return match[1];
	} else {
		console.error("No match found for:", path);
		return "";
	}
}

export async function getCurrentComponents() {
	const glob = new Glob("src/components/ui/*");
	const components: string[] = [];
	for await (const file of glob.scan(".")) {
		// console.log(file);
		components.push(match(file));
	}

	console.log("Files:");
	console.log(components);
	return components;
}

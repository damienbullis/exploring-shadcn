import { getCurrentComponents, getLatestComponents } from "./components.ts";

function getDifference(latestComponents: string[], currentComponents: string[]): string[] {
	return latestComponents.filter((component) => {
		if (!currentComponents.includes(component)) {
			return true;
		} else {
			console.log(`Component ${component} already exists.`);
			return false;
		}
	});
}
const RESET = "\u001b[0m";
function color(c: string, text: string) {
	return Bun.color(c, "ansi") + text + RESET;
}

type LibraryData = {
	newComponents: string[];
	shadcnVersion: string;
	lastUpdated: Date;
};

const library = {
	toJson(data: LibraryData) {
		return JSON.stringify(data, null, 2);
	},
	toData(json: string) {
		return JSON.parse(json) as LibraryData;
	},
};

// NEXT: use Bun.$`` to get the latest version of shadcn
function getVersion() {
	return "0.0.1";
}

async function main() {
	const latestComponents = await getLatestComponents();
	const currentComponents = await getCurrentComponents();
	const newComponents = getDifference(latestComponents, currentComponents);

	console.log("New components:");
	console.log(newComponents);
	for (const component of newComponents) {
		console.log(color("green", component));
	}

	const data: LibraryData = {
		newComponents,
		shadcnVersion: getVersion(),
		lastUpdated: new Date(),
	};

	// NEXT: write json to => src/assets/libraryData.json
}

await main();

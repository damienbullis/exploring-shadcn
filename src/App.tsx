// import { useState } from "react";

function Runner() {
	return (
		<div className="w-[500px] aspect-square p-4 border border-slate-800 dark:border-slate-200 rounded-lg relative">
			<p className="font-mono absolute bottom-full pb-1">Component</p>
		</div>
	);
}
// const apiUrl = "http://localhost:8788";

// async function fetchLatest() {
// 	try {
// 		const res = await fetch(`${apiUrl}/get-latest`);

// 		if (!res.ok) {
// 			throw new Error(`Failed to fetch latest: ${res.statusText}`);
// 		}

// 		const data = (await res.json()) as { components: string[] };
// 		return data;
// 	} catch (err) {
// 		const error = err instanceof Error ? err.message : "An unknown error occurred";
// 		console.error(error);
// 	}
// }

function App() {
	// const [count, setCount] = useState(0);

	return (
		<div className="w-full h-full grid place-content-center">
			<Runner />
		</div>
	);
}

export default App;

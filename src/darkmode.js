// darkmode.js

/**
 * Init Darkmode
 * - checks for dark mode preference
 * - applies `at-dark` class to the root element if dark mode is preferred
 * - handles OS color-scheme change events
 */
function initializeDarkMode() {
	const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
	if (localStorage.getItem("darkMode") === "true" || darkMode.matches) {
		document.documentElement.classList.add("dark");
	}

	// This wont set the local storage on change, but it will update the class
	darkMode.addEventListener("change", (e) => {
		if (e.matches) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});
}

initializeDarkMode();

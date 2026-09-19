const STORAGE_KEY = "theme";

/**
 * Inline script string, injected into <head> before hydration so the
 * correct theme paints on first frame — no flash of the wrong theme.
 * Kept in its own plain (non-component) module: mixing this with the
 * ThemeProvider component in one file defeats Fast Refresh and forces a
 * full reload on every edit to that file.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export { STORAGE_KEY };

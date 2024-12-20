import { renderView } from "./utils/router.js";

const renderApp = () => {
  renderView();
};

document.addEventListener("DOMContentLoaded", renderApp);

window.addEventListener("popstate", renderView);

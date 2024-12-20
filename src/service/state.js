import { matchRoute } from "../utils/router";
import { loadUserFromLocalStorage } from "./auth";

let state = {
  user: loadUserFromLocalStorage() || null,
};

const setUser = (user) => {
  state.user = user;
  localStorage.setItem("user", JSON.stringify(user));

  renderApp();
};

const removeUser = () => {
  state.user = null;
  localStorage.removeItem("user");

  renderApp();
};

const getUser = () => state.user;

const renderApp = () => {
  const match = matchRoute(); // Get the matching route
  const app = document.getElementById("root");

  if (match.route.path === "/profile") {
    const user = state.getUser();
    if (!user) {
      alert("로그인 후 접근할 수 있습니다.");
      window.location.hash = "/login";
      return;
    }
    app.innerHTML = match.route.view(user);
  } else {
    app.innerHTML = match.route.view();
  }
};

export default {
  setUser,
  removeUser,
  getUser,
};

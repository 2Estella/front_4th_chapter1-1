import MainPage from "./../pages/MainPage.js";
import ProfilePage from "./../pages/ProfilePage.js";
import LoginPage from "./../pages/LoginPage.js";
import NotFoundPage from "../pages/NotFoundPage.js";

const routes = [
  { path: "/", view: MainPage },
  { path: "/profile", view: ProfilePage },
  { path: "/login", view: LoginPage },
  { path: "*", view: NotFoundPage },
];

/**
 * URL에 맞는 라우트를 찾는 함수
 * @returns
 */
const matchRoute = () => {
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  const match = potentialMatches.find((match) => match.isMatch);
  return match
    ? match
    : { route: routes.find((route) => route.path === "*"), isMatch: true };
};

/**
 * 라우트에 맞는 화면 콘텐츠를 렌더링하는 함수
 */
const renderView = () => {
  const match = matchRoute();
  const app = document.getElementById("root");

  if (typeof match.route.view === "function") {
    app.innerHTML = match.route.view();
  } else if (
    typeof match.route.view === "object" &&
    typeof match.route.view.render === "function"
  ) {
    app.innerHTML = match.route.view.render();
  } else {
    console.error(
      "The view for the route is not a valid renderable component.",
    );
  }
};

/**
 * 페이지 탐색을 위해 URL을 변경하는 함수
 * @param {*} url
 */
const navigateTo = (url) => {
  history.pushState(null, null, url);
  renderView();
};

/**
 * 브라우저의 뒤로가기/앞으로가기 버튼에 대응하는 이벤트 핸들러
 */
window.addEventListener("popstate", renderView);

/**
 * 모든 링크에 이벤트 리스너 추가 (data-link 속성을 가진 링크 클릭 시 새로고침 방지)
 */
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  renderView();
});

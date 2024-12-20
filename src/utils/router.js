import state from "../service/state.js";
import MainPage from "../pages/MainPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import LoginPage from "../pages/LoginPage.js";
import NotFoundPage from "../pages/NotFoundPage.js";

// Define the routes
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
export const matchRoute = () => {
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch:
        location.pathname === route.path ||
        (route.path === "*" && location.pathname !== "/"),
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
export const renderView = () => {
  const match = matchRoute();
  const app = document.getElementById("root");

  if (match.route.path === "/profile") {
    const user = state.getUser();
    if (!user) {
      alert("로그인 후 접근할 수 있습니다.");
      navigateTo("/login");
      return;
    }

    app.innerHTML = match.route.view(user);

    document
      .getElementById("profileForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const updatedBio = document.getElementById("bio").value;

        if (updatedBio) {
          const updatedUser = { ...user, bio: updatedBio };
          state.setUser(updatedUser);
          renderView();
        } else {
          alert("자기소개를 입력해주세요!");
        }
      });
  } else {
    app.innerHTML = match.route.view();
  }
};

/**
 * 페이지 탐색을 위해 URL을 변경하는 함수
 * @param {*} url
 */
export const navigateTo = (url) => {
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

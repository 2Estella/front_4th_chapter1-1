export default function Navbar() {
  // const user = localStorage.getItem("user");
  const path = window.location.pathname;

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${path === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
        <li><a href="/profile" class="${path === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
        <li><a href="javascript:void(0);" class="text-gray-600">로그아웃</a></li>
      </ul>
    </nav>
  `;
}

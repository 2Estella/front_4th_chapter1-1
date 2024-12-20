import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

export function Layout(children) {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Navbar()}

        ${children()}

        ${Footer()}
      </div>
    </div>
  `;
}

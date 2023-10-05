import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ headerText, link, linkText }) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("access_token");
    router.push("/login");
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h1 className="text-2xl sm:text-4xl font-semibold text-center sm:text-left text-blue-600 mb-2 sm:mb-0">
        {headerText}
      </h1>
      <div className="flex items-center gap-2 sm:gap-5">
        <Link href={link}>
          <span className="text-blue-500 font-semibold cursor-pointer">
            {linkText}
          </span>
        </Link>
        <span
          onClick={logout}
          className="text-blue-500 font-semibold cursor-pointer"
        >
          Logout
        </span>
      </div>
    </div>
  );
}

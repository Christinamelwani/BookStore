import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({ headerText, link, linkText }) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("access_token");
    router.push("/login");
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-4xl font-semibold text-center text-blue-600">
        {headerText}
      </h1>
      <div className="flex items-center gap-5">
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

import { useRouter } from "next/router";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const hasAccessToken = !!localStorage.getItem("access_token");
    if (!hasAccessToken) {
      router.push("/login"); // Redirect to login page if no access token
    }
  }, []);

  return <>{children}</>;
}

export default ProtectedRoute;

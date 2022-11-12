import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  // TODO: delete accessToken from cookies and redirect to login page
  const router = useRouter();
  useEffect(() => {
    document.cookie =
      "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.back();
  }, []);
  return null;
};

export default Logout;

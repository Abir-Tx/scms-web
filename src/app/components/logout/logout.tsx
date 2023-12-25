// components/Logout.js

import React from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the stored email from local storage
    localStorage.removeItem("email");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

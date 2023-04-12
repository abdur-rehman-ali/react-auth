import React from "react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();
  const { userName, userEmail, userRole } = auth;
  return (
    <div>
      {auth && (
        <span>
          <span>{userName}</span> -<span>{userEmail}</span> -
          <span>{userRole}</span>
        </span>
      )}
    </div>
  );
};

export default Navbar;

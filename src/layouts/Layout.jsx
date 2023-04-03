import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App">
      <Link to="/">Go to Home</Link>
      <Outlet />
    </main>
  );
};

export default Layout;

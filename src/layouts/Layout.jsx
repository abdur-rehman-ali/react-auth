import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <main className="App">
      <Link to="/">Go to Home</Link>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;

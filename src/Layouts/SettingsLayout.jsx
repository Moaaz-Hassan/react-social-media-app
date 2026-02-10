import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function SettingsLayout() {
  return (
    <div className="min-h-screen relative">
      <div className=" absolute top-0 left-0 right-0 h-10 z-50 flex items-center justify-between">
        <h2 className=" text-2xl md:text-3xl font-bold text-gray-700 ">
          settings
        </h2>
        <div className=" flex gap-4 text-xl tracking-tighter font-medium text-gray-700 ">
          <NavLink className=" "  to={"/settings"}>Change Password</NavLink>
          <NavLink className="  " to={"logOut"}>log Out</NavLink>
        </div>
      </div>
      <div className="pt-12">
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsLayout;

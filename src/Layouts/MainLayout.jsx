import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import OpenScrean from "../Components/OpenScrean";

function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div>
      {loading ? (
        <OpenScrean/>
      ) : (
        <div>
          <NavBar />
          <div className="mt-[85px] lg:w-[75%] w-[95%] md:w-[85%] mx-auto">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout;


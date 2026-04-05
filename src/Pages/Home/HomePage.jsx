import PostForm from "../../Components/postComponents/PostForm";
import { useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { Outlet } from "react-router-dom";

import { useLocation } from "react-router-dom";

function HomePage() {
  const [postForUpdating, setPostForUpdating] = useState(null);
  const location = useLocation();
  const queryKeyes = location.pathname.slice(1) ? location.pathname.slice(1) : "feed"

  return (
    <div className="">
      <PostForm postForUpdating={postForUpdating} queryKey={queryKeyes} />
      <HomeNavbar />
      <Outlet context={{ setPostForUpdating , queryKeyes  }} />
    </div>
  );
}

export default HomePage;

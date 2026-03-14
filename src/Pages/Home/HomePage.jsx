import PostForm from "../../Components/postComponents/PostForm";
import { useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { Outlet } from "react-router-dom";

function HomePage() {
  const [postForUpdating, setPostForUpdating] = useState(null);
  const [queryKeyes, setOueryKeyes] = useState();


  return (
    <div className="">
      <PostForm postForUpdating={postForUpdating} queryKey={queryKeyes} />
      <HomeNavbar />
      <Outlet context={{setPostForUpdating , setOueryKeyes}} />
    </div>
  );
}

export default HomePage;

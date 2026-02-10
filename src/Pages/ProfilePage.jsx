import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthenticationCntext from "../Context/AuthenticationCntext";
import { getUserPost } from "../Services/postServices";
import CreatPostCard from "../Components/postComponents/CreatePostCard";
import PostForm from "../Components/postComponents/PostForm";
import { uploadProfilePhoto } from "../Services/userprofile";
import { getLogedUserData } from "../Services/loginServices";
import Placeholder from "../assets/62010d848b790a2336d1542fcda51789.jpg";
import { Link } from "react-router-dom";
import PostLoadingScrean from "../Components/PostLoadingScrean";
import { queryClient } from "../App";
import { useQuery } from "@tanstack/react-query";

function ProfilePage() {
  let { userData, setuserData } = useContext(AuthenticationCntext);
  const [lodingPhoto, setLodingPhoto] = useState(false);
  const [postForUpdating, setPostForUpdating] = useState(null);

  const [posts, setPosts] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["getUserPost"],
    queryFn: getUserPost,
  });

  // "error": "\"sort\" is not allowed" so i have to do it 
  function reversePosts() {
    if (!isLoading) {
      let reversedposts = structuredClone(data.posts);
      reversedposts.reverse();
      setPosts(reversedposts);
    }
  }

  useEffect(() => {
    reversePosts();
  }, [data]);

  async function handelImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setLodingPhoto(true);
      await uploadProfilePhoto(formData);
      const user = await getLogedUserData();
      setuserData(user.user);
      await queryClient.invalidateQueries(["getUserPost"]);
    } catch (err) {
      console.log(err);
    }
    setLodingPhoto(false);
  }

  return (
    <>
      <div className="  bg-white my-2 p-4 rounded-medium ">
        <div className=" mt-5 flex items-center gap-3 relative">
          <Link to={"/settings"}>
            <svg
              className="size-8 absolute top-4 right-2 cursor-pointer active:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>

          <div className="relative aspect-square w-[30%] md:w-[25%] lg:w-[20%] bg-blue-500 rounded-full overflow-hidden">
            <img
              src={lodingPhoto ? Placeholder : userData?.photo}
              className="w-full h-full object-cover"
            />
            <label htmlFor="profileImage">
              <svg
                className="absolute bottom-1 left-1/2 -translate-x-1/2 size-8 md:size-10 text-white cursor-pointer active:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </label>
            <input
              onChange={handelImage}
              id="profileImage"
              className=" border-1 hidden"
              type="file"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className=" text-2xl md:text-3xl lg:text-4xl">
              {userData?.name}
            </h2>
            <h2>{userData?.dateOfBirth?.split("T")[0]}</h2>
          </div>
        </div>

        <PostForm postForUpdating={postForUpdating} queryKey={"getUserPost"} />

        {isLoading ? (
          <PostLoadingScrean />
        ) : (
          posts?.map((post) => (
            <CreatPostCard
              key={post.id}
              post={post}
              isFullView={false}
              setPostForUpdating={setPostForUpdating}
              queryKey={"getUserPost"}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ProfilePage;

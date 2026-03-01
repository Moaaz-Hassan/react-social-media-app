import React from "react";
import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PostLoadingScrean from "../Components/PostLoadingScrean";
import {
  fetchAllPosts,
  fetchHomeFeed,
  fetchBookmarks,
  fetchUserPosts,
} from "../Services/postServices";
import CreatPostCard from "../Components/postComponents/CreatePostCard";
import PostForm from "../Components/postComponents/PostForm";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import PostOption from "../Components/postComponents/PostOption";
import AuthenticationCntext from "../Context/AuthenticationCntext";
import { useContext } from "react";

function HomePage() {
  let { userData } = useContext(AuthenticationCntext);

  const [postForUpdating, setPostForUpdating] = useState(null);

  const [postesOption, setPostesOption] = useState("Feed");
  // const [fetchFunction, setFetchFunction] = useState();

  const { ref, inView } = useInView({
    rootMargin: "500px",
  });


  console.log(userData._id)


const postsQueryMap = useMemo(() => ({
  Feed: fetchHomeFeed,
  Community: fetchAllPosts,
  "Saved Posts": fetchBookmarks,
  "My Posts": (params) =>
    fetchUserPosts({ ...params, userId: userData._id }),
}), [userData._id]);

  const {
    data,
    fetchNextPage,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fetchPostes", postesOption],
    queryFn: postsQueryMap[postesOption],
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.pagination.nextPage ?? undefined,
  });

  console.log(data)

  // useEffect(() => {
  //   if (postesOption == "Feed") {
  //     setFetchFunction(fetchHomeFeed);
  //   } else if (postesOption == "My Posts") {
  //     setFetchFunction(fetchUserPosts);
  //   } else if (postesOption == "Community") {
  //     setFetchFunction(fetchAllPosts);
  //   } else {
  //     setFetchFunction(fetchBookmarks);
  //   }
  // }, [postesOption]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isError) {
    return (
      <div className=" flex items-center justify-center">
        <h2 className=" text-medium font-medium text-red-600">
          An error occurred, please try again.{" "}
        </h2>
      </div>
    );
  }

  return (
    <div className="">
      <PostOption
        postesOption={postesOption}
        setPostesOption={setPostesOption}
      />
      <PostForm postForUpdating={postForUpdating} queryKey={"getAllPostes"} />

      {/* {data?.pages.map((page) =>
        page.posts.map((post) => (
          <CreatPostCard key={post.id} post={post} isFullView={false}  setPostForUpdating={setPostForUpdating} queryKey={"getAllPostes"} />
        )),
      )}

      <div ref={ref} className="flex justify-center items-center mt-20">
        {isFetching && <PostLoadingScrean />}
      </div> */}
    </div>
  );
}

export default HomePage;

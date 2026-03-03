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

  const { ref, inView } = useInView({
    rootMargin: "500px",
  });

  const postsQueryMap = useMemo(() => {
    if (!userData) {
      setPostesOption("Feed");
    }

    return {
      Feed: fetchHomeFeed,
      Community: fetchAllPosts,
      "Saved Posts": fetchBookmarks,
      "My Posts": (params) =>
        fetchUserPosts({ ...params, userId: userData._id }),
    };
  }, [userData]);

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
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  console.log(data);

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
      <PostForm postForUpdating={postForUpdating} queryKey={"getAllPostes"} />
      <PostOption
        postesOption={postesOption}
        setPostesOption={setPostesOption}
      />

      {postesOption == "Saved Posts"
        ? data?.pages?.map((page) =>
            page.data.bookmarks.map((post) => (
              <CreatPostCard
                key={post._id}
                post={post}
                isFullView={false}
                setPostForUpdating={setPostForUpdating}
                queryKey={[["fetchPostes", "Feed"]]}
              />
            )),
          )
        : data?.pages?.map((page) =>
            page.data.posts.map((post) => (
              <CreatPostCard
                key={post._id}
                post={post}
                isFullView={false}
                setPostForUpdating={setPostForUpdating}
                queryKey={[["fetchPostes", "Feed"]]}
              />
            )),
          )}

      <div ref={ref} className="flex justify-center items-center mt-4">
        {isFetching && <PostLoadingScrean />}
      </div>
    </div>
  );
}

export default HomePage;

import React from "react";
import { useEffect} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PostLoadingScrean from "../Components/PostLoadingScrean";
import { fetchAllPosts } from "../Services/postServices";
import CreatPostCard from "../Components/postComponents/CreatePostCard";
import PostForm from "../Components/postComponents/PostForm";
import { useState } from "react";


function HomePage() {
  
  const [postForUpdating , setPostForUpdating ] = useState(null) ;
  
  const { ref, inView } = useInView({
    rootMargin: "500px",
  });

  const {
    data,
    fetchNextPage,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllPostes"],
    queryFn: fetchAllPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.paginationInfo.nextPage ?? undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="">
      <PostForm postForUpdating={postForUpdating} queryKey= {"getAllPostes"}/>

      {data?.pages.map((page) =>
        page.posts.map((post) => (
          <CreatPostCard key={post.id} post={post} isFullView={false}  setPostForUpdating={setPostForUpdating} queryKey={"getAllPostes"} />
        )),
      )}

      <div ref={ref} className="flex justify-center items-center mt-20">
        {isFetching && <PostLoadingScrean />}
      </div>
    </div>
  );
}

export default HomePage;

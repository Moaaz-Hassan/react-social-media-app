import { fetchBookmarks } from "../../Services/postServices";
import { useInView } from "react-intersection-observer";
import PostLoadingScrean from "../../Components/PostLoadingScrean";
import CreatPostCard from "../../Components/postComponents/CreatePostCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function SavedPosts() {
  const { setPostForUpdating, setOueryKeyes } = useOutletContext();
  const { ref, inView } = useInView({
    rootMargin: "500px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  useEffect(() => {
    setOueryKeyes(["fetchBookmarksPostes"]);
  }, []);

  const {
    data,
    fetchNextPage,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fetchBookmarksPostes"],
    queryFn: fetchBookmarks,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.pagination.nextPage ?? undefined,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

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
    <div>
      {data?.pages?.map((page) =>
        page.data.bookmarks.map(
          (post) =>
            post && (
              <CreatPostCard
                key={post._id}
                post={post}
                setPostForUpdating={setPostForUpdating}
                queryKey={["fetchBookmarksPostes"]}
              />
            ),
        ),
      )}

      <div ref={ref} className="flex justify-center items-center mt-4">
        {isFetching && <PostLoadingScrean />}
      </div>
    </div>
  );
}

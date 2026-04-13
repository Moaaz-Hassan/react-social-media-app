import { useParams } from "react-router-dom";
import { GetUserProfile } from "../Services/FriendsServices";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import { ToggelFollow } from "../Services/FriendsServices";
import { useState } from "react";
import { Spinner } from "@heroui/react";
import { queryClient } from "../App";
import { fetchUserPosts } from "../Services/postServices";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import PostLoadingScrean from "../Components/PostLoadingScrean";
import CreatPostCard from "../Components/postComponents/CreatePost/CreatePostCard";

function UsersProfilePage() {
  const { id } = useParams();
  const [loding, seLoding] = useState(false)

  async function Follow() {
    seLoding(true)
    const respons = await ToggelFollow(id)
    if (respons.success) {
      await queryClient.invalidateQueries({ queryKey: ["getUser", id] })
    }

    seLoding(false)
  }

  const { data: userData, isLoading: isLoadingUserData, isError: isErrorUserData } = useQuery({
    queryKey: [`getUser`, id],
    queryFn: () => GetUserProfile(id),
    enabled: !!id,

  })


  const { ref, inView } = useInView({
    rootMargin: "500px",
  });


  const {
    data,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getUserPost", id],
    queryFn: ({ pageParam }) =>
      fetchUserPosts({ pageParam, userId: id }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.pagination.nextPage ?? undefined,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);


  if (isErrorUserData) {
    return (
      <div className=" flex items-center justify-center">
        <h2 className=" text-medium font-medium text-red-600">
          An error occurred, please try again.{" "}
        </h2>
      </div>
    );
  }

  return <div>
    <div className=" h-30 md:h-36 mt-7 rounded-xl bg-white border border-blue-100/50 shadow-xl flex items-center justify-center p-4">
      {isLoadingUserData ? <h2 className=" text-xl text-gray-600 font-medium">loading user profile...</h2>
        :
        <div className=" flex items-center justify-between w-full ">
          <div className=" flex items-center justify-between">
            <img className=" w-16 md:w-24 object-cover h-16 md:h-24 rounded-full " src={userData.data.user.photo} alt="" />
            <div>
              <h2 className=" text-medium font-medium">{userData.data.user.name}</h2>
              <h2 className=" text-sm font-light">@{userData.data.user.username}</h2>
            </div>
          </div>
          <Button onPress={Follow} color={userData.data.isFollowing ? "white" : `primary`} className={`${userData.data.isFollowing && " border-1 border-blue-500"}`}>
            {loding ? (<Spinner color={userData.data.isFollowing ? "primary" : `white`} size="sm" />) : (
              userData.data.isFollowing ? (
                < div className=" flex gap-1" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                  </svg>
                  Unfollow
                </div>)
                :
                (<div className=" flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                  </svg>
                  Follow</div>))

            }
          </Button>

        </div>
      }
    </div >

    <div className=" mt-4">
      {isLoading ? (
        <PostLoadingScrean />
      ) : (
        <div>

          {data?.pages?.map((page) =>
            page.data.posts.length == 0 ?
              <h2 className=" text-center mt-9">he hasn't posted any thing yat </h2>
              :
              page.data.posts.map(
                (post) =>
                  post && (
                    <CreatPostCard
                      key={post._id}
                      post={post}
                    />
                  ),
              ),
          )}

          <div ref={ref} className="flex justify-center items-center mt-4">
            {isFetching && <PostLoadingScrean />}
          </div>
        </div>
      )}

    </div>



  </div >;
}

export default UsersProfilePage;



// {success: true, message: 'success', data: {…}}
// data
// :
// isFollowing
// :
// false
// user
// :
// bookmarksCount
// :
// 0
// cover
// :
// ""
// createdAt
// :
// "2026-04-13T17:29:03.243Z"
// dateOfBirth
// :
// "2000-12-12T00:00:00.000Z"
// email
// :
// "mezohssan554433#m@gmail.com"
// followers
// :
// [{…}]
// followersCount
// :
// 1
// following
// :
// (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// followingCount
// :
// 7
// gender
// :
// "male"
// id
// :
// "69dd27df40873fb7bd169e89"
// name
// :
// "Moaaz Hsssan"
// photo
// :
// "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1776102405816-7d195c7b-feeb-4586-87e8-6f468137ed5b-e0b67061f08d8c27c506655cf74d4497.webp"
// username
// :
// "moaaz12355"
// _id
// :
// "69dd27df40873fb7bd169e89"
// [[Prototype]]
// :
// Object
// [[Prototype]]
// :
// Object
// message
// :
// "success"
// success
// :
// true
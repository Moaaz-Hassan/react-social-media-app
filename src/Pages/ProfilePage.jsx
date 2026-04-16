import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthenticationCntext from "../Context/AuthenticationCntext";
import { fetchUserPosts } from "../Services/postServices";
import CreatPostCard from "../Components/postComponents/CreatePost/CreatePostCard";
import PostForm from "../Components/postComponents/PostForm";
import { uploadProfilePhoto } from "../Services/userprofile";
import PostLoadingScrean from "../Components/PostLoadingScrean";
import { queryClient } from "../App";
import { useInView } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";

function ProfilePage() {
  const [openimage, setOpenimage] = useState(false)
  let { userData } = useContext(AuthenticationCntext);
  const { ref, inView } = useInView({
    rootMargin: "500px",
  });
  const [lodingPhoto, setLodingPhoto] = useState(false);
  const [postForUpdating, setPostForUpdating] = useState(null);


  const {
    data,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getUserPost"],
    queryFn: ({ pageParam }) =>
      fetchUserPosts({ pageParam, userId: userData.id }),
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


  async function handelImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setLodingPhoto(true);
      const respons = await uploadProfilePhoto(formData);
      await queryClient.invalidateQueries(["getUserData"])
      await queryClient.invalidateQueries(["getUserPost"]);
    } catch (err) {
      console.log(err);
    }
    setLodingPhoto(false);
  }

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
    <>
      <div className="  bg-white my-2 p-4 rounded-medium ">
        <div className=" mt-5 flex mg:items-center md:flex-row flex-col gap-3 justify-between ">
          <div className=" flex  items-center gap-3  ">
            <div className="relative aspect-square w-32  ">
              <img
                src={userData?.photo}
                className="w-full h-full object-cover rounded-full overflow-hidden "
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenimage(true)
                }}
              />
              <div className=" absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 ">


                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=> setOpenimage(true)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 md:size-8 cursor-pointer p-1 rounded-full border border-gray-500 bg-white text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                {lodingPhoto ?
                 <Spinner size="sm"  /> :
                  <label htmlFor="profileImage">
                    <svg
                      className=" size-6 md:size-8 cursor-pointer p-1 rounded-full border  text-white bg-blue-600"
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
                  </label>}
                <input
                  onChange={handelImage}
                  id="profileImage"
                  className=" border-1 hidden"
                  type="file"
                />
              </div>




            </div>

            <div className="flex flex-col gap-1 ">
              <h2 className=" text-2xl md:text-3xl  font-bold">
                {userData?.name}
              </h2>
              <h2>{userData?.dateOfBirth?.split("T")[0]}</h2>
            </div>
          </div>


          <div className=" grid grid-cols-3 gap-2 w-full  md:w-fit  items-center ">
            <div className="  border border-gray-200 rounded-xl flex items-center p-3 flex-col h-fit">
              <h2 className=" text-medium font-medium text-gray-500">Followers</h2>
              <h3 className=" text-black text-xl font-bold ">{userData.followersCount}</h3>
            </div>
            <div className="  border border-gray-200 rounded-xl flex items-center p-3 flex-col h-fit">
              <h2 className=" text-medium font-medium text-gray-500">Following</h2>
              <h3 className=" text-black text-xl font-bold ">{userData.followingCount}</h3>
            </div>
            <div className="  border border-gray-200 rounded-xl flex items-center p-3 flex-col h-fit">
              <h2 className=" text-medium font-medium text-gray-500">Bookmarks</h2>
              <h3 className=" text-black text-xl font-bold ">{userData.bookmarksCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <PostForm
        postForUpdating={postForUpdating}
        queryKey={["getUserPost"]}
      />

      {isLoading ? (
        <PostLoadingScrean />
      ) : (
        <div>
          {data?.pages[0].data.posts.length === 0 ?
            <h2 className=" text-sm font-bold text-gray-800 my-4 text-center"> You have not posted yet.</h2>
            : data?.pages?.map((page) =>
              page.data.posts.map(
                (post) =>
                  post && (
                    <CreatPostCard
                      key={post._id}
                      post={post}
                      setPostForUpdating={setPostForUpdating}
                      queryKey={["getUserPost"]}
                    />
                  ),
              ),
            )}

          <div ref={ref} className="flex justify-center items-center mt-4">
            {isFetching && <PostLoadingScrean />}
          </div>
        </div>
      )}


      {openimage &&
        <div className=" fixed top-0 left-0 right-0 bottom-0 bg-black/85 z-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => {
            setOpenimage(false)
          }} className="size-9 text-white  active:text-gray-40 absolute right-2 top-2 z-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

          <img
            className={` max-h-[95%]`}
            src={userData?.photo}
          />


        </div>
      }

    </>
  );
}

export default ProfilePage;

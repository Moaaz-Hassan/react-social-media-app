import { Link } from "react-router-dom"
import { useState } from "react";


function PostBody({ post, showAllImage, userData }) {
  const [openimage, seOpenimage] = useState(false)
  return (
    <>
      <div>

        {post.body && (
          <p className=" mt-4 mb-2 line-clamp-2 text-medium font-medium break-all  text-gray-800">
            {post.body}
          </p>
        )}
        {post.image && (
          <Link to={userData?._id === post?.user?._id ? "" : `/single-Post/${post.id}`} onClick={
            userData?._id === post?.user?._id
              ? (e) => {
                e.preventDefault();
                seOpenimage(true)
              }
              : undefined
          } >
            <img
              className={` w-full ${showAllImage ? "h-full w-full" : " h-[400px]  lg:h-[550px] lg:w-[90%] "}  mx-auto object-cover rounded-md mt-2`}
              src={post.image}
            />
          </Link>
        )}


        {(post.isShare && post.sharedPost!==null) && (
          <div className=" m-1 rounded-md border border-gray-300 bg-gray-100">
            <div className="w-full h-16 flex items-center justify-between p-2 ">
              <Link to={userData?._id === post?.sharedPost?.user?._id ? "/profile" : `/user-profile/${post?.sharedPost?.user?._id}`}>
                <div className="flex items-center">
                  <img
                    className=" rounded-full w-9 h-9 mr-2"
                    src={post?.sharedPost?.user?.photo}
                    alt={post?.sharedPost?.user?.name}
                  />
                  <div className=" flex flex-col">
                    <h3 className="text-sm font-semibold ">
                      {post?.sharedPost?.user?.name}
                    </h3>
                    <h3 className=" text-xs font-semibold">
                      @{post?.sharedPost?.user?.username}
                    </h3>
                  </div>
                </div>
              </Link>
              <Link
                to={"/single-Post/" + post?.sharedPost?.id}
                className=" text-blue-500 flex items-center gap-1 text-sm"
              >
                <h2>Original Post</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </Link>
            </div>
            <div className=" p-2">
              {post?.sharedPost?.body && (
                <p className=" my-1 text-medium break-all line-clamp-2 font-semibold text-gray-800">
                  {post?.sharedPost?.body}
                </p>
              )}
            </div>
            {post?.sharedPost?.image && (
              <img
                className={` w-full h-[350px]  lg:h-[450px] lg:w-[90%] mx-auto object-cover rounded-md mt-1`}
                src={post?.sharedPost?.image}
              />
            )}
          </div>
        )}
      </div>
      {openimage &&
        <div className=" fixed top-0 left-0 right-0 bottom-0 bg-black/85 z-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => {
            seOpenimage(false)
          }} className="size-9 text-white  active:text-gray-40 absolute right-2 top-2 z-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

          <img
            className={` max-h-[95%]`}
            src={post.image}
          />


        </div>
      }
    </>
  )
}

export default PostBody
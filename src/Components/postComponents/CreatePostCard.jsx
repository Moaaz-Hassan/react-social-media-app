import { timeAgo } from "../../Services/timeFormat";
import { useContext } from "react";
import AuthenticationCntext from "../../Context/AuthenticationCntext";
import CreatePostComment from "./CreatePostComment";
import { Button, Input } from "@heroui/react";
import { createCommentApi } from "../../Services/CommentServices";
import { useState } from "react";
import { getCommentsApi } from "../../Services/CommentServices";
import { UpdateCommentApi } from "../../Services/CommentServices";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { sharePost } from "../../Services/sharePost";
import { DeleteCommentApi } from "../../Services/CommentServices";
import { Dropdown } from "@heroui/react";
import { DropdownTrigger } from "@heroui/react";
import { DropdownItem } from "@heroui/react";
import { DropdownMenu } from "@heroui/react";
import { deletPost } from "../../Services/postServices";
import { queryClient } from "../../App";
import PostLoadingScrean from "../PostLoadingScrean";
import SelectPrivacyIcone from "./SelectPrivacyIcone";
import { edeticons } from "./SelectPrivacyIcone";
import { deleticons } from "./SelectPrivacyIcone";
import { saveicons } from "./SelectPrivacyIcone";
import { unsaveicons } from "./SelectPrivacyIcone";
import { togelePostLikes } from "../../Services/postServices";

function CreatPostCard({ post, isFullView, setPostForUpdating, queryKey }) {
  const { userData } = useContext(AuthenticationCntext);
  const [likedIt, setLikedIt] = useState(
    post.likes.some((like) => like == userData._id),
  );
  const [numberOflikes, setNumberOflikes] = useState(post.likes.length);

  async function togeleikes(id) {
    const rezalt = !likedIt;

    setLikedIt(rezalt);
    rezalt
      ? setNumberOflikes(numberOflikes + 1)
      : setNumberOflikes(numberOflikes - 1);

    const data = await togelePostLikes(id);
  }

  // ------------------------------------------------------------------

  const [commentContent, setCommentContent] = useState("");
  const [loding, setLodeng] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);
  const [deleteloding, setDeleteLodeng] = useState(false);
  const [CommentDeleteloding, setCommentDeleteLodeng] = useState(false);

  function reverseComments() {
    let reversedComment = structuredClone(comments);
    reversedComment.reverse();
    setComments(reversedComment);
  }

  async function createComment(e) {
    e.preventDefault();
    setLodeng(true);

    const response = await createCommentApi(commentContent, post.id);
    if (response.message == "success") {
      setComments(response.comments);
      setCommentContent("");
    }
    setLodeng(false);
  }

  function setCommentForUpdate(contente, id) {
    setIsUpdatingComment(id);
    setCommentContent(contente);
  }

  async function updateComment(e) {
    e.preventDefault();
    setLodeng(true);
    const respons = await UpdateCommentApi(commentContent, isUpdatingComment);
    if (respons.message == "success") {
      const newcomments = await getCommentsApi(respons.comment.post);
      setComments(newcomments.comments);
    }
    setIsUpdatingComment(false);
    setCommentContent("");
    setLodeng(false);
  }

  async function deleteComment(commentId, postId) {
    setCommentDeleteLodeng(commentId);
    setIsUpdatingComment(false);
    setCommentContent("");
    const respons = await DeleteCommentApi(commentId);

    console.log(respons);
    if (respons.message == "success") {
      const newcomments = await getCommentsApi(postId);
      setComments(newcomments.comments);
    }
    setCommentDeleteLodeng(false);
  }
  async function deletYourPost(id) {
    setDeleteLodeng(true);
    const resposn = await deletPost(id);
    if (resposn.message == "success") {
      await queryClient.invalidateQueries([queryKey]);
    }
    setDeleteLodeng(false);
  }

  async function togeleLikes(id) {
    const respons = await togelePostLikes(id);
    if (respons.success) {
    }
  }

  useEffect(() => {
    reverseComments();
  }, []);

  return (
    <>
      {deleteloding ? (
        <PostLoadingScrean />
      ) : (
        <div className="bg-white border-1 border-blue-50 w-full rounded-xl shadow-md h-auto py-3 px-3 my-5">
          <div className="w-full h-16 flex items-center justify-between ">
            <Link to={userData?._id === post?.user?._id ? "profile" : "#"}>
              <div className="flex">
                <img
                  className=" rounded-full w-10 h-10 mr-3"
                  src={post.user.photo}
                  alt={post.user.name}
                />
                <div>
                  <h3 className="text-md font-semibold ">{post.user.name}</h3>
                  <div className=" mt-1 flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <SelectPrivacyIcone privacy={post.privacy} />
                      <p>{post.privacy}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {timeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>
                {post.bookmarked && (
                  <div className=" w-fit h-fit flex items-center  text-sm font-bold text-blue-600">
                    {saveicons}
                    Saved
                  </div>
                )}
              </div>
            </Link>

            <Dropdown>
              <DropdownTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 cursor-pointer active:text-gray-600 outline-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {post.bookmarked ? (
                  <DropdownItem
                    key="Unsave"
                    startContent={unsaveicons}
                    color="primary"
                  >
                    Unsave Post
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    key="Save"
                    startContent={saveicons}
                    color="primary"
                  >
                    Save Post
                  </DropdownItem>
                )}

                {post.user._id == userData._id && (
                  <>
                    <DropdownItem
                      key="edit"
                      startContent={edeticons}
                      color="primary"
                    >
                      Update Post
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      startContent={deleticons}
                      className="text-danger"
                      color="danger"
                    >
                      Delete Post
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          <Link to={"/single-Post/" + post.id}>
            {post.body && (
              <p className=" mt-4 mb-2 text-medium font-medium text-gray-800">
                {post.body}
              </p>
            )}
            {post.image && (
              <img
                className={
                  !isFullView
                    ? ` w-full h-[400px]  lg:h-[550px] lg:w-[90%] mx-auto object-cover rounded-md mt-2`
                    : "mt-2"
                }
                src={post.image}
              />
            )}

            <div className="w-full h-8 flex items-center px-1 my-3 justify-between">
              <div className=" flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white font-bold bg-blue-500 p-1 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>

                <p>{numberOflikes} likes</p>
              </div>
              <div className=" flex items-center gap-3">
                <div className=" flex items-center gap-1 text-gray-500 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                    />
                  </svg>
                  <p>{post.sharesCount} Shares</p>
                </div>
                <div className=" flex items-center gap-1 text-gray-500 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                  <p>{post.commentsCount} comment</p>
                </div>
              </div>
            </div>
          </Link>
          <hr />
          <div className="grid grid-cols-3 p-2 ">
            <button
              className={` ${likedIt ? " text-blue-600  " : " text-gray-800 "} flex flex-row justify-center gap-1 items-center cursor-pointer  `}
              onClick={() => togeleikes(post._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>

              <span className="font-semibold text-lg ">Like</span>
            </button>

            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="flex flex-row justify-center gap-1 items-center cursor-pointer text-gray-800  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>

              <span className="font-semibold text-lg ">Comment</span>
            </button>
            <button
              onClick={() => sharePost(post._id, post.body)}
              className="flex flex-row gap-1 justify-center items-center cursor-pointer text-gray-800 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>

              <span className="font-semibold text-lg ">Share</span>
            </button>
          </div>
          {post.commentsCount > 0 && (
            <div className=" w-full rounded-2xl border-1 border-gray-200 mt-2 bg-gray-50 p-3">
              <h2 className=" text-gray-800 font-bold text-medium">
                Top Comment
              </h2>
              <div className=" flex items-center gap-3 mt-2">
                <Link
                  to={`users-profile/${post.topComment.commentCreator._id}`}
                >
                  <img
                    className="w-10 h-10 rounded-full cursor-pointer "
                    src={post.topComment.commentCreator.photo}
                    alt={post.topComment.commentCreator.name}
                  />
                </Link>

                <div className=" rounded-2xl bg-white p-2 w-[70%] border-1 border-blue-50">
                  <h2 className=" text-gray-800 font-bold text-sm mb-1 ">
                    {post.topComment.commentCreator.name}
                  </h2>
                  <h2 className=" text-gray-700 font-semibold text-sm">
                    {post.topComment.content}
                  </h2>
                </div>
              </div>
              <h2 className=" text-blue-600 mt-2 cursor-pointer font-bold text-sm">
                View all comments
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CreatPostCard;

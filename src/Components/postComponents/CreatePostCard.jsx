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

function CreatPostCard({ post, isFullView, setPostForUpdating, queryKey }) {
  const { userData } = useContext(AuthenticationCntext);
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
              <p className=" mt-4 text-medium font-medium text-gray-800">
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

                <p>{post.likes.length} likes</p>
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
          <div className="flex my-3 justify-around ">
            <button className="flex flex-row justify-center items-center cursor-pointer  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={27}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span className="font-semibold text-lg text-gray-600">Like</span>
            </button>

            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="flex flex-row justify-center items-center cursor-pointer  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={27}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="font-semibold text-lg text-gray-600">
                Comment
              </span>
            </button>
            <button
              onClick={() => sharePost(post._id, post.body)}
              className="flex flex-row justify-center items-center cursor-pointer "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={27}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <circle cx={18} cy={5} r={3} />
                <circle cx={6} cy={12} r={3} />
                <circle cx={18} cy={19} r={3} />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span className="font-semibold text-lg text-gray-600">Share</span>
            </button>
          </div>
          <hr />
          <form
            onSubmit={isUpdatingComment ? updateComment : createComment}
            className="flex items-center justify-between my-3 gap-3"
          >
            <Input
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add Comment ..... "
            />
            <Button
              disabled={commentContent.length < 1}
              isLoading={loding}
              type="submite"
            >
              {isUpdatingComment ? "Update" : "Comment"}
            </Button>
          </form>
          {comments.length > 0 && showAllComments ? (
            comments.map((comment) => (
              <CreatePostComment
                key={comment._id}
                deleteComment={deleteComment}
                isUpdatingComment={isUpdatingComment}
                setCommentForUpdate={setCommentForUpdate}
                post={post}
                userData={userData}
                comment={comment}
                CommentDeleteloding={CommentDeleteloding}
              />
            ))
          ) : comments.length > 0 && isFullView == false ? (
            <CreatePostComment
              deleteComment={deleteComment}
              isUpdatingComment={isUpdatingComment}
              setCommentForUpdate={setCommentForUpdate}
              post={post}
              userData={userData}
              comment={comments[0]}
              CommentDeleteloding={CommentDeleteloding}
            />
          ) : (
            comments.map((comment) => (
              <CreatePostComment
                key={comment._id}
                deleteComment={deleteComment}
                isUpdatingComment={isUpdatingComment}
                setCommentForUpdate={setCommentForUpdate}
                post={post}
                userData={userData}
                comment={comment}
                deleteloding={deleteloding}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default CreatPostCard;

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
        <div className="bg-gray-50 w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
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
                  <p className="text-xs text-gray-500">
                    {timeAgo(post.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
            {userData._id == post.user._id && !isFullView && (
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
                  <DropdownItem
                    key="edit"
                    onClick={() => {
                      setPostForUpdating({
                        id: post._id,
                        body: post.body,
                        image: post.image,
                      });
                    }}
                  >
                    Update Post
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    onClick={() => {
                      deletYourPost(post._id);
                    }}
                    className="text-danger"
                    color="danger"
                  >
                    Delete Post
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>

          <Link to={"/single-Post/" + post.id}>
            {post.body && <p className=" mt-2">{post.body}</p>}
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

            <div className="w-full h-8 flex items-center px-3 my-3 justify-end">
              <p className=" text-gray-500">{comments.length} comment</p>
            </div>
          </Link>
          <hr />
          <div className="flex my-3 justify-around ">
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

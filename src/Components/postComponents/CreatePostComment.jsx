import React from "react";
import Placeholder from "../../assets/62010d848b790a2336d1542fcda51789.jpg";
import { timeAgo } from "../../Services/timeFormat";
import CommentLoadingScrean from "../CommentLoadingScrean";

function CreatePostComment({
  userData,
  comment,
  post,
  isUpdatingComment,
  setCommentForUpdate,
  deleteComment,
  CommentDeleteloding
}) {
  return (
    <>
      {CommentDeleteloding == comment._id ? (
        <CommentLoadingScrean />
      ) : (
        <div className="flex items-center space-x-2  my-2  md:w-96 w-72  ">
          <div className="flex ">
            <img
              onError={(e) => (e.target.src = Placeholder)}
              src={comment.commentCreator.photo}
              alt={comment.commentCreator.name}
              className="h-11 w-11 object-cover rounded-full"
            />
          </div>
          <div className="flex items-center space-x-2 w-full   ">
            <div className="block w-full ">
              <div
                className={`${isUpdatingComment == comment._id && " bg-gray-300 "} bg-gray-100 w-auto rounded-xl px-2 pb-2  `}
              >
                <h2 className=" text-small font-medium ">
                  {comment.commentCreator.name}
                </h2>
                <h2 className="text-xs font-semibold">{comment.content}</h2>
              </div>

              {comment.commentCreator._id == userData._id && (
                <div className="flex justify-start items-center text-xs w-full my-1">
                  <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                    <span
                      onClick={() => {
                        setCommentForUpdate(comment.content, comment._id);
                      }}
                      className=" cursor-pointer active:text-black "
                    >
                      <small>Update</small>
                    </span>
                    {comment.commentCreator._id == userData._id &&
                      post.user._id == userData._id && (
                        <span
                          onClick={() => deleteComment(comment._id, post._id)}
                          className=" cursor-pointer active:text-black "
                        >
                          <small>Delete</small>
                        </span>
                      )}
                  </div>
                </div>
              )}
              <span>
                <small className=" ml-2">{timeAgo(comment.createdAt)}</small>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CreatePostComment;

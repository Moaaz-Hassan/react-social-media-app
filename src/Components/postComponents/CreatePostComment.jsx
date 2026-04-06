import Placeholder from "../../assets/Avatar.jpg";
import { timeAgo } from "../../Services/timeFormat";
import { useContext } from "react";
import AuthenticationCntext from "../../Context/AuthenticationCntext";
import { useState } from "react";
import { DeleteCommentApi } from "../../Services/CommentServices";
import { queryClient } from "../../App";

function CreatePostComment({
  comment,
  post,
  commentForUpdate,
  setCommentForUpdate,
}) {


  let { userData } = useContext(AuthenticationCntext);
  const [deletLoding, setDeletLoding] = useState(false)

  async function deleteComment() {
    setDeletLoding(true)
    const respons = await DeleteCommentApi(comment._id, post.id)
    if (respons.success) {
      await queryClient.invalidateQueries(["getCommint", post.id])
    }
    setDeletLoding(false)

  }


  return (
    <>

      <div className="flex items-start space-x-2  my-4  md:w-96 w-fit  ">

        <img
          onError={(e) => (e.target.src = Placeholder)}
          src={comment.commentCreator.photo}
          alt={comment.commentCreator.name}
          className="h-11 w-11  object-cover rounded-full"
        />

        <div className="flex items-center space-x-2 w-fit   ">
          <div >
            <div
              className={`${(commentForUpdate?._id == comment._id || deletLoding) && " bg-gray-300 "} bg-gray-100 w-auto rounded-xl px-2 pb-2  `}
            >
              <div className=" flex justify-between">
                <h2 className=" text-small font-medium mb-1 ">
                  {comment.commentCreator.name}
                </h2>
                {commentForUpdate?._id == comment._id &&
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => {
                    setCommentForUpdate(null)
                  }} className="size-6 text-black  active:text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>

                }
              </div>

              {comment.content && <h2 className="text-xs font-semibold">{comment.content}</h2>}
              {comment.image && <img src={comment.image} className=" rounded-md w-36" alt="" />}
            </div>

            <div className=" flex gap-4 mt-1  ">
              {comment.commentCreator._id == userData._id && (

                <div className=" text-xs font-medium  flex gap-2 ">
                  <span
                    onClick={() => {
                      setCommentForUpdate(comment);
                    }}
                    className=" cursor-pointer active:text-black "
                  >
                    Update
                  </span>
                  {comment.commentCreator._id == userData._id &&
                    post.user._id == userData._id && (
                      <span
                        onClick={() => deleteComment(comment._id, post._id)}
                        className=" cursor-pointer active:text-black "
                      >
                        {deletLoding ? "Loding.." : "Delete"}
                      </span>
                    )}
                </div>
              )}
              <small className=" text-xs font-medium">{timeAgo(comment.createdAt)}</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreatePostComment;

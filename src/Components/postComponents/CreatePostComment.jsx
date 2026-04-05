import Placeholder from "../../assets/Avatar.jpg";
import { timeAgo } from "../../Services/timeFormat";
import CommentLoadingScrean from "../CommentLoadingScrean";
import { useContext } from "react";
import AuthenticationCntext from "../../Context/AuthenticationCntext";

function CreatePostComment({
  comment,
  post,
  isUpdatingComment,
  setCommentForUpdate,
  deleteComment,
  CommentDeleteloding
}) {


  let { userData } = useContext(AuthenticationCntext);

  return (
    <>
      {CommentDeleteloding == comment._id ? (
        <CommentLoadingScrean />
      ) : (
        <div className="flex items-start space-x-2  my-2  md:w-96 w-fit  ">

          <img
            onError={(e) => (e.target.src = Placeholder)}
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
            className="h-11 w-11  object-cover rounded-full"
          />

          <div className="flex items-center space-x-2 w-fit   ">
            <div className="block w-full items-center ">
              <div
                className={`${isUpdatingComment == comment._id && " bg-gray-300 "} bg-gray-100 w-auto rounded-xl px-2 pb-2  `}
              >
                <h2 className=" text-small font-medium mb-1 ">
                  {comment.commentCreator.name}
                </h2>
                {comment.content && <h2 className="text-xs font-semibold">{comment.content}</h2>}
                {comment.image && <img src={comment.image} className=" rounded-md w-36" alt="" />}
              </div>

              <div className=" flex gap-4 mt-2 ">
                {comment.commentCreator._id == userData._id && (

                  <div className="font-semibold  flex gap-2 bg-amber-400 ">
                    <span
                      onClick={() => {
                        setCommentForUpdate(comment.content, comment._id);
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
                          Delete
                        </span>
                      )}
                  </div>
                )}
                <small className=" text-xs font-medium w-full">{timeAgo(comment.createdAt)}</small>
              </div>



            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CreatePostComment;

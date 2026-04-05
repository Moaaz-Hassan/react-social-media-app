import { useEffect, useState } from "react";
import { togelePostLikes } from "../../../Services/postServices";
import { Link } from "react-router-dom";
import CommentLoadingScrean from "../../CommentLoadingScrean";
import { GetPostComments } from "../../../Services/postServices";
import CreatePostComment from "../CreatePostComment";
import { Button } from "@heroui/react";

function PostFoter({ post, userData, onOpen }) {

    const [showAllComments, setShowAllComments] = useState(false);
    // const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const [commentsLoding, setCommentsLoding] = useState();

    useEffect(() => {
        async function getCommint() {
            setCommentsLoding(true)
            const respons = await GetPostComments(post.id)
            console.log(respons)
            if (respons.success) {
                setComments(respons.data.comments)
            }
            setCommentsLoding(false)

        }
        if (showAllComments) {
            getCommint()
        }

    }, [showAllComments])



    // ------------------------------------
    const [body, setBody] = useState("");
    const [image, setimage] = useState(null);
    const [openEmojiForm, setOpenEmojiForm] = useState(false);
    const [imageUrl, setimageUrl] = useState(null);
    const [loding, setLodeng] = useState(false);
    const [update, setupdate] = useState(false);
    function handelImage(e) {
        setimage(e.target.files[0]);
        setimageUrl(URL.createObjectURL(e.target.files[0]));

        if (e) {
            e.target.value = "";
        }
    }
    // ------------------------------------


    const [numberOflikes, setNumberOflikes] = useState(post.likes.length);
    const [likedIt, setLikedIt] = useState(
        post.likes.some((like) => like == userData._id),
    );

    async function togeleikes() {
        const rezalt = !likedIt;

        setLikedIt(rezalt);
        rezalt
            ? setNumberOflikes(numberOflikes + 1)
            : setNumberOflikes(numberOflikes - 1);

        const data = await togelePostLikes(post.id);
    }

    return (
        <div>
            <div className="w-full h-8 flex  items-center px-1 my-3 justify-between">
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

            <hr />
            <div className="grid grid-cols-3 p-2 ">
                <button
                    className={` ${likedIt ? " text-blue-600  " : " text-gray-800 "} flex flex-row justify-center gap-1 items-center cursor-pointer  `}
                    onClick={togeleikes}
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
                    onClick={() => !commentsLoding && setShowAllComments(!showAllComments)}
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

                    <span className="font-semibold text-lg ">{commentsLoding ? "Loding..." : "Comment"}</span>
                </button>
                <button
                    onClick={onOpen}
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
            {post.topComment > 0 && showAllComments === false ? (
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
                    <h2 onClick={() => setShowAllComments(!showAllComments)} className=" text-blue-600 mt-2 cursor-pointer font-bold text-sm">
                        View all comments
                    </h2>
                </div>
            ) : ""}
            {showAllComments &&
                <div>
                    <div className="w-full h-20 p-2 rounded-xl bg-gray-100 flex flex-col justify-between my-2">
                        <input className="w-full bg-transparent outline-0" placeholder={`comment as ${userData.name}`}></input>
                        <div className="flex justify-between  items-end ">
                            <div className=" flex items-center gap-5">
                                <label
                                    htmlFor="file"
                                    className={`cursor-pointer flex gap-1   items-center`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-green-700"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                </label>
                                <input
                                    onChange={handelImage}
                                    id="file"
                                    className=" border-1 hidden"
                                    type="file"
                                />

                                <div className="relative flex items-center gap-1">
                                    <div
                                        onClick={() => setOpenEmojiForm(!openEmojiForm)}
                                        className="cursor-pointer flex items-center gap-1"
                                    >
                                        {/* icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6 text-yellow-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                                            />
                                        </svg>


                                    </div>

                                    {openEmojiForm && (
                                        <div className="absolute top-7 left-0 z-50 shadow-lg">
                                            <EmojiPicker
                                                emojiStyle="google"
                                                width={300}
                                                height={350}
                                                onEmojiClick={(emojiObject) =>
                                                    setBody((prev) => prev + emojiObject.emoji)
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button
                                radius="md"
                                disabled={!(body || image)}
                                isLoading={loding}
                                type="submit"
                                
                                className=" font-bold w-10  shadow-2xs  size-7"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-5 text-blue-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>

                    {commentsLoding && comments.length === 0 ?
                        < CommentLoadingScrean />
                        :

                        comments.length === 0 ?
                            <h2 className=" my-4 text-center">there is no comments</h2>
                            :
                            comments.map((comment) =>
                                <CreatePostComment comment={comment} post={post} />
                            )


                    }

                </div>
            }
        </div>
    )
}

export default PostFoter
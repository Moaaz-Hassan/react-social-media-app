import { Link } from "react-router-dom";
import { Dropdown } from "@heroui/react";
import { DropdownTrigger } from "@heroui/react";
import { DropdownItem } from "@heroui/react";
import { DropdownMenu } from "@heroui/react";
import SelectPrivacyIcone from "../SelectPrivacyIcone";
import { edeticons } from "../SelectPrivacyIcone";
import { deleticons } from "../SelectPrivacyIcone";
import { saveicons } from "../SelectPrivacyIcone";
import { unsaveicons } from "../SelectPrivacyIcone";
import { timeAgo } from "../../../Services/timeFormat";
import { togeleBookmarkPostes } from "../../../Services/postServices";
import { deletPost } from "../../../Services/postServices";
import { queryClient } from "../../../App";

function PostHeader({ userData, post, bookmarkedIt , setBookmarkedIt , setDeleteLodeng , setPostForUpdating , queryKey }) {
  
  async function deletYourPost() {
    setDeleteLodeng(true);
    const resposn = await deletPost(post.id);
    if (resposn.success) {
      await queryClient.invalidateQueries([queryKey]);
    }
    setDeleteLodeng(false);
  }

  async function togeleBookmark() {
    setBookmarkedIt(!bookmarkedIt);
    const data = await togeleBookmarkPostes(post.id);
  }

  function updatePost() {
    setPostForUpdating(post);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="w-full h-16 flex items-center justify-between ">
      <Link
        to={
          userData?._id === post?.user?._id
            ? "/profile"
            : `/user-profile/${post?.user?._id}`
        }
      >
        <div className="flex">
          <img
            className=" rounded-full w-10 h-10 mr-3 object-cover"
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
              <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
            </div>
          </div>
          {bookmarkedIt && (
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
          {bookmarkedIt ? (
            <DropdownItem
              key="Unsave"
              startContent={unsaveicons}
              color="primary"
              onClick={togeleBookmark}
            >
              Unsave Post
            </DropdownItem>
          ) : (
            <DropdownItem
              key="Save"
              startContent={saveicons}
              color="primary"
              onClick={togeleBookmark}
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
                onClick={updatePost}
              >
                Update Post
              </DropdownItem>
              <DropdownItem
                key="delete"
                startContent={deleticons}
                className="text-danger"
                color="danger"
                onClick={deletYourPost}
              >
                Delete Post
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default PostHeader;

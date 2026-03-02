import { useEffect, useState, useContext } from "react";
import { Textarea, Button } from "@heroui/react";
import { createPostApi } from "../../Services/postServices";
import { updatePostApi } from "../../Services/postServices";
import { queryClient } from "../../App";
import AuthenticationCntext from "../../Context/AuthenticationCntext";
import defaultPersonPhoto from "../../assets/default-profile.png";
import { useNavigate } from "react-router-dom";
import { Select, SelectItem } from "@heroui/react";
import EmojiPicker from "emoji-picker-react";
import { Alert } from "@heroui/react";
import SelectPrivacyIcone from "./SelectPrivacyIcone";
import { onlyMeicons } from "./SelectPrivacyIcone";
import { publicicons } from "./SelectPrivacyIcone";
import {follwingicon} from "./SelectPrivacyIcone";

function PostForm({ postForUpdating, queryKey }) {
  // post states
  const [body, setBody] = useState("");
  const [image, setimage] = useState(null);
  const [privacy, setPrivacy] = useState("public");

  const [openEmojiForm, setOpenEmojiForm] = useState(false);
  const [PostErorre, setPostErorre] = useState(false);

  const [loding, setLodeng] = useState(false);
  const [imageUrl, setimageUrl] = useState(null);
  const [update, setupdate] = useState(false);
  const [idForUpdate, setIdForUpdate] = useState(false);

  const navigate = useNavigate();

  let { userData } = useContext(AuthenticationCntext);

  function handelImage(e) {
    setimage(e.target.files[0]);
    setimageUrl(URL.createObjectURL(e.target.files[0]));

    if (e) {
      e.target.value = "";
    }
  }

  function removeImage() {
    setimageUrl(null);
    setimage(null);
  }
  async function createPost(e) {
    e.preventDefault();
    setLodeng(true);

    const formData = new FormData();
    body?.trim() && formData.append("body", body);
    image && formData.append("image", image);
    privacy && formData.append("privacy", privacy);

    let response = "";
    if (body?.trim() || image) {
      response = await createPostApi(formData);
    }

    if (response.success) {
      setBody("");
      setimageUrl(null);
      setimage(null);
      setOpenEmojiForm(false);
    } else {
      console.log("som this went roung");
    }

    setLodeng(false);
  }

  async function updateYourPost(e) {
    e.preventDefault();
    setLodeng(true);

    const formData = new FormData();
    body?.trim() && formData.append("body", body);
    image && formData.append("image", image);

    let response = "";
    if (body?.trim() || image) {
      response = await updatePostApi(idForUpdate, formData);
    }

    if (response.message == "success") {
      await queryClient.invalidateQueries([queryKey]);
      setBody("");
      setimageUrl(null);
      setimage(null);
    } else {
      setPostErorre(true);
    }

    setLodeng(false);
    setupdate(false);
  }

  useEffect(() => {
    if (postForUpdating?.body || postForUpdating?.image) {
      setupdate(true);
      setBody(postForUpdating?.body);
      setimageUrl(postForUpdating?.image);
      setIdForUpdate(postForUpdating?.id);
    }
  }, [postForUpdating]);

  useEffect(() => {
    setTimeout(() => {
      setPostErorre(false);
    }, 3000);
  }, [PostErorre]);

  return (
    <div className="bg-white w-full rounded-xl shadow-md border-1 border-blue-50  h-auto p-4 my-2">
      {PostErorre && (
        <div className=" fixed top-2 z-50 left-[50%] -translate-x-[50%]">
          <Alert
            variant="flat"
            color="danger"
            description={"Something went wrong, please try again later"}
            title={"We're sorry " + userData?.name}
          />
        </div>
      )}

      <form onSubmit={update ? updateYourPost : createPost}>
        <div className=" flex items-center gap-2 mb-3">
          <img
            src={userData?.photo ? userData?.photo : defaultPersonPhoto}
            className=" w-12 h-12 rounded-full cursor-pointer "
            alt="person-photo"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/profile");
            }}
          />
          <div>
            <h2 className="text-gray-950 font-bold text-medium ">
              {userData?.name}
            </h2>

            <Select
              aria-label="Post Privacy"
              className="w-40 border-1 border-blue-50 rounded-2xl"
              selectedKeys={[privacy]}
              onChange={(e) => setPrivacy(e.target.value)}
              startContent={
                <SelectPrivacyIcone privacy={privacy} />
              }
              radius="lg"
              size="sm"
            >
              <SelectItem startContent={publicicons} key={"public"}>
                Public
              </SelectItem>
              <SelectItem startContent={follwingicon} key={"following"}>
                Followers
              </SelectItem>
              <SelectItem startContent={onlyMeicons} key={"only_me"}>
                Only me
              </SelectItem>
            </Select>
          </div>
        </div>

        <Textarea
          value={body}
          className=" border-1 border-blue-50 rounded-2xl"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="What is in your mind .... "
        ></Textarea>

        {imageUrl && (
          <div className=" relative mt-4  w-fit ">
            <img
              className="w-60 h-60 object-contain rounded-md"
              src={imageUrl}
              alt=""
            />
            <svg
              onClick={removeImage}
              className=" absolute top-2 end-2 size-8 cursor-pointer active:text-gray-400  text-white font-bold"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}

        <div className="flex justify-between mt-6 items-center border-t-1 border-gray-950 pt-3">
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

              <span className=" text-sm font-bold text-gray-700">Photo</span>
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

                <span className="text-sm font-bold text-gray-800">
                  Feeling/activity
                </span>
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
            color="primary"
            size="md"
            radius="md"
            disabled={!(body || image)}
            isLoading={loding}
            type="submit"
            className=" font-bold"
          >
            {update ? "update" : "Post"}
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;

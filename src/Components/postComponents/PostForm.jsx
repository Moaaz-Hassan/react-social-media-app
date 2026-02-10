import React, { useEffect, useState } from "react";
import { Textarea, Button } from "@heroui/react";
import { createPostApi } from "../../Services/postServices";
import { updatePostApi } from "../../Services/postServices";
import { queryClient } from "../../App";

function PostForm({ postForUpdating , queryKey }) {
  const [body, setBody] = useState("");
  const [image, setimage] = useState(null);
  const [loding, setLodeng] = useState(false);
  const [imageUrl, setimageUrl] = useState(null);
  const [update, setupdate] = useState(false);
  const [idForUpdate, setIdForUpdate] = useState(false);

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

    let response = "";
    if (body?.trim() || image) {
      response = await createPostApi(formData);
    }

    if (response.message == "success") {
      await queryClient.invalidateQueries([queryKey]);
      setBody("");
      setimageUrl(null);
      setimage(null);
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

  return (
    <div className="bg-white w-full rounded-md shadow-md  h-auto p-4 my-2">
      <form onSubmit={update ? updateYourPost : createPost}>
        <Textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="What is in your mind .... "
        ></Textarea>

        {imageUrl && (
          <div className=" relative">
            <img
              className=" w-full h-auto rounded-b-md"
              src={imageUrl}
              alt=""
            />
            <svg
              onClick={removeImage}
              className=" absolute top-4 end-4 size-8 cursor-pointer active:text-gray-400  text-white font-bold"
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

        <div className="flex justify-between mt-3 items-center">
          <label
            htmlFor="file"
            className={`${image ? "text-blue-700 " : ""}cursor-pointer flex gap-1 hover:text-blue-700`}
          >
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <span>image</span>
          </label>
          <input
            onChange={handelImage}
            id="file"
            className=" border-1 hidden"
            type="file"
          />

          <Button disabled={!(body || image)} isLoading={loding} type="submit">
            {update ? "update" : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;

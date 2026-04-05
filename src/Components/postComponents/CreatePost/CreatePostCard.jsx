
import { useContext } from "react";
import AuthenticationCntext from "../../../Context/AuthenticationCntext";
import CreatePostComment from "../CreatePostComment";
import { Button, Input } from "@heroui/react";
import { createCommentApi } from "../../../Services/CommentServices";
import { useState } from "react";
import { getCommentsApi } from "../../../Services/CommentServices";
import { UpdateCommentApi } from "../../../Services/CommentServices";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteCommentApi } from "../../../Services/CommentServices";

import { queryClient } from "../../../App";
import PostLoadingScrean from "../../PostLoadingScrean";
import { SharePost } from "../../../Services/postServices";
import { Spinner } from "@heroui/react";


import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFoter from "./PostFoter";

function CreatPostCard({ post, setPostForUpdating, queryKey }) {

 const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // share post

  const [shareContent, SetShareContent] = useState("");
  const [shareLodin, SetShareLodin] = useState("");


  async function SendSharePost() {
    SetShareLodin(true)
    const respons = await SharePost(post.id, { "body": shareContent })
    if(respons.success){
      onOpenChange(false)
      await queryClient.invalidateQueries([queryKey]);
    }
    SetShareLodin(false)


  }



  const [loding, setLodeng] = useState(false);



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

    if (respons.message == "success") {
      const newcomments = await getCommentsApi(postId);
      setComments(newcomments.comments);
    }
    setCommentDeleteLodeng(false);
  }

  // -----------------------------------------


  const { userData } = useContext(AuthenticationCntext);

  const [bookmarkedIt, setBookmarkedIt] = useState(post.bookmarked);

 



  // -----------------------------------------

  return (
    <>
      {deleteloding ? (
        <PostLoadingScrean />
      ) : (
        <div className="bg-white border-1 border-blue-50 w-full rounded-xl shadow-md h-auto py-3 px-3 my-5">
          <PostHeader queryKey={queryKey} userData={userData} post={post} bookmarkedIt={bookmarkedIt} setBookmarkedIt={setBookmarkedIt} setDeleteLodeng={setDeleteLodeng} setPostForUpdating={setPostForUpdating} />
          <PostBody post={post} />
          <PostFoter post={post} userData={userData} onOpen={onOpen} />

        </div>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share post
              </ModalHeader>
              <ModalBody>
                <Input
                  size="lg"
                  variant="bordered"
                  placeholder="Say Something about this "
                  onChange={e => SetShareContent(e.target.value)}

                ></Input>
              </ModalBody>
              <ModalBody>
                <div className=" mt-1 border-2 border-gray-200 rounded-xl  p-1">
                  <div className="flex items-center">
                    <img
                      className=" rounded-full w-7 h-7 mr-2"
                      src={post.user.photo}
                      alt={post.user.name}
                    />
                    <div className=" flex flex-col">
                      <h3 className="text-sm font-thin ">{post.user.name}</h3>
                      <h3 className=" text-xs font-thin">
                        @{post.user.username}
                      </h3>
                    </div>
                  </div>
                  <div>
                    {post.body && (
                      <p className=" my-1 text-medium font-semibold text-gray-800">
                        {post.body}
                      </p>
                    )}
                  </div>
                  {post.image && (
                    <img
                      className={` my-1 w-full h-[300px]  lg:h-[350px] lg:w-[90%] mx-auto object-cover rounded-md mt-1`}
                      src={post.image}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={SendSharePost}
                  disabled={shareLodin}
                >
                  {shareLodin ? <Spinner color="accent" size="sm" /> : "Share Now"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatPostCard;

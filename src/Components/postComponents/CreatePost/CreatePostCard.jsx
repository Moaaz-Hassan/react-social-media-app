import { useContext } from "react";
import AuthenticationCntext from "../../../Context/AuthenticationCntext";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
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

function CreatPostCard({ post, setPostForUpdating, queryKey, showAllImage }) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shareContent, SetShareContent] = useState("");
  const [shareLodin, SetShareLodin] = useState("");
  const [deleteloding, setDeleteLodeng] = useState(false);
  const { userData } = useContext(AuthenticationCntext);
  const [bookmarkedIt, setBookmarkedIt] = useState(post.bookmarked);

  async function SendSharePost() {
    SetShareLodin(true)
    const respons = await SharePost(post.id, { "body": shareContent })
    if (respons.success) {
      onOpenChange(false)
      await queryClient.invalidateQueries([queryKey]);
    }
    SetShareLodin(false)


  }

  return (
    <>
      {deleteloding ? (
        <PostLoadingScrean />
      ) : (
        <div className="bg-white border-1 border-blue-50 w-full rounded-xl shadow-md h-auto py-3 px-3 my-5">
          <PostHeader showAllImage={showAllImage} queryKey={queryKey} userData={userData} post={post} bookmarkedIt={bookmarkedIt} setBookmarkedIt={setBookmarkedIt} setDeleteLodeng={setDeleteLodeng} setPostForUpdating={setPostForUpdating} />
          <PostBody post={post} userData={userData} showAllImage={showAllImage} />
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

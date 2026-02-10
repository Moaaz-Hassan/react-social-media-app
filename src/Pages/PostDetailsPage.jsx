import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../Services/postServices";
import PostLoadingScrean from "../Components/PostLoadingScrean";
import CreatPostCard from "../Components/postComponents/CreatePostCard";

function PostDetailsPage() {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState();
  const [loding, setLoding] = useState(true);

  async function getPostDetails() {
    const response = await getPost(id);

    if (response.message == "success") {
      setPostDetails(response.post);
    }

    setLoding(false);
  }

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <>
      {loding ? (
        <PostLoadingScrean />
      ) : (
        <div className=" pt-3">
          <CreatPostCard post={postDetails} isFullView={true} />
        </div>
      )}
    </>
  );
}

export default PostDetailsPage;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../Services/postServices";
import PostLoadingScrean from "../Components/PostLoadingScrean";
import CreatPostCard from "../Components/postComponents/CreatePost/CreatePostCard";

function PostDetailsPage() {
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fitchPostDetails", id],
    queryFn: () => getPost(id)
  })


  if (isError) {
    return (
      <div className=" flex items-center justify-center">
        <h2 className=" text-medium font-medium text-red-600">
          An error occurred, please try again.{" "}
        </h2>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? <PostLoadingScrean /> :
        <CreatPostCard showAllImage={true} queryKey={["fitchPostDetails", id]} post={data?.data?.post} />
      }
    </div>
  )
}

export default PostDetailsPage
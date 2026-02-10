import React from "react";
import { Skeleton } from "@heroui/react";

function CommentLoadingScrean() {
  return (
    <div className="m-2 w-[40%]">
      <Skeleton className=" mb-2 w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className=" mb-2 w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className=" mb-2 w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
      </Skeleton>
    </div>
  );
}

export default CommentLoadingScrean;

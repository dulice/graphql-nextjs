import { useFetch } from "@/hooks/useFetch";
import { getComment } from "@/services";
import { useParams } from "next/navigation";
import React from "react";
import { Loading, Error } from ".";
import Image from "next/image";

const Comment = () => {
  const { slug } = useParams();
  const { data: comments, isLoading, error } = useFetch(getComment, slug);
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div>
      <p className="text-xl">Top {comments?.length} Comments!</p>
      {comments?.length < 1 ? (
        <div className="text-white bg-yellow-700 m-3 p-3 rounded-sm">
          Be the first person to leave a suggestion
        </div>
      ) : (
        comments?.map((comment) => (
          <div key={comment.id} className="mt-3 grid grid-cols-9">
            <div className="col-span-1">
              <Image
                src="https://res.cloudinary.com/grace26/image/upload/v1664693577/2e4566fd829bcf9eb11ccdb5f252b02f_tye4l7.jpg"
                alt=""
                width={40}
                height={40}
                className="object-cover object-center rounded-full"
                unoptimized
              />
            </div>
            <div className="col-span-4">
              <p className="font-semibold py-3">{comment.name}</p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comment;

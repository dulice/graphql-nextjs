import React from "react";
import moment from "moment";
import Image from "next/image";

const Author = ({post}) => {
  return (
    <div className="flex m-3">
      <Image
        src={post.author.photo.url}
        alt={post.title}
        width={30}
        height={30}
        className="w-12 h-12 object-cover rounded-full me-3"
        unoptimized
      />
      <div>
        <h3 className="font-semibold">{post.author.name}</h3>
        <p className="text-xs text-gray-500">
          {moment(post.createdAt).format("MMM DD, YYYY")}
        </p>
      </div>
    </div>
  );
};

export default Author;

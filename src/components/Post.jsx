import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Author } from ".";
import { readingTime } from "reading-time-estimator";
const Post = ({ post }) => {
  return (
    <div className="bg-white p-5 mx-3 mb-3 grid grid-cols-4 gap-3">
      <div className="col-span-3 md:col-span-1">
        <Link href={`/post/${post.slug}`}>
          <Image
            src={post.image.url}
            alt={post.title}
            width={100}
            height={100}
            className="w-full max-h-96 object-cover object-center"
            unoptimized
          />
        </Link>
      </div>
      <div className="col-span-4 md:col-span-3">
        <h3 className="font-semibold text-xl hover:text-blue-700 transition duration-300">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h3>

        <Author post={post} />
        <div className="mx-3 text-gray-500">
          {readingTime(post.description, 200).text}
        </div>
        <div>
          {post.categories.map((category) => (
            <div
              key={category.id}
              className="text-blue-700 inline-block text-sm me-3"
            >
              #<Link href={`/category/${category.name}`}>{category.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;

"use client";
import {
  Loading,
  Error,
  Author,
  RecommendPost,
  CommentForm,
  Comment,
} from "@/components";
import MarkDown from "@/components/MarkDown";
import { useFetch } from "@/hooks/useFetch";
import { getPost } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { readingTime } from "reading-time-estimator";

const Post = () => {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useFetch(getPost, slug);
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      {post && (
        <div className="bg-white mb-3">
          <Image
            src={post.image.url}
            alt={post.title}
            width={100}
            height={100}
            className="w-full max-h-96 object-cover object-center border rounded-sm"
            unoptimized
          />
          <div className="p-3 md:px-10">
            <div className="ml-4 mt-3">
              {post.categories.map((category) => (
                <div
                  key={category.id}
                  className="text-blue-700 inline-block text-sm me-3"
                >
                  #<Link href={"/"}>{category.name}</Link>
                </div>
              ))}
              <div>{readingTime(post.description, 200).text}</div>
            </div>
            <Author post={post} />
            <div className="px-3">
              <h3 className="font-semibold text-xl">{post.title}</h3>
              <MarkDown post={post} />
            </div>
            <CommentForm />
            <Comment />
            <RecommendPost categories={post.categories} />
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

"use client";
import { Error, Loading, Post } from "@/components";
import { useFetch } from "@/hooks/useFetch";
import { categoryPosts } from "@/services";
import { useParams } from "next/navigation";
import React from "react";

const Home = () => {
  const { name } = useParams();
  const {
    data: posts,
    isLoading,
    error,
  } = useFetch(categoryPosts, decodeURIComponent(name));
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      {posts?.length < 1 ? (
        <div className="bg-yellow-600 text-center m-3 text-white p-3">
          No Post upload for this category yet!
        </div>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </>
  );
};

export default Home;

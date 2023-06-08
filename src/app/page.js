"use client";
import { Error, Loading, Post, SideBar } from "@/components";
import { useFetch } from "@/hooks/useFetch";
import { getPosts } from "@/services";
import React from "react";

const Home = () => {
  const { data: posts, isLoading, error } = useFetch(getPosts);
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Home;

import { useFetch } from "@/hooks/useFetch";
import { categoryPosts } from "@/services";
import React from "react";
import { Loading, Error, Author } from ".";
import Link from "next/link";
import Image from "next/image";
import { readingTime } from "reading-time-estimator";
import { useParams } from "next/navigation";

const RecommendPost = ({ categories }) => {
  const { slug } = useParams();
  const name = categories[0].name;
  const { data: posts, isLoading, error } = useFetch(categoryPosts, name, slug);
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="bg-white py-3 rounded-sm">
      {posts?.length > 0 && (
        <p className="text-center font-semibold text-xl my-3">
          Recommend For You!
        </p>
      )}
      <div className="grid grid-cols-2">
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="mb-3 col-span-2 md:col-span-1">
              <Link href={`/post/${post.slug}`}>
                <Image
                  src={post.image.url}
                  alt={post.title}
                  width={100}
                  height={100}
                  className="w-full h-40 object-cover object-center"
                  unoptimized
                />
              </Link>
              <h3 className="my-3 font-semibold text-xl hover:text-blue-700 transition duration-300">
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
                    #
                    <Link href={`/category/${category.name}`}>
                      {category.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecommendPost;

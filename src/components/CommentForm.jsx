"use client";
import { submitComment } from "@/services";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const CommentForm = () => {
  const { slug } = useParams();
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      if(name.length < 1 || email.length < 1 || text.length < 1) {
        return toast.error("Please fill all the field")
      }
      await axios.post('/api/comment', {
        name, email, text, slug
      })
      setIsLoading(false);
      setName("");
      setEmail("");
      setText("");
      toast.success("You comment is submitted for preview");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <form>
      <textarea
        className="border rounded-md  border-gray-300 focus:outline-none p-3 w-full"
        placeholder="Write your opinion..."
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <p className="text-xl">Post as a guest</p>
        <div className="my-3">
          <label htmlFor="name">Name: </label>
          <input
            placeholder="Name"
            type="text"
            className="border rounded-md  border-gray-300 focus:outline-none p-3 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Email: </label>
          <input
            placeholder="Email"
            type="text"
            className="border rounded-md  border-gray-300 focus:outline-none p-3 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={isLoading}
          className="my-3 p-3 bg-blue-700 text-white rounded-sm hover:bg-blue-500 active:bg-blue-600"
        >
          {isLoading ? "Posting" : "Post"}
        </button>
        <ToastContainer position="top-right"/>
      </div>
    </form>
  );
};

export default CommentForm;

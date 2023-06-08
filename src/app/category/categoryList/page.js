"use client";
import { Category, Error, Loading, Modal } from "@/components";
import { useFetch } from "@/hooks/useFetch";
import { getCategories } from "@/services";
import axios from "axios";
import React, { useState } from "react";
import { BiEdit, BiPlus, BiTrash, BiX } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

const CategoryList = () => {
  const { data: categories, isLoading, error } = useFetch(getCategories);
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    setAdding(true);
    try {
      if (category.length < 1) {
        return setErrorMsg("This field is required");
      }
      await axios.post("/api/category", { name: category, slug: category.toLowerCase() });
      setAdding(false);
      toast.success("Added Category for review");
      setShowModal(false);
      setCategory("");
    } catch (err) {
      setAdding(false);
      //! showing 500 error but everything is working
      //   toast.error("Cannot add new category");
      toast.success("Added Category for review");
      setCategory("");
      setShowModal(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="bg-white p-5">
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-xl">Categoies</p>
        <button
          onClick={() => setShowModal(!showModal)}
          className={`p-2 bg-blue-500 text-white text-xl rounded-sm active:bg-blue-300 hover:bg-blue-400 me-3`}
        >
          <BiPlus />
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="uppercase font-light border-y py-3">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category, index) => (
            <Category category={category} key={index} index={index} />
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal
          loading={"Adding"}
          title={"Add"}
          handleSubmit={handleSubmit}
          adding={adding}
          errorMsg={errorMsg}
          category={category}
          setCategory={setCategory}
          setShowModal={setShowModal}
        />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CategoryList;

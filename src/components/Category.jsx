"use client";
import axios from "axios";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { Modal } from ".";

const Category = ({ category, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState(category?.name);
  const [updating, setUpdating] = useState(false);

  const handleDelete = async (slug) => {
    try {
        const data = await axios.delete("/api/category", { slug });
        console.log(data);
        toast.success("Deleted Successfully");
    } catch (error) {
        console.log(error)
        toast.error("Error occur while deleting the data")
    }
  };

  const handleUpdate = async (name, slug) => {
    setUpdating(true);
    try {
        await axios.put("/api/category", { name, slug });
        setUpdating(false);
        setShowModal(false);
        toast.success("Update data successfully. We are review your data")
    } catch (error) {
        console.log(error);
        setUpdating(false);
        setShowModal(false);
        toast.error("Error occur while updating the data")
    }
  };

  return (
    <>
      <tr className="border-b py-2">
        <td>{index + 1}</td>
        <td>{category.name}</td>
        <td>
          <button
            onClick={() => setShowModal(!showModal)}
            className={`p-2 bg-yellow-500 text-white text-xl rounded-sm active:bg-yellow-300 hover:bg-yellow-400 me-3`}
          >
            <BiEdit />
          </button>
          <button
            onClick={() => handleDelete(category.slug)}
            className={`p-2 border border-red-500 text-red-500 text-xl rounded-sm active:bg-red-300 hover:bg-red-400 hover:text-white me-3`}
          >
            <BiTrash />
          </button>
        </td>
      </tr>
      {showModal && (
        <Modal
          title="Update"
          loading="Updating"
          category={text}
          setCategory={setText}
          setShowModal={setShowModal}
          adding={updating}
          handleSubmit={() => handleUpdate(text, category.slug)}
        />
      )}
    </>
  );
};

export default Category;

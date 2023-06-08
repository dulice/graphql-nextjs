import React from 'react'
import { BiPlus, BiX } from 'react-icons/bi'

const Modal = ({ handleSubmit, adding, errorMsg, category, setCategory, setShowModal, loading, title }) => {
  return (
    <div className="z-10 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
          <div className="p-5 border rounded-sm bg-gray-300">
            <div className="my-3">
              <label htmlFor="name">Category: </label>
              <input
                placeholder="Category"
                type="text"
                className="border rounded-md  border-gray-300 focus:outline-none my-3 p-3 w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                autoFocus={true}
              />
              {category.length < 1 && (
                <p className="text-red-500 text-sm">{errorMsg}</p>
              )}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className={`p-2 bg-gray-500 text-white rounded-sm active:bg-gray-300 hover:bg-gray-400 me-3`}
            >
              <BiX className="inline-block" /> Cancel
            </button>
            <button
              disabled={adding}
              onClick={handleSubmit}
              className={`p-2 bg-blue-500 text-white rounded-sm active:bg-blue-300 hover:bg-blue-400 me-3`}
            >
              <BiPlus className="inline-block" /> {adding ? loading : title}
            </button>
          </div>
        </div>
  )
}

export default Modal
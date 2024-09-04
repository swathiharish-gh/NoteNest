import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UploadNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;

  const submitFile = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (!userId) {
      alert("User ID is not available. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const result = await axios.post(
        "http://localhost:3000/notes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Notes Uploaded Successfully");
    } catch (error) {
      console.error("Failed to submit file: ", error);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-start p-5 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto"
      onSubmit={submitFile}
    >
      <h1 className="text-2xl font-black mb-4">Upload Note</h1>
      <div className="mb-5 w-full">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        />
      </div>
      <div className="mb-5 w-full">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        />
      </div>
      <div className="mb-5 w-full">
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
        />
      </div>
      <div className="mb-5 w-full">
        <label
          htmlFor="file-upload"
          className="block w-full text-center py-2 px-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-pointer hover:bg-gray-100"
        >
          <span className="font-semibold">Click to Upload</span>
          <input
            type="file"
            id="file-upload"
            onChange={(e) => setFile(e.target.files[0])}
            className="sr-only"
          />
        </label>
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            Selected file: <span className="font-semibold">{file.name}</span>
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-500 py-2 text-white font-bold hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default UploadNote;

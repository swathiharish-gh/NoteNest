import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchStatus, setSearchStatus] = useState("");

    // Access user data from Redux store
    const user = useSelector((state) => state.user.userData);
    const username = user?.userName; // Optional chaining to avoid errors

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchStatus("Searching"); // Set initial status as searching

        try {
            const response = await axios.get("http://localhost:3000/notes/getFiles", {
                params: {
                    title: searchQuery,
                },
            });

            // Log the response to inspect its structure for debugging
            console.log("API Response:", response);
            console.log("API Response Data:", response.data); // Full data structure
            console.log("Notes Data:", response.data.data); // Actual data array

            // Safely handle the response
            const notesData = response.data?.data || [];

            if (Array.isArray(notesData) && notesData.length > 0) {
                setSearchResults(notesData);
                setSearchStatus("Found");
            } else {
                setSearchResults([]);
                setSearchStatus("Not-Found");
            }
        } catch (error) {
            console.error("Error Fetching Notes: ", error);
            setSearchStatus("Error");
        }
    };

    const showPDF = (files) => {
        // Log files array to ensure it's correctly formatted
        console.log("Files Array:", files);
        
        // Assuming `files` is an array of file names. Adjust if necessary.
        if (Array.isArray(files) && files.length > 0) {
            window.open(`http://localhost:3000/files/${files[0]}`, "_blank", "noreferrer");
        } else {
            console.log("No files to show.");
        }
    };

    return (
        <div className="h-heightWithoutNavbar flex flex-col items-center justify-start p-4">
            <div className="flex w-full items-center justify-center">
                <form
                    className="w-full max-w-[700px] rounded-xl border border-black bg-[#374151] p-4"
                    onSubmit={handleSearch}
                >
                    <div className="flex items-center justify-between">
                        <FaSearch className="text-2xl text-white" />
                        <input
                            type="search"
                            placeholder="Search for Notes"
                            className="ml-3 w-full bg-[#374151] text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-5 grid w-full grid-cols-1 gap-5 border sm:grid-cols-2 lg:grid-cols-4">
                {searchStatus === "Found" && searchResults.length > 0 && (
                    searchResults.map((notes) => {
                        console.log("Note Object:", notes); // Log each note object
                        return (
                            <div
                                key={notes._id}
                                className="flex w-full max-w-[300px] flex-wrap-reverse items-center justify-between rounded-xl bg-[#374151] px-3 py-2 text-white shadow-lg"
                            >
                                <p className="mt-2 text-sm">
                                    <span className="font-bold">File name: </span>
                                    <span>{notes.fileName}</span>
                                </p>
                                <button onClick={() => showPDF(notes.files)}>Show PDF</button>
                            </div>
                        );
                    })
                )}
                {searchStatus === "Not-Found" && (
                    <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
                        No Notes Found
                    </div>
                )}
                {searchStatus === "Error" && (
                    <div className="mt-4 text-center text-red-600">
                        Error fetching notes. Please try again later.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;

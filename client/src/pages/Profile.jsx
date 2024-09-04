import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
    // Access user data from Redux store
    const user = useSelector((state) => state.user.userData);
    // Initialize state for user files
    const [userFiles, setUserFiles] = useState([]);

    // Get user ID from user data
    const userId = user?._id; // Add optional chaining to avoid errors if user is undefined

    // Fetch user files when userId changes
    useEffect(() => {
        if (userId) {
            const getUserFiles = async () => {
                try {
                    const result = await axios.get(`http://localhost:3000/notes/getFiles/${userId}`);
                    console.log(result.data);
                    setUserFiles(result.data.data);
                } catch (error) {
                    console.error("Error fetching user files:", error);
                }
            };

            getUserFiles();
        }
    }, [userId]);

    // Calculate number of uploads and files
    const numberOfUploads = userFiles.length;
    const numberOfFiles = userFiles.reduce((count, file) => count + 1, 0);

    return (
        <div className="lg:h-heightWithoutNavbar flex flex-col items-center justify-center border border-red-500 lg:flex-row">
            <div className="flex w-full flex-col items-center justify-center border-[3px] border-green-500 py-4 lg:h-full lg:w-[40%]">
                <div className="grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full bg-gray-400 text-2xl font-black">
                    {/* Display user profile image */}
                    <img src={user?.profileImage} alt="userprofile" className="" />
                </div>
                <div className="">
                    <div className="my-2 flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-black">
                            <span>{user?.firstName}</span> <span>{user?.lastName}</span>
                        </h2>
                        <p className="mt-1 text-center">{user?.userName}</p>
                        <p className="mt-1 text-center">
                            {user?.userBio}
                        </p>
                    </div>
                </div>
                {/* Counts */}
                <div className="flex items-center justify-center gap-4">
                    <div className="grid h-[80px] w-[100px] place-content-center">
                        <p className="text-center text-[12px] font-bold">
                            No. of Uploads:
                        </p>
                        <p className="text-center text-5xl font-black">{numberOfUploads}</p>
                    </div>
                    <span className="h-[60px] w-[1px] bg-gray-400" />
                    <div className="grid h-[80px] w-[100px] place-content-center">
                        <p className="text-center text-[12px] font-bold">No. of Files:</p>
                        <p className="text-center text-5xl font-black">{numberOfFiles}</p>
                    </div>
                </div>
            </div>
            <div className="h-auto w-full border-[3px] border-amber-500 p-5 lg:h-full lg:w-[60%]">
                <h1 className="mb-3 text-xl font-black">My Documents:</h1>
                <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3">
                    {userFiles.map((file) => (
                        <a
                            href={`http://localhost:3000/files/${file.files}`}
                            key={file._id}
                            className="mb-3 flex h-[35px] max-w-[250px] items-center justify-between gap-10 rounded-xl border border-black px-4"
                            target="_blank"
                            rel="noopener noreferrer" // Added for security
                        >
                            <p className="font-semibold"> {file.fileName}</p>
                            <FaExternalLinkAlt />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;

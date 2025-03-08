"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Page = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const router=useRouter();
  const {user}=useUserStore();
  const [isLoading, setIsLoading]=useState(false);


  const onDrop = useCallback((acceptedFiles:any) => {
    const file = acceptedFiles[0];
    //@ts-ignore
    setImagePreview(URL.createObjectURL(file)); // Show preview of the image
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    const formData = new FormData();

    // Append image, caption, and location to formData
    if (imagePreview) {
      //@ts-ignore
      const imageFile = document.querySelector('input[type="file"]').files[0];
      formData.append("image", imageFile);
    }
    formData.append("caption", caption);
    formData.append("location", location);
    //@ts-ignore
    formData.append("userId", user?.id);

    try {
      setIsLoading(true);
      // Send the formData to the backend
      const response = await fetch("/api/new-post", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const toastId = toast("Post created successfully!", { autoClose: 3000 });
      
        // Wait for the toast to disappear before navigating
        await new Promise((resolve) => setTimeout(resolve, 3000));
      
        router.push('/home'); 
      }
       else {
        alert("Error creating post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-start ml-7 text-white text-2xl m-7">
      <ToastContainer/>
      <div className="w-full">
        <h1 className="mt-7 font-bold flex justify-center">Create Post</h1>

        {/* Caption Input */}
        <div className="mt-7 min-w-screen">
          <h1 className="text-lg">Caption</h1>
          <Textarea
            placeholder="Write a caption..."
            className="bg-dark-3 h-[200px] w-full"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* Image Upload Section */}
        <div className="mt-7 min-w-screen">
          <h1 className="text-lg">Add Photos</h1>
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                
                <div className={!imagePreview?"flex flex-col items-center justify-center border-2 border-slate-300 rounded-lg p-3":"hidden"}>
                  <img src="file-upload.svg" className="flex justify-center w-20 h-20"/>
                  <p className="text-[15px]">Drag and drop file here to upload image</p>
                  <Button>Upload File</Button>

                  </div>
                   {imagePreview && (
                    <div className="mt-3">
                      <img src={imagePreview} alt="Preview" className="max-w-[40%] h-auto flex justify-center" />
                    </div>
                  )}
                  </>
              )}
            </div>
           
          </div>
        </div>

        {/* Location Input */}
        <div className="mt-7 min-w-screen">
          <h1 className="text-lg">Add Location</h1>
          <Textarea
            placeholder="Enter location..."
            className="bg-dark-3 h-[50px] w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex mt-7 justify-end">
          <Button className="bg-dark-2 mr-2" onClick={()=>router.push('/home')}>Cancel</Button>
          <Button className="bg-life-4" onClick={handleSubmit}>{isLoading?"Creating...":"Create"}</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

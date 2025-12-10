import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaVideo } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Upload = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [role, setRole] = useState("Developer");
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const droppedFile = acceptedFiles[0];
    setFile(
      Object.assign(droppedFile, {
        preview: URL.createObjectURL(droppedFile),
      })
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    maxFiles: 1,
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);

    // 1. Create FormData (Required for file uploads)
    const formData = new FormData();
    formData.append("video", file); // Must match 'upload.single("video")' in backend
    formData.append("description", desc);
    formData.append("jobRole", role);
    // Note: userId/username are handled by backend token, no need to send here

    try {
      // 2. Send to Backend
      await axios.post(`${import.meta.env.VITE_BACKEND}/api/posts`, formData, {
        withCredentials: true, // Important for cookies!
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload Successful!");
      navigate("/"); // Redirect to feed
    } catch (err) {
      console.error(err);
      alert("Upload Failed. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-grid-pattern relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-2xl bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-900/40">
            <FaVideo className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Upload Your Pitch
          </h2>
          <p className="text-gray-400">
            Record a 30s video to showcase your personality.
          </p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group ${
            isDragActive
              ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
              : "border-gray-700 hover:border-blue-400 hover:bg-gray-800/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            {file ? (
              <div className="w-full relative rounded-lg overflow-hidden border border-white/20">
                <video
                  src={file.preview}
                  className="w-full h-48 object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md">
                    {file.name}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaCloudUploadAlt className="text-gray-400 text-3xl group-hover:text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    MP4 or WebM (Max 50MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-8 space-y-4">
          <div>
            <label className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 block">
              Tell us about yourself
            </label>
            <textarea
              placeholder="I am a passionate developer with experience in..."
              className="w-full bg-black/40 border border-gray-700 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none h-32"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-2 block">
                Role
              </label>
              <select
                className="w-full bg-black/40 border border-gray-700 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-all"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Product Manager">Product Manager</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-white/10 active:scale-95 flex justify-center items-center"
              >
                {isUploading ? "Uploading..." : "Publish Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Upload;

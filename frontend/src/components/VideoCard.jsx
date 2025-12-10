import React, { useRef, useState } from "react";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaPaperPlane,
} from "react-icons/fa";

const VideoCard = ({ post, currentUser }) => {
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser?._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isSaved, setIsSaved] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  const handleLike = async () => {
    if (!currentUser) return alert("Please login to like!");

    const originalState = isLiked;
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND}/api/posts/${post._id}/like`,
        {
          userId: currentUser._id,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);

      setIsLiked(originalState);
      setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
    }
  };

  const handleHire = () => {
    const subject = `Interview Request: ${post.jobRole}`;
    const body = `Hi ${post.username},\n\nI saw your video resume on HireFeed...`;
    window.location.href = `mailto:${
      post.userEmail
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className="relative group overflow-hidden bg-black shadow-2xl transition-all duration-500
      w-full h-[100dvh] md:h-[640px] 
      md:w-[360px] md:rounded-[32px] md:border border-white/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Player */}
      <video
        ref={videoRef}
        src={post.videoUrl}
        className="w-full h-full object-cover opacity-100"
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      {/* 🔹 TEXT CONTENT FIX: Pushed way up to bottom-40 to clear mobile nav completely */}
      <div className="absolute bottom-40 md:bottom-8 left-0 w-full p-5 flex flex-col gap-3 pointer-events-none z-20">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shrink-0">
            {post.username ? post.username[0].toUpperCase() : "U"}
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-white font-bold text-lg drop-shadow-md leading-none truncate pr-2">
              {post.username}
            </h3>
            <span className="text-blue-400 text-xs font-bold tracking-wide uppercase mt-1">
              {post.jobRole}
            </span>
          </div>
        </div>

        <p className="text-gray-200 text-sm line-clamp-2 font-light drop-shadow-md md:max-w-[80%]">
          {post.description}
        </p>
      </div>

      {/* 🔹 BUTTONS FIX: Pushed up to bottom-48 */}
      <div className="absolute bottom-48 md:bottom-28 right-4 flex flex-col items-center gap-6 z-30 pointer-events-auto">
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group/btn"
        >
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover/btn:bg-red-500/20 transition-all border border-white/5">
            {isLiked ? (
              <FaHeart className="text-red-500 text-2xl drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            ) : (
              <FaRegHeart className="text-white text-2xl group-hover/btn:scale-110 transition" />
            )}
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md">
            {likeCount}
          </span>
        </button>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className="flex flex-col items-center gap-1 group/btn"
        >
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover/btn:bg-yellow-500/20 transition-all border border-white/5">
            {isSaved ? (
              <FaBookmark className="text-yellow-400 text-2xl drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
            ) : (
              <FaRegBookmark className="text-white text-2xl group-hover/btn:scale-110 transition" />
            )}
          </div>
        </button>

        {currentUser?.role === "recruiter" && (
          <button
            onClick={handleHire}
            className="p-3 bg-blue-600 rounded-full hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.6)] animate-pulse hover:animate-none transition-all transform hover:scale-110"
            title="Send Interview Request"
          >
            <FaPaperPlane className="text-white text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCard;

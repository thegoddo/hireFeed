import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../../components/VideoCard";

const Saved = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/posts/feed`
        );
        const mySaved = res.data.filter(
          (post) => post.saves && post.saves.includes(currentUser?._id)
        );
        setPosts(mySaved);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchSaved();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Shortlist</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No saved candidates yet.</p>
        </div>
      ) : (
        posts.map((post) => (
          <VideoCard key={post._id} post={post} currentUser={currentUser} />
        ))
      )}
    </div>
  );
};

export default Saved;

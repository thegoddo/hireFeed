import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "../../styles/profile.css"; // You might want to use Tailwind instead

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/posts/feed`
        );
        const userPosts = postsRes.data.filter((p) => p.userId === id);
        setPosts(userPosts);

        setProfile({
          username: userPosts[0]?.username || "User",
          role: userPosts[0]?.jobRole || "Candidate",
          email: userPosts[0]?.userEmail || "email@example.com",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  return (
    <main className="min-h-screen bg-white pb-20">
      <section className="flex flex-col items-center pt-10 px-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-gray-600">
          {profile.username[0].toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold">{profile.username}</h1>
        <p className="text-blue-600 font-medium">{profile.role}</p>
        <p className="text-gray-500 text-sm mt-1">{profile.email}</p>

        <div className="flex gap-8 mt-6 w-full max-w-xs justify-center border-t border-b py-4">
          <div className="text-center">
            <span className="block font-bold text-xl">{posts.length}</span>
            <span className="text-xs text-gray-500 uppercase">Videos</span>
          </div>
          <div className="text-center">
            <span className="block font-bold text-xl">0</span>
            <span className="text-xs text-gray-500 uppercase">Views</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-1 mt-4">
        {posts.map((post) => (
          <div key={post._id} className="aspect-[9/16] bg-black relative">
            <video
              className="w-full h-full object-cover"
              src={post.videoUrl}
              muted
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;

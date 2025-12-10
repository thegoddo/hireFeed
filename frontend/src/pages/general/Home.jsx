import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Mousewheel,
  Keyboard,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Icons
import { FaHome, FaPlusSquare, FaBookmark, FaUserCircle } from "react-icons/fa";

const Home = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.BACKEND}/api/posts/feed?role=${filter}`
        );
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filter]);

  return (
    // 🔹 Wrapper: Full Screen Height & Width
    <div className="h-[100dvh] w-full bg-[#0f0f0f] text-white flex flex-col relative overflow-hidden">
      {/* 🔹 Header (Desktop Nav + Filters) */}
      <div className="absolute top-0 left-0 w-full z-40 p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
          {/* Logo & Nav */}
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold tracking-tight text-white hidden md:block">
              HireFeed<span className="text-blue-500">.</span>
            </h1>
            <div className="hidden md:flex gap-4">
              <Link
                to="/"
                className="text-white hover:text-blue-400 transition"
              >
                <FaHome size={20} />
              </Link>
              <Link
                to="/upload"
                className="text-white hover:text-blue-400 transition"
              >
                <FaPlusSquare size={20} />
              </Link>
              <Link
                to="/saved"
                className="text-white hover:text-blue-400 transition"
              >
                <FaBookmark size={18} />
              </Link>
              <Link
                to={`/profile/${currentUser?._id}`}
                className="text-white hover:text-blue-400 transition"
              >
                <FaUserCircle size={20} />
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto justify-center md:justify-end">
            {[
              "All",
              "Developer",
              "Designer",
              "Product Manager",
              "Marketing",
            ].map((role) => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  filter === role
                    ? "bg-white text-black border-white"
                    : "bg-black/50 text-gray-300 border-white/10 hover:bg-white/10"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full flex items-center justify-center relative">
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        ) : (
          <Swiper
            modules={[
              Mousewheel,
              Keyboard,
              EffectCoverflow,
              Pagination,
              Navigation,
            ]}
            className="w-full h-full flex items-center justify-center" // Ensure Swiper itself is centered
            direction="vertical"
            slidesPerView={1}
            mousewheel={true}
            keyboard={{ enabled: true }}
            centerInsufficientSlides={true}
            centeredSlides={true}
            breakpoints={{
              768: {
                direction: "horizontal",
                effect: "coverflow",
                slidesPerView: "auto",
                spaceBetween: 40,
                navigation: true,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                },
              },
            }}
          >
            {posts.map((post) => (
              <SwiperSlide
                key={post._id}
                // 🔹 IMPORTANT: Flex center the slide content
                className="flex items-center justify-center"
                style={{ width: "auto", height: "100%" }}
              >
                <VideoCard post={post} currentUser={currentUser} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Home;

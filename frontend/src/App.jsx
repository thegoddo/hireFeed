import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Home from "./pages/general/Home";
import Saved from "./pages/general/Saved";
import Upload from "./components/Upload";
import Profile from "./pages/general/Profile";
import UserLogin from "./pages/auth/UserLogin";
import UserRegister from "./pages/auth/UserRegister";

const AppRoutes = ({ currentUser }) => {
  return useRoutes([
    { path: "/", element: <Home currentUser={currentUser} /> },
    { path: "/saved", element: <Saved currentUser={currentUser} /> },
    { path: "/upload", element: <Upload currentUser={currentUser} /> },
    { path: "/profile/:id", element: <Profile /> },
    { path: "/login", element: <UserLogin /> },
    { path: "/register", element: <UserRegister /> },
  ]);
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <Router>
      {/* 🔹 Container: Full Screen, Black Background, Center Content */}
      <div className="min-h-screen w-full bg-black text-white font-sans flex flex-col items-center">
        
        {/* 📱 Mobile Bottom Nav */}
        <div className="md:hidden z-50">
          <BottomNav />
        </div>

        {/* 🔹 Main Content: Full Width */}
        <main className="w-full h-screen relative">
          <AppRoutes currentUser={currentUser} />
        </main>
      </div>
    </Router>
  );
}

export default App;
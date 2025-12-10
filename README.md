# 👔 HireFeed

> A video-first recruitment platform connecting talent with recruiters.

HireFeed revolutionizes the hiring process by replacing static paper resumes with dynamic video pitches. Job seekers upload short video resumes to showcase their personality and communication skills, while HR professionals and recruiters scroll through a feed to discover, shortlist, and contact their next hire.

## 🚀 Tech Stack

**Client-Side:**

- React.js (Hooks, Functional Components)

- Axios (HTTP Requests)

- CSS/Tailwind (Responsive Styling)

**Server-Side:**

- Node.js (Runtime)

- Express.js (Web Framework)

- MongoDB (Database)

- Mongoose (ODM & Schema Validation)

## ✨ Features

- **Video Resume Feed**: Recruiters can endlessly scroll through short-form video introductions from candidates.

- **Shortlist Candidates**:

  > - HRs can "Save" promising candidates to a shortlist.
  > - Real-time "Saved by X recruiters" counters using MongoDB atomic operators.
  > - Optimistic UI updates for instant feedback.

- **Upload Portal**: Candidates can easily record and upload their video pitches.

- **Direct Contact**: Simple interface for recruiters to reach out to shortlisted talent.

- **Authentication**: Secure login for both Job Seekers and Recruiters.

## 🛠️ Installation & Setup

Follow these steps to run the project locally.

**Prerequisites**

Node.js (v14 or higher)

MongoDB (Local or Atlas)

**Git**

1. **Clone the repository**

```bash
git clone [https://github.com/thegoddo/hireFeed.git](https://github.com/thegoddo/hireFeed.git)
cd hireFeed
```

2. **Backend Setup**

Navigate to the server directory (or root, depending on your folder structure) and install dependencies.

```bash
cd server
npm install
```

**Configuration**:
Create a `.env` file in the `server` directory and add your environment variables:

```bash
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hirefeed?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:5173
```

**Start the Server**:

```bash
npm start

# or for development with nodemon

npm run dev
```

3. **Frontend Setup**

Open a new terminal window, navigate to the client directory, and install dependencies.

```bash

cd client
npm install
```

**Start the React App**:

```bash
npm start

# or if using Vite

npm run dev
```

## 📡 API Reference

---

**Resume & Feed**

| Method | Endpoint           | Description                           |
| ------ | ------------------ | ------------------------------------- |
| GET    | `/api/videos/feed` | Retrieve the main video feed.         |
| POST   | `/api/videos/save` | Toggle the "saved" status of a video. |
| GET    | `/api/videos/:id`  | Get details for a specific video.     |

**Auth**

| Method | Endpoint             | Description                         |
| ------ | -------------------- | ----------------------------------- |
| POST   | `/api/auth/register` | Register a new user.                |
| POST   | `/api/auth/login`    | Log in and receive a session/token. |

## 🧩 Code Highlight: Atomic Updates

To ensure data integrity when multiple users interact with the same video simultaneously, HireFeed uses MongoDB atomic operators to increment/decrement counters:

```// Backend Logic
await videoModel.findByIdAndUpdate(videoId, {
$inc: { savesCount: -1 }
});
```

## 🤝 Contributing

1. Contributions are always welcome!

2. Fork the project.

3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).

4. Commit your changes (`git commit -m 'Add some AmazingFeature'`).

5. Push to the Branch (`git push origin feature/AmazingFeature`).

6. Open a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

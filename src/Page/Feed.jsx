import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { clearFeed, setFeed } from "../FeedSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchFeed = async () => {
    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });
      dispatch(setFeed(res.data.data));
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to load feed",
        "error"
      );
      dispatch(clearFeed());
    }
  };

  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Request made successfully", {
          toastId: "request-success",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      nextCard();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to send request",
        "error"
      );
    }
  };

  const nextCard = () => {
    if (currentIndex < feed.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      dispatch(clearFeed());
      Swal.fire("Info", "No more profiles in feed", "info");
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <p className="text-gray-500">No profiles to show.</p>
      </div>
    );
  }

  const user = feed[currentIndex];

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100">
        <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-sm">
          <div className="flex flex-col items-center">
            <img
              src={user.photoUrl || "/default-avatar.png"}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-32 h-32 rounded-full object-cover mb-3"
            />
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}, {user.age}
            </h2>
          </div>

          <div className="mt-3">
            <p className="text-sm text-gray-700 font-medium">About:</p>
            <p className="text-gray-600 text-sm truncate">{user.about}</p>
          </div>

          <div className="mt-3">
            <p className="text-sm text-gray-700 font-medium">Skills:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => sendRequest("ignored", user._id)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Ignore
            </button>
            <button
              onClick={() => sendRequest("intrested", user._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={500} />
    </>
  );
};

export default Feed;

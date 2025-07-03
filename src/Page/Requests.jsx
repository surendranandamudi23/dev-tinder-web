import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { clearRequests, setRequests } from "../RequestsSlice";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(setRequests(res.data.data));
    } catch (err) {
      toast.info(err?.response?.data.message || "No connections found", {
        toastId: "fetch-requests-error",
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
      dispatch(clearRequests());
    }
  };

  const handleReviewRequest = async (requestId, status) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      Swal.fire("Success", res.data.message, "success");
      fetchRequests(); // Refresh list
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to update request",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Connection Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No pending connection requests.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={req.fromUserId.photoUrl || "/default-avatar.png"}
                  alt={req.fromUserId.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-[#00008b]">
                    {req.fromUserId.firstName} {req.fromUserId.lastName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleReviewRequest(req._id, "accepted")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReviewRequest(req._id, "rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={500} />
    </div>
  );
};

export default Requests;

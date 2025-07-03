import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { clearConnections, setConnections } from "../ConnectionSlice";
import { toast, ToastContainer } from "react-toastify";

const ConnectionsPage = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      });
      dispatch(setConnections(res.data.data));
    } catch (err) {
      dispatch(clearConnections());
      toast.info("No connections found", {
        toastId: "fetch-connections-error",
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
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Connections</h2>
      {connections.length === 0 ? (
        <p className="text-gray-500">No connections found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {connections.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow rounded-lg p-4 flex items-center gap-3"
            >
              <img
                src={user.photoUrl || "/default-avatar.png"}
                alt={user.firstName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={500} />
    </div>
  );
};

export default ConnectionsPage;

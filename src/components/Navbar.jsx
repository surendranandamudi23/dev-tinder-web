import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { removeUser } from "../UserSlice";
import { API_BASE_URL } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        console.log("Logout failed:", response);
      }
      if (response.status === 200) {
        dispatch(removeUser());
        Swal.fire({
          title: "Logout successful!",
          icon: "success",
        });
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const user = useSelector((state) => state.user);
  return (
    <div className="navbar bg-blue-400 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          {"👨‍💻DevTinder"}
        </a>
      </div>
      {user && (
        <div className="flex gap-2 justify-center items-center mx-4">
          <p>Welcome, {user?.firstName || ""}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user?.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate("/changepassword")}
                >
                  Change Password
                </a>
              </li>
              <li>
                <a onClick={() => navigate("/requests")}>Requests</a>
              </li>
              <li>
                <a onClick={() => navigate("/connections")}>Connections</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

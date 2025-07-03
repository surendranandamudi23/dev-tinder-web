import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../UserSlice";
import Swal from "sweetalert2";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      if (res.status !== 200) {
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
        });
        dispatch(removeUser());
        navigate("/login");
      } else {
        dispatch(addUser(res?.data?.data));
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Body;

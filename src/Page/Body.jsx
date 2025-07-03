import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../UserSlice";
import { API_BASE_URL } from "../constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      if (res.status !== 200) {
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

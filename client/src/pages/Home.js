import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  logout,
  setOnline,
  setSocketConnection,
  setUser,
} from "../redux/userSlice.js";
import Sideebar from "../components/Sideebar.js";
import sahara from "./Saharaa.png";
import io from "socket.io-client";

const Home = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userDetails = async () => {
    try {
      const URL = "/api/user-details";
      const response = await axios({
        url: URL,
        withCredentials: true,
      });
      dispatch(setUser(response?.data?.data));
      if (response?.data?.data?.logout) {
        dispatch(logout());
        navigate("/email");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userDetails();
  }, []);

  useEffect(() => {
    const socketConnection = io(
      process.env.REACT_APP_BACKEND_URL,
      {
        auth: {
          token: localStorage?.getItem("token"),
        },
      },
      []
    );


    socketConnection.on("online", (data) => {
      console.log("data", data);
      dispatch(setOnline(data));
    });
    dispatch(setSocketConnection(socketConnection));
    console.log("sc", socketConnection);

    return () => {
      socketConnection?.disconnect();
    };
  }, []);

  const basePath = location?.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen bg-sky-200">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sideebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      <div
        className={` justify-center items-center flex-col hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={sahara} width={600}/>
        </div>
        <p className="text-lg mt-2 ">Select the user to start chat</p>
      </div>
    </div>
  );
};

export default Home;

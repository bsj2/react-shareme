import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if (!user) navigate("/login");
  }, []);

  const initializeGapi = () => {
    gapi.client.init({
      clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
      scope: "",
    });
  };

  useEffect(() => {
    // load and init google api scripts
    gapi.load("client:auth2", initializeGapi);
  });

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;

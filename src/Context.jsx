/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const API_URL = "http://206.189.91.54/api/v1";
  const [regForm, setRegForm] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const [logForm, setLogForm] = useState({
    email: "",
    password: "",
  });

  const [authPage, setAuthPage] = useState(false);
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const [isLogin, setIsLogin] = useState(false);
  const handleRegister = (e) => {
    const { name, value } = e.target;
    setRegForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLogForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const registerUser = async (e) => {
    e.preventDefault();
    const { email, password, cpassword } = regForm;
    if (!email || !password || !cpassword) return alert("Fill up the form");
    if (password !== cpassword || cpassword !== password)
      return alert("Password did not matched");
    if (password.length < 6 || cpassword.length < 6)
      return alert("Password must be 6 chars long.");
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        email: email,
        password: password,
      });
      setAuthPage(false);
    } catch (error) {
      if (error.response.data.errors.full_messages) {
        return alert("Email already exist!");
      }
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = logForm;
    if (!email || !password) return alert("Invalid credentials");
    try {
      const response = await axios.post(`${API_URL}/auth/sign_in`, {
        email: email,
        password: password,
      });
      const { headers } = response;
      const { data } = response;
      if (headers) {
        const accessToken = headers["access-token"];
        const expiry = headers["expiry"];
        const client = headers["client"];
        const uid = headers["uid"];
        setUser({
          token: accessToken,
          expiry: expiry,
          client: client,
          uid: uid,
          id: data.data.id,
        });
      }
    } catch (error) {
      if (error.response.data.errors) return alert("Invalid credentials!");
    }
  };
  useEffect(() => {
    console.log(user);

  }, [user])

  return (
    <AppContext.Provider
      value={{
        user,
        API_URL,
        handleLogin,
        isLogin,
        setIsLogin,
        authPage,
        setAuthPage,
        regForm,
        handleRegister,
        setRegForm,
        registerUser,
        loginUser,
        logForm,
        setLogForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;

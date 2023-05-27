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

  const [messages, setMessages] = useState([]);
  const [headerName, setHeaderName] = useState("");
  const [messageID, setMessageID] = useState("");
  const [memberList, setMemberList] = useState([]);

  const getData = async (page, id, name) => {
    setMessagePage('')
    setHeaderName('')
    setMessageID(null)
    setMessagePage(page);
    setHeaderName(name);
    setMessageID(id);
  };

  const [authPage, setAuthPage] = useState(false);
  const [createChannelModal, setCreateChannelModal] = useState(false);
  const [addChannelMember, setAddChannelMember] = useState(false);
  const [messagePage, setMessagePage] = useState("");
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [userChannelList, setUserChannelList] = useState([]);
  const [memberForm, setMemberForm] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [channelForm, setChannelForm] = useState("");
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

  const addChannelToUser = async (e) => {
    const { token, client, expiry, uid } = user;
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/channels`,
        {
          name: channelForm,
          user_ids: [],
        },
        {
          headers: {
            "access-token": token,
            client: client,
            expiry: expiry,
            uid: uid,
          },
        }
      );
      if (response.data.errors) return alert("Channel name already exist!");
      setCreateChannelModal(false);
      getUserChannel();
    } catch (error) {
      console.log(error);
    }
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

  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
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

  const getUserChannel = async () => {
    try {
      const response = await axios.get(`${API_URL}/channels`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": user.token,
          client: user.client,
          expiry: user.expiry,
          uid: user.uid,
        },
      });
      const { data } = response;
      setUserChannelList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setIsLogin(true);
      localStorage.setItem("user", JSON.stringify(user));
      const getUser = async () => {
        await getUserChannel();
      };
      getUser();
    }
  }, [user]);

  const addMessage = async (e) => {
    e.preventDefault();
    const { token, client, uid, expiry } = user;
    try {
      const response = await axios.post(
        `${API_URL}/messages`,
        {
          receiver_id: messageID,
          receiver_class: messagePage,
          body: sendMessage,
        },
        {
          headers: {
            "access-token": token,
            expiry: expiry,
            client: client,
            uid: uid,
          },
        }
      );
      setSendMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const [channelOwnerID, setChannelOwnerID] = useState('')

  const getAllMember = async () => {
    const { token, client, expiry, uid } = user;
    try {
      const response = await axios.get(`${API_URL}/channels/${messageID}`, {
        headers: {
          "access-token": token,
          client: client,
          expiry: expiry,
          uid: uid,
        },
      });
      setChannelOwnerID(response.data.data.owner_id)
      setMemberList(response.data.data.channel_members);
    } catch (error) {
      console.log(error);
    }
  };


  const addMember = async (e) => {
    e.preventDefault();
    const { token, client, expiry, uid } = user;
    try {
      const response = await axios.post(
        `${API_URL}/channel/add_member`,
        {
          id: messageID,
          member_id: memberForm,
        },
        {
          headers: {
            "access-token": token,
            client: client,
            expiry: expiry,
            uid: uid,
          },
        }
      );
      getAllMember()
      setAddChannelMember(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(user){
    getUserChannel()
    }
  }, [userChannelList])
  return (
    <AppContext.Provider
      value={{
        memberForm,
        channelOwnerID,
        getAllMember,
        setMemberForm,
        setMemberList,
        headerName,
        getData,
        sendMessage,
        setSendMessage,
        user,
        messageID,
        memberList,
        addMessage,
        messages,
        logout,
        API_URL,
        addChannelToUser,
        messagePage,
        setChannelForm,
        setMessagePage,
        addMember,
        setMessages,
        userChannelList,
        handleLogin,
        setAddChannelMember,
        addChannelMember,
        isLogin,
        setIsLogin,
        authPage,
        setAuthPage,
        regForm,
        handleRegister,
        setRegForm,
        registerUser,
        createChannelModal,
        setCreateChannelModal,
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

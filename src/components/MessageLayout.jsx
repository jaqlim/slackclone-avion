/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGlobalContext } from "../Context";
import AddMessage from "./AddMessage";
import ChannelInfo from "./ChannelInfo";
import axios from "axios";

const MessageLayout = () => {
  const { messages,headerName, setMessages,API_URL, messageID, addMessage, user, messagePage } = useGlobalContext();
  const retrieveMessage = async () => {
    const { token, client, uid, expiry } = user;
    try {
        const response = await axios.get(
          `${API_URL}/messages?receiver_id=${messageID}&receiver_class=${messagePage}`,
          {
            headers: {
              "access-token": token,
              client: client,
              expiry: expiry,
              uid: uid,
            },
          }
        );
        setMessages(response.data.data);
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(() => {
    retrieveMessage()
  }, [addMessage, messageID])
  return (
    <>
      <div className="px-48 bg-sky-50 w-screen h-screen flex flex-col">
        <div className="w-full h-full px-5 flex flex-col">
          <div className="text-center py-4 font-bold text-2xl text-gray-700">
            {headerName }
          </div>
          <div
            className="gap-3 flex flex-col overflow-y-auto px-3"
            style={{ maxHeight: "600px" }}
          >
            {messages && messages.length > 0
              ? messages.map((messages) => {
                  return (
                    <div
                      className="p-4 bg-white shadow-sm rounded-3xl my-1 text-gray-700"
                      key={messages.id}
                    >
                      <span className="font-bold mr-2 text-black">
                        {messages.sender.email} - ({messages.sender.id})
                      </span>
                      <span className="ml-10 text-gray-400 text-sm">
                        {messages.created_at.slice(0, 10)}{" "}
                        {messages.created_at.slice(11, 16)}
                      </span>
                      <div>{messages.body}</div>
                    </div>
                  )
                })
              : ""}
          </div>
        </div>
        <AddMessage />
      </div>
      <ChannelInfo />
    </>
  );
};

export default MessageLayout;

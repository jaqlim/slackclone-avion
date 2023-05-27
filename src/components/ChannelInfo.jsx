/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGlobalContext } from "../Context";
const ChannelInfo = () => {
  const {
    setAddChannelMember,
    user,
    memberList,
    messagePage,
    getAllMember,
    channelOwnerID
  } = useGlobalContext();

  
  useEffect(() => {
    if (messagePage === "Channel") {
      getAllMember();
    }
  }, []);
  const {id} = user
  return (
    <div className="fixed right-0 top-0 w-48 h-screen bg-white border flex flex-col px-3 items-center">
        <>
          <h1 className="py-5 text-2xl font-bold text-gray-800 text-center">
            Info
          </h1>
          {messagePage === "Channel" && (
            <>
              <div className="mb-5 w-full px-4 text-lg flex justify-between items-center">
                Members{" "}
                {id === channelOwnerID && <i
                  className="fa-solid fa-plus cursor-pointer hover:opacity-70"
                  onClick={() => setAddChannelMember(true)}
                ></i>}
              </div>
              <ul className="w-full pl-4 border-t-2 overflow-y-auto max-h-96">
                {memberList.length > 0 &&
                  memberList.map((member) => {
                    return (
                      <li className="text-gray-600 my-2" key={member.id}>
                        {member.user_id}
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
          <div className="flex items-center justify-center h-72 mt-auto w-full flex-col">
            <div className="font-bold">YOUR ID:</div>
            {user.id}
          </div>
        </>
      
    </div>
  );
};

export default ChannelInfo;

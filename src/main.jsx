import React from 'react';
import { useGlobalContext } from "./Context";
import SideBar from "./components/SideNav";
import MainContent from "./components/MainContent";
import CreateChannel from "./components/CreateChannel";
import AddMember from "./components/AddMemberModal";

const Main = () => {
  const { createChannelModal, addChannelMember, activeUser } = useGlobalContext();
  return (
    <>
      {createChannelModal && <CreateChannel />}
      {addChannelMember && <AddMember />}
      {activeUser && <MessageLayout activeUser={activeUser} />}
      <div className="main__wrapper">
        <SideNav />
        <MainContent />
      </div>
    </>
  );
}

export default Main;

import { useGlobalContext } from "../Context";

const ChannelModal = () => {
  const { setCreateChannelModal, setChannelForm, channelForm, addChannelToUser } = useGlobalContext();
  return (
    <div className="bg-opacity-40 bg-black w-screen h-screen z-30 fixed flex items-center justify-center">
      <form className=" w-96 bg-white flex flex-col items-center px-10" onSubmit={addChannelToUser}>
        <h1 className="font-black text-3xl my-5">Create new channel.</h1>
        <input
          type="text"
          placeholder="Channel name"
          value={channelForm}
          className="w-full h-10 p-3 outline-none border"
          onChange={(e)=> setChannelForm(e.target.value) }
        />
        <div className="w-full flex gap-4">
          <button
            type="button"
            className="my-5 bg-white w-1/2 h-10 rounded-sm ml-auto text-black border border-black"
            onClick={() => setCreateChannelModal(false)}
          >
            Cancel
          </button>
          <button className="my-5 bg-black w-1/2 h-10 rounded-sm ml-auto text-white">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChannelModal;

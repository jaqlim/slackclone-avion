import { useGlobalContext } from "../Context"

const AddMessage = () => {

    const {addMessage, sendMessage, setSendMessage} = useGlobalContext()
    
  return (
    <form
    className="w-full flex items-center px-5 h-20"
    onSubmit={addMessage}
  >
    <input
      type="text"
      value={sendMessage}
      onChange={(e) => setSendMessage(e.target.value)}
      placeholder="Send messages..."
      className="w-full h-11 px-4 border shadow-sm"
    />
    <button className="shadow-sm w-14 h-11 bg-black">
      <i className="fa-regular fa-paper-plane bg-black text-white text-xl"></i>
    </button>
  </form>
  )
}

export default AddMessage
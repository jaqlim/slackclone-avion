/* eslint-disable react/no-unescaped-entities */
import { useGlobalContext } from "../Context";

const Login = () => {

    const {setAuthPage, loginUser, logForm, handleLogin} = useGlobalContext()
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-black mb-7">Slacky</h1>
      <form className="border shadow-sm flex flex-col p-7 w-96" onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Enter email"
          value={logForm.email}
          className="my-2 border outline-none p-2 text-base"
          required
          name='email'
          onChange={handleLogin}
        />
        <input
          type="password"
          placeholder="Enter password"
          required
          name='password'
          onChange={handleLogin}
          value={logForm.password}
          className="my-2 border outline-none p-2 text-base"
        />

        <button className="bg-gray-900 mt-3 h-9 text-white text-lg rounded-2xl hover:text-black hover:bg-white border border-black">
          Sign in
        </button>
        <div className="text-center mt-4 pt-3 border-t-2 text-gray-500 ">Don't have account? <span onClick={() => setAuthPage(true)} className="text-black cursor-pointer">Signup</span></div>
      </form>
    </div>
  );
};

export default Login;

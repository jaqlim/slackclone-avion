import { useGlobalContext } from "../Context";

const Register = () => {
  const { setAuthPage, handleRegister, regForm, registerUser } =
    useGlobalContext();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-black mb-7">Slacky</h1>
      <form
        className="border shadow-sm flex flex-col p-7 w-96"
        onSubmit={registerUser}
      >
        <input
          type="email"
          placeholder="Enter email"
          className="my-2 border outline-none p-2 text-base"
          required
          name="email"
          value={regForm.email}
          onChange={handleRegister}
        />
        <input
          type="password"
          placeholder="Create password"
          required
          name="password"
          onChange={handleRegister}
          value={regForm.password}
          className="my-2 border outline-none p-2 text-base"
        />
        <input
          type="password"
          value={regForm.cpassword}
          name="cpassword"
          onChange={handleRegister}
          placeholder="Confirm password"
          required
          className="my-2 border outline-none p-2 text-base"
        />
        <button className="bg-gray-900 mt-3 h-9 text-white text-lg rounded-2xl hover:text-black hover:bg-white border border-black">
          Sign up
        </button>
        <div className="text-center mt-4 pt-3 border-t-2 text-gray-500 ">
          Already signed up?{" "}
          <span
            onClick={() => setAuthPage(false)}
            className="text-black cursor-pointer"
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;

import { useGlobalContext } from "../Context"
import Register from "../components/Register"
import Login from "../components/Login"
const Auth = () => {

    const {authPage} = useGlobalContext()

  return (
    <>
    {authPage ? <Register /> : <Login />}
    </>
    )
}

export default Auth
import { useGlobalContext } from "./Context"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"

const App = () => {

  const {isLogin} = useGlobalContext()
  
  return (
    <>
    {isLogin ? <Dashboard /> : <Auth />}
    </>
    )
}

export default App
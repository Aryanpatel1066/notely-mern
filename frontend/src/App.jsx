 import {Routes,Route} from "react-router-dom"
 import Login from "./components/Auth/Login"
 import Register from "./components/Auth/Register"
 import Dashboard from "./pages/Dashboard"
 function App(){
  return (
    <>
    {/* <h1>app component</h1> */}
    {/* define the routes */}
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </>
  )
 }
 export default App;
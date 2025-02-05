import Router from "./components/Router";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
 
function App(){
  return(
    <>
     <Router/>
     <ToastContainer/>
      </>
  )
 }
 export default App;
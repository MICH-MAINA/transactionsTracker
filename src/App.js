import { BrowserRouter } from "react-router-dom";
import './App.css';
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import UserProfile from "./pages/userProfile";
import Registration from "./pages/registration";


function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path="/dashboard" element={<DashBoard/>} />
      <Route path="/login" element= {<Login/>} />
      <Route path="/signup" element= {<SignUp/>} />
      <Route path="/createprofile" element={<UserProfile/>}/>
      {/* <Route path="/createbusiness" element={<CreateBusiness/>}/> */}
      <Route path="/" element={<Registration/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;

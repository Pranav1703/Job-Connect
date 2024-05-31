import { useContext, useEffect } from "react";
import "../styles/Home.css"
import { Context } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


const Home = () => {
  

  const {isAuthorized,user} = useContext(Context)
  const navigate = useNavigate()


  console.log("current auth status",user,":",isAuthorized)

  const test = async()=>{
    const resposne = await axios.get("http://localhost:3000/test",{ withCredentials:true })
    console.log(resposne.data)
  }

  useEffect(() => {
      if(!isAuthorized){
        navigate("/login")
      }
  
  }, [isAuthorized])
  

  return (
    <>
  
      <div className="welcome">

        <div className="mainSection">
            <div id="txt">
              <h1>Welcome to JOB CONNECT </h1>
              <br />
              <p>
                Where Opportunities Meet Talent! Discover your next career move <br />
                <em>or</em> 
                <br/> 
                Find the perfect candidate to join your team. Start your journey today!
              </p>     
            </div>    
          <img src="https://localhost:3000/assets/student2.png" id="homeImg" />
        </div>

        <Footer/>

      </div>
    </>

  )
}

export default Home
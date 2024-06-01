import { useContext, useEffect } from "react";
import "../styles/Home.css"
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


const Home = () => {
  

  const {isAuthorized,user} = useContext(Context)
  const navigate = useNavigate()


  console.log("current auth status",user,":",isAuthorized)

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
          <img src={`${import.meta.env.VITE_SERVER_URL}/assets/student2.png`} id="homeImg" />
        </div>

        <Footer/>

      </div>
    </>

  )
}

export default Home
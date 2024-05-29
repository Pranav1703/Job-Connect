// import {Box,Flex} from "@chakra-ui/react"
import { useContext, useEffect } from "react";
import "../styles/Home.css"
import { Context } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
              <h1>Welcome to JOB BOARD </h1>
              <br />
              <p>
                Where Opportunities Meet Talent! Discover your next career move <br />
                <em>or</em> 
                <br/> 
                Find the perfect candidate to join your team. Start your journey today!
              </p>     
            </div>    
          <img src="http://localhost:3000/assets/student2.png" id="homeImg" />
        </div>

        <div className="featured">
          <h1>Featured Jobs</h1>
          <button onClick={()=>test()}>test</button>
          full - horizontal
          responsive - vertical
        </div>

      </div>
    </>

  )
}

export default Home
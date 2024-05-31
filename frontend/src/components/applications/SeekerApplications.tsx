import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../App"
import ApplicationCard from "./ApplicationCard"
import {
  Heading,
  Stack,
  VStack,
  Text
} from "@chakra-ui/react"
import axios from "axios"
const SeekerApplications = () => {

  const [myApplications,setMyApplications] = useState<Array<any>>()
  const {isAuthorized} = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    
    axios.get(`${import.meta.env.VITE_SERVER_URL}/application/jobseeker/getMyApplications`,{withCredentials:true})
        .then((res)=>{
          setMyApplications(res.data.applications);
          console.log(res.data.applications)
         
        })
        .catch((err)=>console.log("couldnt fetch",err));
    
    if(!isAuthorized){
      navigate("/login")
    }

  }, [isAuthorized])

  return (
    <div className="myApplicaitons">
      <Stack align={'center'}>
        <Heading fontSize={'3xl'} m={'20px'}>Your Applications</Heading>
      </Stack>
      <VStack w={'100%'} direction={'column'} justifyContent={'center'} alignContent={'center'}>
      
      {myApplications && myApplications.map((i)=>(
          <ApplicationCard 
            key={i._id}
            applicationID={i._id}
            name={i.name}
            email={i.email}
            phone={i.phone}
            github={i.gitHub}
            coverLetter={i.coverLetter}
            resumePath={i.resumePath}
            jobName={i.jobID.title}
            applicantName={i.applicantID.user.username}
            applicationListSetFunc={setMyApplications}
          />
        ))
      }
      {myApplications?.length===0?
        (
          <>
          <Text>You Didn't Apply For any jobs</Text>
          </>
        ):(
          null
        )
      }
      </VStack>
    </div>  
  )
}

export default SeekerApplications
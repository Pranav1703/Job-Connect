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
const EmployerApplications = () => {

  const [myApplications,setMyApplications] = useState<Array<any>>()
  const {isAuthorized,user} = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    
    axios.get(`${import.meta.env.VITE_SERVER_URL}/application/employer/getMyApplicants`,{withCredentials:true})
        .then((res)=>{
          setMyApplications(res.data.applications);
          console.log(res.data.applications)
         
        })
        .catch((err)=>console.log("couldnt fetch",err));
     console.log("role: ",user)
    
    if(!isAuthorized){
      navigate("/login")
    }

  }, [isAuthorized])

  return (
    <div className="myApplicaitons">
      <Stack align={'center'}>
        <Heading fontSize={'3xl'} m={'25px'}>Applications for your Jobs.</Heading>
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
          <Text>None Applied For Your Jobs Or Post A Job So People can apply</Text>
          </>
        ):(
          null
        )
      }
      </VStack>
    </div>  
  )
}

export default EmployerApplications
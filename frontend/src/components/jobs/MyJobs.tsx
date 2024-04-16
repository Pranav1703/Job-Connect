import { 
    Box,
    Flex,
    Stack,
    Spinner
} from "@chakra-ui/react"
import EmployerJobCard from "./EmployerJobCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { Toaster } from "react-hot-toast"


const MyJobs = () => {

  const [myJobs,setMyJobs] = useState<Array<any>>()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/job/employer/myjobs`,{ withCredentials:true })
      .then((res)=>{
        console.log(res.data.myJobs)
        setMyJobs(res.data.myJobs)
      })
      .catch((error)=>console.log("error when trying to fetch employer jobs -- ",error))

  }, [])
  
    //setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  return (
    <Box m={'1vw'} p={'1vw'} w={'100%'}>
      <Toaster/>
      <Flex m={'1vw'} direction={'column'}>
        {
          myJobs?(
            myJobs.map((ele)=>(
              <EmployerJobCard
              key={ele._id}
              _id={ele._id}
              title={ele.title}
              CompanyName={ele.companyName}
              locationType={ele.locationType}
              State={ele.state}
              City={ele.city}
              minSalary={ele.MinSalary}
              maxSalary={ele.MaxSalary}
              Description={ele.description}
              Expired={ele.expired}

              jobList={myJobs}
              listSetFunc={setMyJobs}
              />
            ))
          ):(
            <Spinner color="teal.500" size={'xl'} mx={'auto'} my={'30vh'}/>
          )
        }
      </Flex>
    </Box>
  )
}

export default MyJobs
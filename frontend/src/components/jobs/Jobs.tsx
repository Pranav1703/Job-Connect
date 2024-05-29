import JobCard from "./JobCard"
import { Input, 
  InputGroup,
  Flex, 
  Box,
  Spinner,
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../../App"
import { useNavigate } from "react-router-dom"
 

const Jobs = () => {

  const [jobs,setJobs] = useState<Array<any>>()
  const [search,setSeatch] = useState("");
  const {isAuthorized} = useContext(Context)
  const navigate = useNavigate()

  const searchJobs = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSeatch(e.target.value);
    const filteredJobs = jobs?.filter((job)=>{
       return (job.title.toLowerCase().includes(search.toLowerCase())) || 
              (job.companyName.toLowerCase().includes(search.toLowerCase())) || 
              (job.locationType.toLowerCase().includes(search.toLowerCase()))
    })
    console.log(jobs && jobs[0].jobPostedOn)
    setJobs(filteredJobs)
    
  }

  useEffect(() => {
   try {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/job/alljobs`,
        {withCredentials:true}
      )
      .then((res)=>{
        setJobs(res.data.jobs)
      })    
    if(!isAuthorized){
      navigate("/login")
    }

   } catch (error) {
    console.log("couldnt fetch data: ",error)
   }


  }, [isAuthorized])



  return (
    <>
      <Box m={'1vw'} p={'1vw'} w={'100%'} ml={'0'}>
        <InputGroup size='lg' marginLeft={'25%'} w={'55%'}>
          <Input placeholder='Search Jobs' value={search} onChange={(e)=>searchJobs(e)}/>
        </InputGroup>
        <Flex flexWrap={'wrap'} mt={'20px'}>
          {
            jobs ?( jobs.map((ele)=>(
              <JobCard key={ele._id}
                        _id={ele._id}
                        title={ele.title} 
                        companyName={ele.companyName}
                        locationType={ele.locationType}
                        minSalary={ele.MinSalary}
                        maxSalary={ele.MaxSalary}
                        description={ele.description}
                        jobPostedOn={ele.jobPostedOn}
                        />
            ))
          ):(
            <Spinner color="teal.500" size={'xl'} mx={'auto'} my={'30vh'}/>
          )
          }
        </Flex>

      </Box>
    </>
  )
}

export default Jobs
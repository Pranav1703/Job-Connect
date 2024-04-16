import JobCard from "./JobCard"
import { Input, 
  InputRightAddon,
  InputGroup,
  Flex, 
  Box,
  Spinner
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

  const searchJobs = ()=>{

  }

  useEffect(() => {
   try {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/job/alljobs`,
        {withCredentials:true}
      )
      .then((res)=>{
        console.log(res.data)
        setJobs(res.data.jobs)
      })

   } catch (error) {
    console.log("couldnt fetch data: ",error)
   }


  }, [])

  if(!isAuthorized){
    navigate("/login")
  }


  return (
    <>
      <Box m={'1vw'} p={'1vw'} w={'100%'}>
        <InputGroup size='lg' marginLeft={'25%'} w={'55%'}>
          <Input placeholder='Search' />
          <InputRightAddon onClick={()=>search}>
            Search
          </InputRightAddon>
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
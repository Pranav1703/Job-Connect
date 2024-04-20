import {
    Box,
    Flex,
    Heading,
    Stack,
    useColorModeValue,
    Text,
    HStack,
    Button
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import { Context } from "../../App"

const JobDetails = () => {

  const [jobTitle,setJobTitle] = useState<string>("")
  const [companyName,setCompanyName] = useState<string>("")
  const [locType,setLocType] = useState<string>("")
  const [state,setState] = useState<string>("")
  const [city,setCity] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [MinSalary,setMinSalary] = useState<string>("")
  const [MaxSalary,setMaxSalary] = useState<string>("")
  const [postedBy,setPostedBy] = useState<string>("")
  
  let { id } = useParams();
  const {user} =useContext(Context)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/job/${id}`,{
        withCredentials:true
      })
      .then((res)=>{
        setJobTitle(res.data.job.title)
        setCompanyName(res.data.job.companyName)
        setLocType(res.data.job.locationType)
        setState(res.data.job.state)
        setCity(res.data.job.city)
        setMinSalary(res.data.job.MinSalary)
        setMaxSalary(res.data.job.MaxSalary)
        setDescription(res.data.job.description)
        setPostedBy(res.data.job.postedBy.username)
      })
      .catch((err)=>console.log(err))
    
  }, [])
  

  return (
    <div>
      <Flex
        minH={'90vh'}
        align={'center'}
        justify={'flex-start'}
        bg={useColorModeValue('gray.50', 'gray.900')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={4} px={4} alignItems={'center'}>
            <Stack align={'center'}>
                  <Heading fontSize={'3xl'}>Job Details</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
              minW={'55vw'}>
                <Stack spacing={12}>
                  <HStack>
                    <Text> <span style={{fontWeight:'500'}}>Job Title:</span>  {jobTitle}</Text>
                    <Text mx={'auto'}> <span style={{fontWeight:'500'}}>Company Name:</span>  {companyName}</Text>
                  </HStack>
                  <Text> <span style={{fontWeight:'500'}}>Location Type:</span>{locType} </Text>

                  <Text> <span style={{fontWeight:'500'}}>Salary:</span>₹{MinSalary} - ₹{MaxSalary} </Text>

      
                  <HStack>
                    <HStack>
                      <Text fontWeight={'500'}> State: </Text>
                      <Text>{state?(state):(<>---</>)}</Text>
                    </HStack>

                    <HStack mx={'auto'}>
                      <Text fontWeight={'500'}> City: </Text>
                      <Text>{city?(city):(<>---</>)}</Text>
                    </HStack>
                  </HStack>

                  <HStack alignItems={'flex-start'}>
                    <Text fontWeight={'500'}> Description: </Text>
                    <Text>{description}</Text>
                  </HStack>

                  <Text> <span style={{fontWeight:'500'}}>Posted By:</span>{postedBy} </Text>

                  {
                    user.role==="Job Seeker"?(
                    <Button
                      bg={'teal.400'}
                      color={'white'}
                      _hover={{
                        bg: 'teal.600',
                      }}
                      >
                      <Link to={`/application/${id}`}>Apply</Link>
                    </Button>
                    ):(
                      <Button
                        bg={'teal.400'}
                        color={'white'}
                        _hover={{
                          bg: 'teal.600',
                        }}
                        isDisabled
                        >
                        Employers cannot apply
                      </Button>  
                    )
                  }

                </Stack>
            </Box>
        </Stack>
      </Flex>
    </div>
  )
}

export default JobDetails
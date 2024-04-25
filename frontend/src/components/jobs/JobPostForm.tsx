import { 
  HStack,
  Flex,
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Input,
  Box, 
  Heading,
  Textarea,
  NumberInput,
  NumberInputField,
  Button,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../App';

const JobPostForm = () => {

  const [jobTitle,setJobTitle] = useState<string>("")
  const [companyName,setCompanyName] = useState<string>("")
  const [locType,setLocType] = useState<string>("")
  const [state,setState] = useState<string>("")
  const [city,setCity] = useState<string>("")
  const [description,setDescription] = useState<string>("")
  const [MinSalary,setMinSalary] = useState<string>("")
  const [MaxSalary,setMaxSalary] = useState<string>("")
  const [errMsg,setErrMsg] = useState<string>("")

  const format = (val:string) => `₹` + val
  const parse = (val:string) => val.replace(/^\₹/, '')
  
  const {isAuthorized} = useContext(Context)
  const navigate = useNavigate()

  const submitHandler = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    event.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/job/post`,{
        jobTitle,
        companyName,
        locType,
        state,
        city,
        MinSalary,
        MaxSalary,
        description
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })

      if(response.data.err){
        setErrMsg(response.data.err)
      }
      if(response.data.msg){
        toast.success(response.data.msg);
      }

    } catch (error) {
      console.log("error when posting a job: ",error)
    }
  }

  


  useEffect(() => {
    if(!isAuthorized){
      navigate("/login")
    }

  }, [isAuthorized])

  return (
    <>
      <Toaster/>
      <div className="jobPostForm">
        <Flex
          minH={'90vh'}
          align={'flex-start'}
          justify={'flex-start'}
          bg={useColorModeValue('gray.50', 'gray.800')}>

          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6} alignItems={'center'}>
            <Stack align={'center'}>
                  <Heading fontSize={'3xl'}>Post A New Job</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
              minW={'50vw'}>
                <Stack spacing={6}>
                  <FormControl isRequired>
                    <HStack>
                      <FormLabel>
                        JobTitle:
                      </FormLabel>
                      <Input size={'sm'}  type='jobTitle' value={jobTitle} onChange={(e)=> setJobTitle(e.target.value)} />
                    </HStack>
                  </FormControl>

                  <FormControl isRequired>
                    <HStack>
                      <FormLabel>
                        CompanyName:
                      </FormLabel>
                      <Input size={'sm'} type='jobTitle' value={companyName} onChange={(e)=> setCompanyName(e.target.value)} />
                    </HStack>
                  </FormControl>

                  <FormControl id="role" isRequired>
                    <HStack>
                      <FormLabel>LocationType</FormLabel>
                      <Select placeholder='Select Location Type' value={locType} onChange={(e)=> setLocType(e.target.value) }>
                        <option>On Site</option>
                        <option>Remote</option>
                      </Select>
                    </HStack>
                  </FormControl>

                  {
                    locType==="On Site"?(
                      <FormControl isRequired>
                        <HStack spacing={5}>
                          <FormLabel>
                            State:
                          </FormLabel>
                          <Input size={'sm'} type='Location' value={state} onChange={(e)=>setState(e.target.value)}/>

                          <FormLabel>
                            City:
                          </FormLabel>
                          <Input size={'sm'} type='Location' value={city} onChange={(e)=>setCity(e.target.value)}/>
                        </HStack>
                      </FormControl>
                    ):(
                      null
                    )
                  }

                  <FormControl isRequired>
                    <HStack>

                      <FormLabel>
                        MinSalary:
                      </FormLabel>
                      <NumberInput
                        onChange={(valueString) => setMinSalary(parse(valueString))}
                        value={format(MinSalary)}
                      >
                        <NumberInputField />
                      </NumberInput>

                      <FormLabel>
                        MaxSalary:
                      </FormLabel>
                      <NumberInput
                        onChange={(valueString) => setMaxSalary(parse(valueString))}
                        value={format(MaxSalary)}
                      >
                        <NumberInputField />
                      </NumberInput>

                    </HStack>
                  </FormControl>

                  <HStack>
                    <FormControl isRequired>
                      <FormLabel alignSelf={'flex-start'}>Description:</FormLabel>
                      <Textarea placeholder='Job Description' value={description} onChange={(e)=> setDescription(e.target.value)} h={'200px'} resize={'vertical'}/>
                    </FormControl>

                  </HStack>
                  {
                    errMsg?(
                      <p style={{color:'red'}}>{errMsg}</p>
                    ):(
                      null
                    )
                  }
                  
                  <Button
                    bg={'teal.400'}
                    color={'white'}
                    _hover={{
                      bg: 'teal.600',
                    }}
            
                    onClick={(e)=>submitHandler(e)}
                    >
                    Post Job
                  </Button>
                  

                </Stack>
            </Box>
          </Stack>

        </Flex>
      </div>
    </>
  )
}

export default JobPostForm
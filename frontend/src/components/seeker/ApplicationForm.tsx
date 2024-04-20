import { 
  Flex,
  Stack,
  Box,
  Heading,
  useColorModeValue,
  FormControl,
  HStack,
  Input,
  Textarea,
  Button
} from "@chakra-ui/react"
import axios from "axios"
import { MouseEvent, useState } from "react"
import { useParams } from "react-router-dom"

const ApplicationForm = () => {

  const [name,setName] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [phone,setPhone] = useState<string>("")
  const [github,setGithub] = useState<string>("")
  const [coverLetter,setCoverLetter] = useState<string>("")
  const [resume,setResume] = useState<File>()
  

  const [errMsg,setErrMsg] = useState<boolean>(false)

  const { id } = useParams()

  const validate = (email: string,name: string, phone: string):boolean=>{

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(validRegex.test(email) && name.length>=0 && phone.length===10 && coverLetter.length>=10) {

      return true
    }else{
      setErrMsg(true)
      return false
    }
  }

  const submitHandler = async(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    try {
      const formData = new FormData();

      if(resume && validate(email,name,phone)){
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("github", github);
        formData.append("coverLetter", coverLetter);
        formData.append("resume", resume);
        formData.append("jobId",id!)
  
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/application/apply`,formData,{
        withCredentials:true
        })

        console.log(res)
      }


    } catch (error) {
      console.log("error when sending request; ",error)
      return
    }

      setName("")
      setEmail("")
      setPhone("")
      setGithub("")
      setCoverLetter("")
      setResume(undefined)
      setErrMsg(false)

  }

  return (
      <div className="applicationForm">
        <Flex
        minH={'90vh'}
        align={'flex-start'}
        justify={'flex-start'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6} alignItems={'center'}>
            <Stack align={'center'}>
                  <Heading fontSize={'3xl'}>Application Form</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
              minW={'50vw'}>
                <Stack spacing={8}>
                    <FormControl isRequired>
                      <HStack>
      
                        <Input size={'sm'} placeholder={'Name'} value={name} onChange={(e)=> {setName(e.target.value)}} />
                      </HStack>
                    </FormControl>

                    <FormControl isRequired>
                      <HStack>

                        <Input size={'sm'} placeholder="Phone number" type='number'  value={phone} onChange={(e)=> setPhone(e.target.value)} />
                      </HStack>
                    </FormControl>

                    <FormControl isRequired>
                      <HStack>
        
                        <Input size={'sm'} placeholder="Email" value={email} onChange={(e)=> {setEmail(e.target.value)}} />
                      </HStack>
                    </FormControl>


                    <FormControl isRequired>
                      <HStack>

                        <Input size={'sm'} placeholder="Github" value={github} onChange={(e)=> setGithub(e.target.value)} />
                      </HStack>
                    </FormControl>

                    <Textarea placeholder='Cover Letter' value={coverLetter} onChange={(e)=> setCoverLetter(e.target.value)} h={'200px'} resize={'vertical'}/>
                    
                    <FormControl isRequired>
                      <HStack>
  
                        <input type="file" onChange={(e)=>{setResume(e.target.files![0])}}/>
                      </HStack>
                    </FormControl>

                    {
                    errMsg?(
                      <p style={{color:'red'}}>Invalid credentails.</p>
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
                    Apply
                  </Button>

                </Stack>
            </Box>
              
          </Stack>
        </Flex>
      </div>
  )
}

export default ApplicationForm
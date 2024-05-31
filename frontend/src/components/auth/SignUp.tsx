import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Context } from "../../App"

const server_url = import.meta.env.VITE_SERVER_URL

const SignUp = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [username,setUsername] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const [isInvalidEmail,setIsInvalidEmail] = useState<boolean>(false)
  const [password,setPassword] = useState<string>("")
  const [role,setRole] = useState<string>("")
  const [emailErr,setEmailErr] = useState<boolean>(false) 

  const navigate = useNavigate()
  const {isAuthorized,setIsAuthorized,setUser} = useContext(Context)
  
  // console.log(data)

  const validate = (email: string,role: string,username: string, password: string):boolean=>{
    setIsInvalidEmail(false)
    setIsAuthorized(true)
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(validRegex.test(email) && (role === "Job Seeker" || role ==="Employer" ) && password.length!==0 && username.length!==0) {

      return true
    }else{
      setIsInvalidEmail(true)
      return false
    }
  }

  const submitHandler = async(event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    
    event.preventDefault()
    if(validate(email,role,password,username)){
      
      try {
        const response = await axios.post(`${server_url}/user/signup`,{
          username,
          role,
          email,
          password
        },{
            headers:{
              "Content-Type": "application/json"
            },
            withCredentials:true
          }
        )
        console.log(response.data)
        if(response.data.err){
           setEmailErr(true)
           setIsInvalidEmail(false)
        }

        if(response.data.msg === "success"){
          console.log("success")
           setIsAuthorized(true)
           setUser({role:role})
           navigate("/")
        }

      } catch (error) {
        console.log("axios error-->",error)
      }

      setUsername("");
      setRole("");
      setEmail("");
      setPassword("");
      

    }else{
      console.log("invalid credentials")
      
      
      setUsername("");
      setRole("");
      setEmail("");
      setPassword("");
      setIsInvalidEmail(true)
      return
    }

    console.log(isAuthorized)
  } 

  return (
    <div className="signupBox">
      
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} w={'full'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>

          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
 
              {/* username */ }
              <FormControl id="Username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
              </FormControl>

              <FormControl id="role" isRequired isInvalid={!(role==="Job Seeker" || role === "Employer")}>
                <FormLabel>Role</FormLabel>
                <Select placeholder='Select role' value={role} onChange={(e)=> setRole(e.target.value) }>
                  <option>Job Seeker</option>
                  <option>Employer</option>
                </Select>
                {
                 !(role==="Job Seeker" || role === "Employer")?(
                    <FormErrorMessage>Select your role</FormErrorMessage>
                  ):(
                    null
                  )
                }

              </FormControl>

                
              {/* email */ }
              <FormControl id="email" isRequired isInvalid={isInvalidEmail}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                {
                  isInvalidEmail?(  
                    <FormErrorMessage>Enter a valid email</FormErrorMessage>
                  ):(
                    null
                  )
                }
              </FormControl>

              {/* password */ }
              <FormControl id="password" isRequired isInvalid={password.length<8 && password.length!==0}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=> setPassword(e.target.value)}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {
                  password.length<8?(
                    <FormErrorMessage>Password length should be 8 or greater</FormErrorMessage>
                  ):(
                    null
                  )
                }
              </FormControl>

              {
                emailErr?(
                  <p style={{color:'red'}}>Email Already registered</p>
                ):(
                  null
                )
              }
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.300'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.600',
                  }}
                  onClick={(e)=>submitHandler(e)}
                  >
                  Sign up
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link href="/login" color={'blue.400'}>Log in</Link>
                </Text>
              </Stack>

            </Stack>
          </Box>
        </Stack>
      </Flex>

    </div>
  )
}

export default SignUp
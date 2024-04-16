import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link
  } from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Context } from '../../App'
import { useNavigate } from 'react-router-dom'


const LogIn = () => {
  
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [isInvalid,setIsinValid] = useState<boolean>(false)

  const { setIsAuthorized, setUser} = useContext(Context)
  const navigate = useNavigate()

  const submitHandler = async(event:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    event.preventDefault()

    console.log("sign in details-----")
    console.log("email: ",email)
    console.log("password: ",password)

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`,{
        email,
        password
      },{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        }
      )
      console.log(res.data)  
      if(res.data.err){
        setIsinValid(true)
      }
      if(res.data.msg === "success"){
        setIsAuthorized(true)
        setUser({role: res.data.role})
        navigate("/")
      }
    } catch (error) {
      console.log("error when requesting: ",error)
    }


  }

  return (
 
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Log in to your account</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
               <Stack spacing={4}>
                {/* email */}
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                </FormControl>

                {/* password */}
                <FormControl id="password" >
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                </FormControl>
                {
                  isInvalid?(
                    <p style={{color:'red'}}>Invalid credentials</p>
                  ):(
                    null
                  )
                }
                
                <Stack spacing={10} pt={6}>
                  
                  <Button
                    bg={'teal.400'}
                    color={'white'}
                    _hover={{
                      bg: 'teal.600',
                    }}
            
                    onClick={(e)=>submitHandler(e)}
                    >
                    Log in
                  </Button>

                  <Stack>
                      <Text align={'center'}>
                         Already a user? <Link href="/signup" color={'blue.400'}>Sign Up</Link>
                       </Text>
                    </Stack>
                
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
 
  )
}

export default LogIn
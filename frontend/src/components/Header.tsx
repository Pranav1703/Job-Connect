
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useNavigate ,Link} from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../App'
import "../styles/Header.css"

interface Props {
  children: React.ReactNode,
  href: string
}

const seekerLinks = [
  {
    link:"Home",
    path: "/"
  },
  {
    link:"Jobs",
    path:"/jobs"
  },
  {
    link: "My Applications",
    path:"/myapplications"
  }
]

const employerLinks = [
  {
    link:"Home",
    path: "/"
  },
  {
    link:"Jobs",
    path:"/jobs"
  },
  {
    link: "Post a Job",
    path:"/postjob"
  },
  {
    link: "My Jobs",
    path: "myjobs"
  },
  {
    link: "Applicants",
    path:"/myapplicants"
  }
]


const NavLink = (props: Props) => {
  const { children , href } = props
  return (
    <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      >
      <Link to={href}>{children}</Link>
    </Box>
  )
}

const serverUrl = import.meta.env.VITE_SERVER_URL 


export default function Header() {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const {user,isAuthorized,setIsAuthorized} = useContext(Context)

  const Links = user.role==="Job Seeker"? seekerLinks:user.role==="Employer"? employerLinks : []

  const logOutHandler = async()=>{
    try {
      const res = await axios.post(`${serverUrl}/user/logout`,null,{withCredentials:true})
      console.log(res.data.msg)
      setIsAuthorized(false)
    } catch (error) {
      console.log(error)
    }
    navigate("/login")
  }

  return (
    <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} className={isAuthorized?'show':"hide"}>
          <Flex h={20} alignItems={'center'} justifyContent={'space-between'} >
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={0} alignItems={'center'} justifyContent={'space-between'} w={'59%'}>
              <Box fontSize={'larger'} fontWeight={'500'} fontFamily={'"Archivo Black", sans-serif'}>Job Connect</Box>
              <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                {Links.map((i) => (
                  <NavLink key={i.link} href={i.path}>{i.link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'} gap={'8px'}>
              
              
              <Button        
                variant={'solid'}
                colorScheme={'teal'}
                size={'md'}
                mr={4}
                onClick={logOutHandler}
                >
                LogOut
              </Button>
            </Flex>
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((i) => (
                  <NavLink key={i.link} href={i.path}>{i.link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>

    </>
  )
}
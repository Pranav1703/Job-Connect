import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../App"
import ApplicationCard from "./ApplicationCard"
import {
  Flex,
  VStack
} from "@chakra-ui/react"
const MyApplications = () => {


  const {isAuthorized} = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthorized){
      navigate("/login")
    }

  }, [isAuthorized])

  return (
    <div className="myApplicaitons">
      <VStack w={'100%'} direction={'column'} justifyContent={'center'} alignContent={'center'}>
        <ApplicationCard/>
      </VStack>
    </div>  
  )
}

export default MyApplications
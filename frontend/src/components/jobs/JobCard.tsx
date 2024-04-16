import { Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Heading , 
    Text , 
    Button,
    HStack
} from "@chakra-ui/react"
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

type JobCardProps = {
  _id: string,
  title: string,
  companyName: string,
  locationType: string,
  minSalary: string,
  maxSalary: string,
  description: string
}

const JobCard = ({_id,title,companyName,locationType,minSalary,maxSalary,description}:JobCardProps) => {
  

  
  return (

    <Card minW={'sm'} maxW={'sm'} _hover={{boxShadow:'0 0 11px rgba(35,35,35,.3)'}} transition={'all 0.5s'} m={'1vw'} userSelect={'none'}>
        <CardHeader mb={'-15px'}>
          <Heading size='md'> {title}</Heading>
          <Text fontSize={'xs'} mt={'5px'}> {companyName}</Text>
        </CardHeader>
        <CardBody>
          <HStack>
            <IoLocationOutline /> 
            <Text>{locationType}</Text>
           
          </HStack>
          <Text>₹ {minSalary} - ₹{maxSalary} </Text>
          <Text pt={'6px'} overflow={'hidden'} textOverflow={'ellipsis'} noOfLines={2}>  {description}description </Text>
        </CardBody>
        <CardFooter mt={'-10px'} justifyContent={'space-between'} alignItems={'flex-end'}>
          <Button ><Link to={`/job/${_id}`}>View Details</Link></Button>
          <Text fontSize={'xs'}>Posted {'3'} days ago</Text>
        </CardFooter>
    </Card>
  )
}

export default JobCard
          
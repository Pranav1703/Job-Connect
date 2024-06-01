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
  jobPostedOn: string
}

const JobCard = ({_id,title,companyName,locationType,minSalary,maxSalary,description,jobPostedOn}:JobCardProps) => {
  
  //2024-04-11T12:34:25.639Z
  
  const iDontKnowWhatToNameThisFunction=(jobPostedOn:string): string=>{
  
    const postendOn = jobPostedOn.slice(0,10);
    const currentDate = new Date().toDateString().slice(4);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const postedMonth = months[parseInt(postendOn.slice(5,7),10)-1]

    if(postedMonth!==currentDate.slice(0,3)){ 
      return "Posted a month ago"
    }
    const number_of_days = parseInt(currentDate.slice(4,6),10) - parseInt(postendOn.slice(8),10)

    return `Posted ${number_of_days} days ago`
  }


  return (

    <Card minW={'sm'} maxW={'sm'} bg={'rgb(253, 253, 255)'} _hover={{boxShadow:'0 0 11px rgba(35,35,35,.3)'}} transition={'all 0.5s'} m={'1vw'} userSelect={'none'}>
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
          <Text fontSize={'xs'}>{iDontKnowWhatToNameThisFunction(jobPostedOn)}</Text>
        </CardFooter>
    </Card>
  )
}

export default JobCard
          
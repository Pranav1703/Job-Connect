import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { 
  Box, 
  Flex, 
  HStack,
  Editable,
  EditableInput,
  ButtonGroup,
  IconButton,
  useEditableControls,
  Stack,
  Input,
  EditablePreview, 
  Text,
  Select,
  EditableTextarea,
  Button
} from "@chakra-ui/react"
import axios from "axios"
import {  useEffect, useState } from "react"
import toast from "react-hot-toast"
import { MdDelete } from "react-icons/md";


type MyJobCardProps = {
  _id: string,
  title: string,
  CompanyName: string,
  locationType: string,
  State: string,
  City: string,
  minSalary: string,
  maxSalary: string,
  Description: string,
  Expired: boolean,
  jobList: Array<any>,
  listSetFunc: React.Dispatch<React.SetStateAction<any[] | undefined>>
}


const EmployerJobCard = ({_id,title,CompanyName,locationType,State,City,minSalary,maxSalary,Description,Expired,jobList,listSetFunc}:MyJobCardProps) => {
  
  const [jobTitle,setJobTitle] = useState<string>(title)
  const [companyName,setCompanyName] = useState<string>(CompanyName)
  const [locType,setLocType] = useState<string>(locationType)
  const [state,setState] = useState<string>(State)
  const [city,setCity] = useState<string>(City)
  const [description,setDescription] = useState<string>(Description)
  const [MinSalary,setMinSalary] = useState<string>(minSalary)
  const [MaxSalary,setMaxSalary] = useState<string>(maxSalary)
  const [expired,setExpired] = useState<boolean>(Expired)

  const [isUpdated,setIsUpdated] = useState<boolean>(false)

  const handleChangeInExpiredInput = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    if(e.target.value==="true"){
      setExpired(true);
    }else if(e.target.value==="false") setExpired(false)
  }

  const updateDetails = async()=>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/job/update/${_id}`,{
        title:jobTitle,
        companyName:companyName,
        locationType: locType,
        state:state,
        city:city,
        MinSalary:MinSalary,
        MaxSalary:MaxSalary,
        description:description,
        expired:expired
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })

      toast.success("job updated successfully")
    } catch (error) {
      console.log("error when trying to update details ",error)
    }
  }

  const deleteJob = async()=>{
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/job/delete/${_id}`,{ withCredentials:true })
      console.log(res.data.msg)
      toast.success("job deleted successfully")    
      listSetFunc((prevJobs) => prevJobs!.filter((job) => job._id !== _id));
    } catch (error) {
      console.log("couldnt delete Job.",error)
    }
  }


  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()
    
 

    return isEditing ? (
      <ButtonGroup size='sm' onClick={()=>setIsUpdated(true)}>
        <IconButton icon={<CheckIcon />} aria-label="Submit" {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} aria-label="Cancel" {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (

        <IconButton size='sm' aria-label="Edit" icon={<EditIcon />} {...getEditButtonProps()} />
  
    )
  }
  

  return (
    <Box minW={'93%'} minH={'xs'} _hover={{boxShadow:'0 0 11px rgba(35,35,35,.3)'}} transition={'all 0.5s'} m={'1vw'} borderRadius={'5px'} border={'1px'}>
        <Stack spacing={8} p={'2vw'}>
          
          <HStack justifyContent={'space-between'} w={'90%'}>
              <Editable
              defaultValue={jobTitle}
              fontSize='md'
              isPreviewFocusable={false}
              >   
                <HStack>
                  <Text fontSize={'md'} fontWeight={'500'}>Job Title:</Text>
                  <EditablePreview />
                  <Input as={EditableInput} w={'150px'} size={'xs'} onChange={(e)=>setJobTitle(e.target.value)}/>
                  <EditableControls />
                </HStack>
              </Editable>

              <Editable
              defaultValue={companyName}
              fontSize='md'
              isPreviewFocusable={false}

              >   
                <HStack>
                  <Text fontSize={'md'} fontWeight={'500'}>Company Name:</Text>
                  <EditablePreview />
                  <Input as={EditableInput} w={'150px'} size={'xs'} onChange={(e)=>setCompanyName(e.target.value)}/>
                  <EditableControls />
                </HStack>
              </Editable>

              <Button onClick={deleteJob}> Delete<MdDelete /> </Button>

          </HStack>

          <HStack justifyContent={'space-between'} w={'90%'}>
            <HStack >
              <Text fontSize={'md'} fontWeight={'500'}>Location Type:</Text>
              <Select size={'sm'} width={'140px'} value={locType} onChange={(e)=> setLocType(e.target.value) }>
                <option>On Site</option>
                <option>Remote</option>
              </Select>
            </HStack>

            {
              locType==="On Site"?(         
                <>
                <Editable
                defaultValue={state}
                fontSize='md'
                isPreviewFocusable={false}
                >   
                  <HStack>
                    <Text fontSize={'md'} fontWeight={'500'}>State:</Text>
                    <EditablePreview />
                    <Input as={EditableInput} w={'150px'} size={'xs'} onChange={(e)=>setState(e.target.value)}/>
                    <EditableControls />
                  </HStack>
                </Editable>
                
                <Editable
                defaultValue={city}
                fontSize='md'
                isPreviewFocusable={false}
                >   
                  <HStack>
                    <Text fontSize={'md'} fontWeight={'500'}>City:</Text>
                    <EditablePreview />
                    <Input as={EditableInput} w={'150px'} size={'xs'} onChange={(e)=>setCity(e.target.value)}/>
                    <EditableControls />
                  </HStack>
                </Editable>
                </>


              ):(
                  null
              )
            }

          </HStack>


          <Flex justifyContent={'space-between'}  w={'95%'}>
            <Editable
            defaultValue={MinSalary}
            fontSize='md'
            isPreviewFocusable={false}
            
            >   
              <HStack>
                <Text fontSize={'md'} fontWeight={'500'}>Minimun Salary:</Text>
                <EditablePreview />
                <Input as={EditableInput} type="number" w={'150px'} size={'xs'} onChange={(e)=>setMinSalary(e.target.value)}/>
                <EditableControls />
              </HStack>
            </Editable>
            
            <Editable
            defaultValue={MaxSalary}
            fontSize='md'
            isPreviewFocusable={false}
  
            >   
              <HStack>
                <Text fontSize={'md'} fontWeight={'500'}>Maximum Salary:</Text>
                <EditablePreview />
                <Input as={EditableInput} type="number" w={'150px'} size={'xs'} onChange={(e)=>setMaxSalary(e.target.value)}/>
                <EditableControls />
              </HStack>
            </Editable>

            <Editable
            defaultValue={String(expired)}
            fontSize='md'
            isPreviewFocusable={false}
            alignContent={'flex-end'}
            >   
              <HStack >
                <Text fontSize={'md'} fontWeight={'500'}>Expired:</Text>
                <Select size={'sm'} width={'140px'} value={String(expired)} onChange={(e)=> handleChangeInExpiredInput(e) }>
                <option>true</option>
                <option>false</option>
                </Select>
              </HStack>
            </Editable>

          </Flex>
          
          <Editable defaultValue={description}>
            <HStack justifyContent={'center'}>
              <Text fontSize={'md'} fontWeight={'500'}>Description:</Text>
              <EditablePreview maxH={'md'}/>
              <EditableTextarea maxW={'80%'} h={'120px'} value={description} onChange={(e)=>{ setDescription(e.target.value); setIsUpdated(true) }}/>
            </HStack>
          </Editable>

        </Stack>

          {
            isUpdated?(
                
              <Flex justifyContent={'center'} p={'0.8vh'}>
                <Button colorScheme='teal' size='sm' onClick={()=> updateDetails()}>
                  Update Details
                </Button>
              </Flex>
            ):(
              null
            )
          }

 
    </Box>
  )
}

export default EmployerJobCard
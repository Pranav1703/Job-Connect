import { 
  Box, 
  Flex, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalHeader, 
  ModalOverlay, 
  Text,
  VStack,
  HStack,
  useDisclosure,
  IconButton,

} from "@chakra-ui/react"
import "../../styles/applicationCard.css"
import { useContext } from "react"
import { Context } from "../../App"
import { DeleteIcon } from "@chakra-ui/icons"
import axios from "axios"
import toast from "react-hot-toast"
import { pdfjs,Document, Page } from 'react-pdf';
import 'pdfjs-dist/web/pdf_viewer.css';


type imgModalProp = {
  src: string
}


type ApplicationCardProps = {
  applicationID: string
  name: string
  email: string
  phone: string
  github: string
  coverLetter: string
  resumePath: string
  jobName: string
  applicantName: string
  applicationListSetFunc: React.Dispatch<React.SetStateAction<any[] | undefined>>
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


const ImageModal =({src}:imgModalProp)=>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fileUrl = `${import.meta.env.VITE_SERVER_URL}/${src}`
  console.log("fileUrl:", fileUrl)

  const handlePdfError = (err:Error) => {
    console.error("PDF load/render error:", err.message);
  };

  return (
        <>
      {/* Thumbnail preview - small size, click to open modal */}
      <Box
        width="200px"
        height="auto"
        cursor="pointer"
        onClick={onOpen}
        border="1px solid #ccc"
        borderRadius="md"
        overflow="hidden"
      >
        <Document file={fileUrl}                  
        onLoadError={handlePdfError}
        onSourceError={handlePdfError}
        >
          <Page pageNumber={1} width={200} />
        </Document>
      </Box>

      {/* Modal with full-size PDF preview */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent maxH="90vh" overflow="hidden">
          <ModalHeader>Resume Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <Box maxH="80vh" overflow="auto">
              <Document 
                file={fileUrl}
                  onLoadError={handlePdfError}
                  onSourceError={handlePdfError}
              >
                <Page pageNumber={1} width={800} />
              </Document>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  )
}


const ApplicationCard = ({
  applicationID,
  name,
  email,
  phone,
  github,
  coverLetter,
  resumePath,
  jobName,
  applicantName,
  applicationListSetFunc

}:ApplicationCardProps) => {

  const {user} = useContext(Context)

  const deleteApplication =async()=>{
    try {
      const resp = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/application/delete/${applicationID}`,{withCredentials:true})
      applicationListSetFunc((prevList) => prevList!.filter((application) => application._id !== applicationID));
      console.log(resp.data)
      toast.success("Application deleted Successfully")
    } catch (error) {
      console.log("error when trying to delete",error)
    }
  }

  return (
      
    <Box w={'80vw'} bg={'rgb(248, 253, 255)'} boxShadow={'0px 10px 10px rgba(25,35,35,.3)'} _hover={{boxShadow:'0 15px 11px rgba(35,35,35,.4)'}} minW={'sm'} minH={'40vh'}  transition={'all 0.5s'} m={'1vw'}> 
      <HStack justifyContent={'flex-end'}>
        {
          user.role === "Job Seeker"?(
            <IconButton
              colorScheme='teal'
              aria-label='Search database'
              icon={<DeleteIcon />}
              onClick={deleteApplication}
            />
          ):(
            null
          )
        }
      </HStack>
      <Flex justifyContent={'space-around'}>
        <VStack justifyContent={'space-evenly'} flexWrap={'wrap'} width={'70%'}>
          <Flex pt={'0px'} w={'100%'} direction={'row'} justifyContent={'space-evenly'}>

            <Text>
              <span style={{fontWeight:"bold"}}>Name: </span>
              {name}
            </Text>
            <Text>
              <span style={{fontWeight:"bold"}}>Email: </span>
              {email}
            </Text>
            <Text>
              <span style={{fontWeight:"bold"}}>Phone: </span>
              {phone}
            </Text>
            <Text>
              <span style={{fontWeight:"bold"}}>Github: </span>
              {github}
            </Text>
            <Text>
              <span style={{fontWeight:"bold"}}>Applied for: </span>
              {jobName}
            </Text>

          </Flex>
          <Box mt={'0px'} height={'60%'} maxHeight={'60%'} overflow={'auto'} >
            <Text fontWeight={'bold'} textAlign={'center'}>Cover Letter</Text>
            <Text wordBreak={'break-all'}>{coverLetter}</Text>
          </Box>
    
        </VStack>
  
        <VStack my={'auto'}>
          {
            user.role === "Employer"?(
              <Text textAlign={"center"}>
                <span style={{fontWeight:"bold"}}>Applicant Name: </span>
                {applicantName}
              </Text>
            ):(
              <Text textAlign={"center"} fontWeight={'bold'}>Your Resume</Text>
            )
          }
          <ImageModal src={resumePath}/>
        </VStack>
      </Flex>
    </Box>

  )
}

export default ApplicationCard
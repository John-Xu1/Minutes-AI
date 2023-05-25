import "./Minutes.css";
import generateMinutes from "../API/generateMinutes.js";
import { Center, Flex, Heading, Text, FormControl } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import MinutesButton from "../components/MinutesButton";

function Minutes() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const fileUploadRef = useRef(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }

  function handleClick() {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  }

  async function generate() {
    console.log("generating");
    console.log(selectedFile.name);
    // const fileInput = document.getElementById("fileUpload");
    // const minutes = await generateMinutes(fileInput.files[0]);
    // console.log(minutes);
  }

  return (
    <Center
      h="100vh"
      w="100vw"
      backgroundImage="/Background.png"
      bgSize="cover"
      p={0}
      m={0}
    >
      <Flex display="column" textAlign="center">
        <Heading color="white">Get detailed meeting mintues.</Heading>
        <Heading color="white">In minutes.</Heading>
        <FormControl>
          <Flex
            w="80vw"
            h="40vh"
            border="dashed 3px #000"
            borderColor="white"
            borderRadius={16}
            p={2}
            cursor="pointer"
            _hover={{ borderColor: "gray.400" }}
            onClick={handleClick}
            direction="column"
            align="center"
            justify="center"
            mt={8}
          >
            <input
              id="fileUpload"
              type="file"
              style={{ display: "none" }}
              ref={fileUploadRef}
              onChange={handleFileChange}
            />
            <FaCloudUploadAlt size={64} fill="white" />
            <Text color="white">
              {fileName ? fileName : "No file selected"}
            </Text>
          </Flex>
        </FormControl>
        {fileName === "No file selected" ? null : (
          <MinutesButton
            title="Create minutes"
            width={64}
            bgColor="white"
            color="#2D1212"
            onClick={() => generate()}
          />
        )}
      </Flex>
    </Center>
  );
}

export default Minutes;

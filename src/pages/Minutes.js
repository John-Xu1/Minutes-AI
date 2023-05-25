import "./Minutes.css";
import generateMinutes from "../API/generateMinutes.js";
import {
  Center,
  Flex,
  Heading,
  Text,
  Box,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import MinutesButton from "../components/MinutesButton";

function Minutes() {
  let selectedFile = null;
  const [fileName, setFileName] = useState("No file selected");
  const fileUploadRef = useRef(null);

  function handleFileChange(event) {
    selectedFile = event.target.files[0];
    // console.log(selectedFile.name);
    // console.log((window.URL || window.webkitURL).createObjectURL(selectedFile));
    // document.getElementById("fileName").innerHTML = selectedFile.name;
    setFileName(selectedFile.name);
  }

  function handleClick() {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  }

  async function generate() {
    console.log("generating");
    const fileInput = document.getElementById("fileUpload");
    const minutes = await generateMinutes(fileInput.files[0]);
    console.log(minutes);
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
        {/* <Input
          w="80vw"
          h="40vh"
          border="dashed 3px #000"
          borderColor="white"
          type="file"
          id="fileUpload"
          display="none"
        />

        <Box
          w="80vw"
          h="40vh"
          border="dashed 3px #000"
          borderColor="white"
        ></Box> */}
        {fileName === "No file selected" ? null : (
          <MinutesButton
            title="Create minutes"
            width={64}
            bgColor="white"
            color="#2D1212"
          />
        )}
      </Flex>
    </Center>
    // <div>
    //   <link rel="stylesheet" href="./Minutes.css" />
    //   <input type="file" id="fileUpload" onChange={changeName} />
    //   <h1>Meeting Minutes</h1>
    //   <p id="meetingMinutes"></p>
    //   <button onClick={generate}>Generate Minutes</button>
    //   <p id="minutes"></p>
    // </div>
  );
}

export default Minutes;

import "./Minutes.css";
import generateMinutes from "../API/generateMinutes.js";
import {
  Center,
  Flex,
  Heading,
  Text,
  FormControl,
  Progress,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import MinutesButton from "../components/MinutesButton";
import transcribeAudio from "../API/transcribeAudio";

function Minutes() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [loading, setLoading] = useState(false);
  const [loadingVal, setLoadingVal] = useState(0);
  const [loadingLabel, setLoadingLabel] = useState("Processing file...");
  const [minutes, setMinutes] = useState("");

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
  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
  async function generate() {
    setLoading(true);
    console.log("loading val: " + loadingVal);
    console.log("generating");
    console.log(selectedFile.name);
    const fileInput = document.getElementById("fileUpload");
    await delay(2000);
    setLoadingVal(15);
    setLoadingLabel("Transcribing file...");
    const transcript = await transcribeAudio(fileInput.files[0]);
    setLoadingVal(65);
    setLoadingLabel("Generating meeting minutes...");
    console.log("finished transcribing");
    const minutes = await generateMinutes(transcript);
    setLoadingVal(100);
    setLoadingLabel("Finishing up...");
    await delay(2000);
    setLoadingLabel("Processing file");
    console.log("finished minutes generation");
    console.log(minutes);
    setLoadingVal(0);

    setLoading(false);
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
      {!loading ? (
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
      ) : (
        <Flex display="column" textAlign="center">
          <Progress
            hasStripe
            isAnimated
            w={500}
            size="lg"
            value={loadingVal === 0 ? 0 : loadingVal}
            colorScheme="teal"
          />
          <Heading color="white" mt={8}>
            {loadingLabel}
          </Heading>
        </Flex>
      )}
    </Center>
  );
}
export default Minutes;

import "./Minutes.css";
import axios from "axios";

function Minutes() {
  let selectedFile = null;

  function changeName(event) {
    selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log(selectedFile);
    console.log((window.URL || window.webkitURL).createObjectURL(selectedFile));
    document.getElementById("meetingMinutes").innerHTML = fileName;
  }

  function transcribeAudio() {
    const url = "https://api.openai.com/v1/audio/transcriptions";
    const formData = new FormData();
    formData.append("model", "whisper-1");
    const fileInput = document.getElementById("fileUpload");
    formData.append("file", fileInput.files[0]);
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // const transcription = data[0].text;
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <input type="file" id="fileUpload" onChange={changeName} />
      <h1>Meeting Minutes</h1>
      <p id="meetingMinutes"></p>
      <button onClick={transcribeAudio}>Transcribe</button>
    </div>
  );
}

export default Minutes;

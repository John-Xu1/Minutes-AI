import "./Minutes.css";
import generateMinutes from "../API/generateMinutes.js";

function Minutes() {
  let selectedFile = null;
  function changeName(event) {
    selectedFile = event.target.files[0];
    const fileName = selectedFile.name;
    console.log(selectedFile);
    console.log((window.URL || window.webkitURL).createObjectURL(selectedFile));
    document.getElementById("meetingMinutes").innerHTML = fileName;
  }

  async function generate() {
    console.log("generating");
    const fileInput = document.getElementById("fileUpload");
    const minutes = await generateMinutes(fileInput.files[0]);
    console.log(minutes);
  }

  return (
    <div>
      <link rel="stylesheet" href="./Minutes.css" />
      <input type="file" id="fileUpload" onChange={changeName} />
      <h1>Meeting Minutes</h1>
      <p id="meetingMinutes"></p>
      <button onClick={generate}>Generate Minutes</button>
      <p id="minutes"></p>
    </div>
  );
}

export default Minutes;

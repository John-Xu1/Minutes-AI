async function transcribeAudio(file) {
  console.log("transcription in progress");
  const url = "https://api.openai.com/v1/audio/transcriptions";
  const formData = new FormData();
  formData.append("model", "whisper-1");
  formData.append("file", file);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: formData,
    });
    const data = await response.json();
    const transcript = data.text;
    console.log("transcript: " + transcript);
    return transcript;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default transcribeAudio;

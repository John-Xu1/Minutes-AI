import transcribeAudio from "./transcribeAudio.js";

async function generateMinutes(file) {
  const transcript = await transcribeAudio(file);
  console.log("now generating minutes");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Create meeting minutes with notes and action items based on the following transcript: "${transcript}"`,
        },
      ],
    }),
  });
  const data = await response.json();
  const reply = data.choices[0].message;
  console.log(reply);
  return reply.content;
}

export default generateMinutes;

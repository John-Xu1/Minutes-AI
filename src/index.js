import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Chat from "./pages/Chat.js";
import Minutes from "./pages/Minutes.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({
//   components: {
//     Progress: {
//       baseStyle: {
//         filledTrack: {
//           bg: "#601E1E",
//         },
//       },
//     },
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Minutes />
    </ChakraProvider>
  </React.StrictMode>
);

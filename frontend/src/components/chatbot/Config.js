// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import CustomHeader from "./CustomHeader";

const config = {
  initialMessages: [createChatBotMessage(`Hey there!`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#ec1839",
    },
    chatButton: {
      backgroundColor: "#b9122c",
    },
  },


  header: {
    component: CustomHeader,
  },
};

export default config;

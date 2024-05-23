import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { Button } from "antd";
import styled from "styled-components";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import config from "./chatbot/Config";

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 8px;
  right: 8px;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CloseButton = styled(Button)`
  border: none;
  background-color: transparent;
  font-size: 1rem;
`;

const MyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <ChatbotContainer>
          <Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              height: "40px",
            }}
          >
            <div
              style={{
                color: "var(--headingColor)",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Care Salf Assistant
            </div>
            <CloseButton
              shape="circle"
              icon={<i className="fa fa-times" />}
              onClick={toggleChatbot}
            />
          </Header>
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </ChatbotContainer>
      )}
      <Button
        type="primary"
        shape="circle"
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          padding: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        icon={
          <i
            className="fa fa-headset"
            style={{ color: "white", fontSize: "2rem" }}
          />
        }
        onClick={toggleChatbot}
      />
    </>
  );
};

export default MyChatbot;

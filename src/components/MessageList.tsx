import { useEffect, useRef } from "react";
import { VStack, Box } from "@chakra-ui/react";
import type { IMessage } from "../types";
import Message from "./Message";

interface MessageListProps {
  messages: IMessage[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      flex={1}
      w="full"
      overflowY="auto"
      p={4}
      borderWidth={1}
      borderRadius="md"
    >
      <VStack spacing={4} align="stretch">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </VStack>
    </Box>
  );
};

export default MessageList;

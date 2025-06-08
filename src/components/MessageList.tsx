import { useEffect, useRef, useState } from "react";
import { VStack, Box, IconButton } from "@chakra-ui/react";
import { FiArrowDown } from "react-icons/fi";
import type { IMessage } from "../types";
import Message from "./Message";

interface MessageListProps {
  messages: IMessage[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const threshold = 100;
      const isUserAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        threshold;

      setIsAtBottom(isUserAtBottom);
      setScrollTop(container.scrollTop);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      position="relative"
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

      <IconButton
        icon={<FiArrowDown />}
        aria-label="Floating Button"
        size="sm"
        colorScheme="teal"
        onClick={scrollToBottom}
        style={{
          position: "absolute",
          top: scrollTop + 20,
          left: 4,
          display: isAtBottom ? "none" : "flex",
        }}
      />
    </Box>
  );
};

export default MessageList;

import { Box, HStack, Text } from "@chakra-ui/react";
import type { IMessage } from "../types";

interface MessageProps {
  message: IMessage;
  isOwnMessage: boolean;
}

const Message = ({ message, isOwnMessage }: MessageProps) => {
  return (
    <Box alignSelf={isOwnMessage ? "flex-end" : "flex-start"} maxW="70%">
      <HStack
        spacing={2}
        bg={isOwnMessage ? "blue.500" : "gray.100"}
        color={isOwnMessage ? "white" : "black"}
        p={3}
        borderRadius="lg"
      >
        <Text>{message.content}</Text>
      </HStack>
      <Text fontSize="xs" color="gray.500" mt={1}>
        {new Date(message.timestamp).toLocaleTimeString()}
      </Text>
    </Box>
  );
};

export default Message;

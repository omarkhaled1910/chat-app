import { useState, useRef } from "react";
import { Box, HStack, Input, IconButton, Progress } from "@chakra-ui/react";
import { FiImage, FiSend } from "react-icons/fi";
import { useFileUpload } from "../hooks/useFileUpload";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadProgress, isUploading, handleFileSelect } = useFileUpload();

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box w="full">
      {isUploading && (
        <Progress value={uploadProgress} size="sm" colorScheme="blue" mb={2} />
      )}
      <HStack>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
          accept="image/*,video/*"
        />
        <IconButton
          aria-label="Attach file"
          icon={<FiImage />}
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        />
        <IconButton
          aria-label="Send message"
          icon={<FiSend />}
          onClick={handleSubmit}
          colorScheme="blue"
          isLoading={isLoading}
        />
      </HStack>
    </Box>
  );
};

export default ChatInput;

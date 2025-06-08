import { HStack, IconButton, Text, Avatar } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import type { User } from "../types";

interface ChatHeaderProps {
  user: User;
  onBack: () => void;
}

const ChatHeader = ({ user, onBack }: ChatHeaderProps) => {
  return (
    <HStack spacing={4} w="full" p={2}>
      <IconButton
        aria-label="Back to chats"
        icon={<FiArrowLeft />}
        onClick={onBack}
        variant="ghost"
      />
      <Avatar name={user.name} src={user.avatar} size="sm" />
      <Text fontWeight="bold">{user.name}</Text>
      <Text fontSize="sm" color="gray.500">
        {user.isOnline ? "Online" : "Offline"}
      </Text>
    </HStack>
  );
};

export default ChatHeader;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  Container,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../store";
import { mockService } from "../services/mockService";
import type { User, Chat } from "../types";
import UserList from "../components/UserList";
import { useBroadcast } from "../hooks/useBroadcast";

const ChatList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { broadcastMessage: sendBroadcast } = useBroadcast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, chatsData] = await Promise.all([
          mockService.getUsers(),
          mockService.getChats(user.id),
        ]);
        setUsers(usersData.filter((u) => u.id !== user.id));
        setChats(chatsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const handleUserClick = async (userId: string) => {
    try {
      const existingChat = chats.find((chat) =>
        chat.participants.includes(userId)
      );

      if (existingChat) {
        navigate(`/chat/${userId}`);
      } else {
        const newChat = await mockService.createChat([user.id, userId]);
        setChats([...chats, newChat]);
        navigate(`/chat/${userId}`);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBroadcast = async () => {
    if (broadcastMessage.trim() && selectedUsers.length > 0) {
      await sendBroadcast(broadcastMessage, selectedUsers);
      setBroadcastMessage("");
      onClose();
      setSelectedUsers([]);
    }
  };

  if (isLoading) {
    return (
      <Container
        maxW="container.md"
        margin={"auto"}
        py={5}
        textAlign={"center"}
      >
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4} align="stretch">
        {selectedUsers.length > 0 && (
          <Button colorScheme="blue" onClick={onOpen}>
            Broadcast Message (to {selectedUsers.length})
          </Button>
        )}
        <UserList
          users={users}
          onUserClick={handleUserClick}
          onUserSelect={handleUserSelect}
          selectedUsers={selectedUsers}
        />
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Broadcast Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Input
                placeholder="Enter your message"
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
              />
              <Button
                colorScheme="blue"
                onClick={handleBroadcast}
                isDisabled={!broadcastMessage.trim()}
              >
                Broadcast
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ChatList;

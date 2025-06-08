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
} from "@chakra-ui/react";
import { FiMoon, FiSun, FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../store";
import { mockService } from "../services/mockService";
import type { User, Chat } from "../types";
import UserList from "../components/UserList";

const ChatList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuthStore();

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxW="container.md" py={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Chats</Heading>
        <HStack spacing={2}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />
          <IconButton
            aria-label="Logout"
            icon={<FiLogOut />}
            onClick={handleLogout}
            variant="ghost"
          />
        </HStack>
      </Flex>

      <UserList users={users} onUserClick={handleUserClick} />
    </Container>
  );
};

export default ChatList;

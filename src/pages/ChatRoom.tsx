import { useParams, useNavigate } from "react-router-dom";
import { VStack, Container } from "@chakra-ui/react";
import useStore, { useAuthStore } from "../store";
import { useChat } from "../hooks/useChat";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";

const ChatRoom = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const {
    auth: { user },
    chat: {},
  } = useStore();

  const { messages, chatUser, isLoading, sendMessage } = useChat(
    userId || "",
    user
  );
  console.log(messages, userId, chatUser, user);
  if (!user.id || !chatUser) {
    return null;
  }

  return (
    <Container maxW="container.md" h="100vh" py={5}>
      <VStack h="full" spacing={4}>
        <ChatHeader user={chatUser} onBack={() => navigate("/")} />
        <MessageList messages={messages} currentUserId={user.id} />
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </VStack>
    </Container>
  );
};

export default ChatRoom;

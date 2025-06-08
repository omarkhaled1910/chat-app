import { useState, useEffect, useCallback } from "react";
import { mockService } from "../services/mockService";
import type { IMessage, User } from "../types";

interface UseChatReturn {
  messages: IMessage[];
  chatUser: User | null;
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
}

export const useChat = (
  userId: string,
  currentUser: User | null
): UseChatReturn => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatUser, setChatUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messagesData, usersData] = await Promise.all([
          mockService.getMessages(userId),
          mockService.getUsers(),
        ]);

        setMessages(messagesData);
        const foundUser = usersData.find((u) => u.id === userId);
        if (foundUser) {
          setChatUser(foundUser);
        }
        console.log({ messagesData, usersData, foundUser });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !currentUser) return;

      try {
        const messageData = {
          senderId: currentUser.id,
          receiverId: userId,
          content,
          type: "text",
        } as IMessage;

        const sentMessage = await mockService.sendMessage(messageData);
        setMessages((prev) => [...prev, sentMessage]);

        // Simulate bot response if chatting with bot
        if (userId === "bot") {
          setTimeout(async () => {
            const botResponse = await mockService.getBotResponse(content);
            const botMessage = await mockService.sendMessage({
              senderId: "bot",
              receiverId: currentUser.id,
              content: botResponse,
              isRead: false,
            } as IMessage);
            setMessages((prev) => [...prev, botMessage]);
          }, 1000);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        throw error;
      }
    },
    [userId, currentUser]
  );

  return {
    messages,
    chatUser,
    isLoading,
    sendMessage,
  };
};

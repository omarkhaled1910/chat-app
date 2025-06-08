import { v4 as uuidv4 } from "uuid";
import type { User, IMessage, Chat } from "../types";
// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    email: "test@chat.com",
    name: "Test User",
    avatar: "https://i.pravatar.cc/150?u=test@chat.com",
    isOnline: true,
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?u=john@example.com",
    isOnline: true,
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://i.pravatar.cc/150?u=jane@example.com",
    isOnline: false,
  },
  {
    id: "bot",
    name: "ChatBot",
    email: "bot@chat.com",
    avatar: "https://i.pravatar.cc/150?u=bot@chat.com",
    isOnline: true,
  },
];

const mockMessages: IMessage[] = [];
const mockChats: Chat[] = [];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockService = {
  // Auth
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);
    const user = mockUsers.find((u) => u.email === email);
    console.log(user);
    if (!user || password !== "123456") {
      throw new Error("Invalid credentials");
    }
    return user;
  },

  // Users
  getUsers: async (): Promise<User[]> => {
    await delay(500);
    return mockUsers;
  },

  // Chats
  getChats: async (userId: string): Promise<Chat[]> => {
    await delay(500);
    return mockChats.filter((chat) => chat.participants.includes(userId));
  },

  createChat: async (participants: string[]): Promise<Chat> => {
    await delay(500);
    const newChat: Chat = {
      id: uuidv4(),
      participants,
      unreadCount: 0,
    };
    mockChats.push(newChat);
    return newChat;
  },

  // Messages
  getMessages: async (chatId: string): Promise<IMessage[]> => {
    await delay(500);
    return mockMessages.filter((msg) => msg.id === chatId);
  },

  sendMessage: async (
    message: Omit<IMessage, "id" | "timestamp">
  ): Promise<IMessage> => {
    await delay(500);
    const newMessage: IMessage = {
      ...message,
      id: uuidv4(),
      timestamp: Date.now(),
      isRead: false,
    };
    mockMessages.push(newMessage);
    return newMessage;
  },

  // Chatbot
  getBotResponse: async (message: string): Promise<string> => {
    await delay(2000);
    const responses = [
      "I'm here to help!",
      "That's interesting, tell me more.",
      "I understand what you're saying.",
      "Let me think about that...",
      "Thanks for sharing that with me.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  },
};

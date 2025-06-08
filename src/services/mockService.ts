import { v4 as uuidv4 } from "uuid";
import type { User, IMessage, Chat } from "../types";
import { getFromStorage, setToStorage } from "../utils";

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

// Local storage keys
const STORAGE_KEYS = {
  CHATS: "chat_chats",
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockService = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);
    const user = mockUsers.find((u) => u.email === email);
    if (!user || password !== "123456") {
      throw new Error("Invalid credentials");
    }
    return user;
  },

  getUsers: async (): Promise<User[]> => {
    await delay(500);
    return mockUsers;
  },

  getChats: async (userId: string): Promise<Chat[]> => {
    await delay(500);
    let chats = getFromStorage<Chat[]>(STORAGE_KEYS.CHATS, []);

    // If no chats exist, initialize with empty array
    if (!chats.length) {
      setToStorage(STORAGE_KEYS.CHATS, []);
      chats = [];
    }

    return chats.filter((chat) => chat.participants.includes(userId));
  },

  createChat: async (participants: string[]): Promise<Chat> => {
    await delay(500);
    const chats = getFromStorage<Chat[]>(STORAGE_KEYS.CHATS, []);

    const newChat: Chat = {
      id: uuidv4(),
      participants,
      unreadCount: 0,
      messages: [],
    };

    chats.push(newChat);
    setToStorage(STORAGE_KEYS.CHATS, chats);
    return newChat;
  },

  getMessages: async (userId: string): Promise<IMessage[]> => {
    await delay(500);
    const chats = getFromStorage<Chat[]>(STORAGE_KEYS.CHATS, []);
    const chat = chats.find((chat) => chat.participants.includes(userId));
    if (!chat) {
      return [];
    }
    return chat.messages || [];
  },

  sendMessage: async (
    message: Omit<IMessage, "id" | "timestamp">
  ): Promise<IMessage> => {
    await delay(500);
    const chats = getFromStorage<Chat[]>(STORAGE_KEYS.CHATS, []);
    let chat;
    chat = chats.filter(
      (chat) =>
        chat.participants[0] === message.senderId &&
        chat.participants[1] === message.receiverId
    )[0];

    if (!chat) {
      // throw new Error("Chat not found");
      const newChat = await mockService.createChat([
        message.senderId,
        message.receiverId,
      ]);
      chat = newChat;
    }

    const newMessage: IMessage = {
      ...message,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      type: "text",
      isRead: false,
    };

    if (!chat.messages) {
      chat.messages = [];
    }

    chat.messages.push(newMessage);
    setToStorage(STORAGE_KEYS.CHATS, chats);
    return newMessage;
  },

  broadcastMessage: async (
    message: Omit<IMessage, "id" | "timestamp">,
    recipients: string[]
  ): Promise<IMessage[]> => {
    await delay(500);
    const chats = getFromStorage<Chat[]>(STORAGE_KEYS.CHATS, []);
    const broadcastMessages: IMessage[] = [];

    recipients.forEach((recipientId) => {
      const chatIndex = chats.findIndex((chat) =>
        chat.participants.includes(recipientId)
      );

      if (chatIndex === -1) return;

      const broadcastMessage: IMessage = {
        ...message,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        type: "broadcast",
        recipients,
        receiverId: recipientId,
        isRead: false,
      };

      if (!chats[chatIndex].messages) {
        chats[chatIndex].messages = [];
      }

      chats[chatIndex].messages.push(broadcastMessage);
      broadcastMessages.push(broadcastMessage);
    });

    setToStorage(STORAGE_KEYS.CHATS, chats);
    return broadcastMessages;
  },

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

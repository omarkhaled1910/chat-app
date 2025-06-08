import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AuthState,
  ChatState,
  RootState,
  User,
  IMessage,
  Chat,
} from "../types";

const useStore = create<RootState>()(
  persist(
    (set) => ({
      auth: {
        user: {
          id: "",
          name: "",
          email: "",
          avatar: "",
          isOnline: false,
        },
        isAuthenticated: false,
        isLoading: false,
      } as AuthState,
      chat: {
        chats: [],
        currentChat: null,
        messages: [],
        isLoading: false,
        error: null,
      } as ChatState,
    }),
    {
      name: "chat-storage",
    }
  )
);

export const useAuthStore = () => {
  const { auth } = useStore();
  console.log(auth);
  return {
    ...auth,
    login: (user: User) =>
      useStore.setState((state: RootState) => ({
        auth: { ...state.auth, user, isAuthenticated: true },
      })),
    logout: () =>
      useStore.setState((state: RootState) => ({
        auth: {
          ...state.auth,
          user: {
            id: "",
            name: "",
            email: "",
            avatar: "",
            isOnline: false,
          },
          isAuthenticated: false,
        },
      })),
  };
};

export const useChatStore = () => {
  const { chat } = useStore();
  return {
    ...chat,
    setCurrentChat: (chat: Chat) =>
      useStore.setState((state: RootState) => ({
        chat: { ...state.chat, currentChat: chat },
      })),
    addMessage: (message: IMessage) =>
      useStore.setState((state: RootState) => ({
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, message],
        },
      })),
    setMessages: (messages: IMessage[]) =>
      useStore.setState((state: RootState) => ({
        chat: { ...state.chat, messages },
      })),
    updateChats: (chats: Chat[]) =>
      useStore.setState((state: RootState) => ({
        chat: { ...state.chat, chats },
      })),
  };
};

export default useStore;

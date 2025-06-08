export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface IMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: IMessage;
  unreadCount: number;
}

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: IMessage[];
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  chat: ChatState;
}

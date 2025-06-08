export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface IMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  type: "text" | "broadcast";
  recipients?: string[];
  isRead?: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  unreadCount: number;
  messages: IMessage[];
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

import { mockService } from "../services/mockService";
import useStore from "../store";
import type { IMessage } from "../types";

export const useBroadcast = () => {
  const {
    auth: { user },
  } = useStore();
  const broadcastMessage = async (message: string, userIds: string[]) => {
    try {
      userIds.forEach((userId) => {
        const broadcastMessage: Omit<IMessage, "id" | "timestamp"> = {
          content: message,
          senderId: user.id,
          type: "broadcast",
          receiverId: userId,
        };
        mockService.sendMessage(broadcastMessage);
      });

      return true;
    } catch (error) {
      console.error("Error broadcasting message:", error);
      return false;
    }
  };

  return { broadcastMessage };
};

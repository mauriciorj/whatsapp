import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import SocketClient from "@/lib/socket";
import { useUserProfile } from "./useUserProfile";

export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);
  const { data: user } = useUserProfile();

  useEffect(() => {
    if (user?.company_id) {
      // Get or create socket instance
      const socketInstance = SocketClient.getInstance(user.company_id);

      // Set up event listeners
      socketInstance.on("connect", () => {
        console.log("socket connected");
      });

      socketInstance.on("disconnect", () => {
        console.log("socket disconnected");
      });

      setSocket(socketInstance);

      // Cleanup function
      return () => {
        // Don't disconnect the socket on component unmount
        // Just remove the listeners
        socketInstance.off("connect");
        socketInstance.off("disconnect");
      };
    }
  }, [user?.company_id]);

  return { socket, companyId: user?.company_id };
};

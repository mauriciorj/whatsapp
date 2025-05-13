import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import SocketClient from "@/lib/socket";
import getUserProfile from "@/features/user/lib/getUserProfile";

export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);
  const { userProfile } = getUserProfile();

  useEffect(() => {
    if (userProfile?.company_id) {
      // Get or create socket instance
      const socketInstance = SocketClient.getInstance(userProfile.company_id);

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
  }, [userProfile?.company_id]);

  return { socket, companyId: userProfile?.company_id };
};

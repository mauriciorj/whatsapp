import { io, Socket } from "socket.io-client";

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

class SocketClient {
  private static instance: Socket | null = null;
  private static companyId: string | null = null;

  public static getInstance(companyId: string): Socket {
    if (!this.instance || this.companyId !== companyId) {
      this.instance = io(URL, {
        query: { companyId },
      });
      this.companyId = companyId;
    }
    return this.instance;
  }

  public static getExistingInstance(): Socket | null {
    return this.instance;
  }

  public static disconnect(): void {
    if (this.instance) {
      this.instance.disconnect();
      this.instance = null;
      this.companyId = null;
    }
  }
}

export default SocketClient;
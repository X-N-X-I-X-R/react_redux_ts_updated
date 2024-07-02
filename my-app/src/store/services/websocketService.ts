// src/services/webSocketService.ts
class WebSocketService {
  private socket: WebSocket | null = null;

  connect(roomName: string, onMessage: (message: string) => void, onUpdateUsers: (users: string[]) => void) {
    const socketUrl = `ws://127.0.0.1:8099/ws/private_chat/${roomName}/`;
    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        onMessage(data.message);
      } else if (data.type === 'user_list') {
        onUpdateUsers(data.users);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const messageData = JSON.stringify({ message });
      this.socket.send(messageData);
    } else {
      console.error("WebSocket is not connected");
    }
  }
}

export default WebSocketService;

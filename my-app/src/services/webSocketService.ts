// src/services/webSocketService.ts

const createWebSocket = (roomName: string) => {
  const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/chat/' + roomName + '/'
  );

  return chatSocket;
};

export default createWebSocket;

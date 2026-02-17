export const registerCaptain = (socket) => {
  socket.on("captain-online", (captainId) => {
    socket.join(captainId);
  });
};

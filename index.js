import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/sockets/index.js";

const server = http.createServer(app); // ✅ Single server

initSocket(server); // ✅ Attach socket

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

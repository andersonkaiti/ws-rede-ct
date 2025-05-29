import http, { type Server } from "node:http";
import { app } from "../src/app.ts";

const server: Server = http.createServer(app);

const PORT = 4_000;

server.listen(PORT, () => {
  console.log(`🚀 Aplicação rodando na porta ${PORT}.`);
});

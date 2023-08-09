import server from "./server.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});

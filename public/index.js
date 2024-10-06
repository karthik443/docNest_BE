import express from 'express';
import cors from 'cors';


import authController  from './controllers/authController.js';
import doctorController from './controllers/doctorController.js'
import config from './config.json' assert { type: 'json' };
import connectDB from './essentilas/dbConfig.js';
import authMiddleware from './middleware/middleware.js';
import logger from './essentilas/logger.js'
import  initializeWebSocket from './services/chatService.js'
import WebSocket, { WebSocketServer } from 'ws';
console.log(WebSocket)
import http from 'http'

const app = express()
const server = http.createServer(app);

const PORT = config.PORT;


// const corsOptions = {
//     origin: config['front-endURL'],  // Change this to your frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     optionsSuccessStatus: 204
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
initializeWebSocket(server);

connectDB()
// app.use((req, res, next) => {
//   const logEntry = `${req.method} ${req.url} `;
//   logger.info(logEntry); 
//   next();  
// });
app.use('/user/',authController)
app.use(authMiddleware)
app.use('/doctor/',doctorController)
app.get('/',(req,res)=>{
    res.send('APP Started ')
})
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
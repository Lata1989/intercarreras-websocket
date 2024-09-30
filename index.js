// index.js
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/dbConfig.js';
import websocketServer from './websocketServer.js';

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB().then(() => {
    console.log('Conectado a MongoDB');

    // Iniciar el servidor WebSocket
    const wss = websocketServer();
    
    // Iniciar el servidor Express aquí (opcional, ya que no estás usando Express en este caso)
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Servidor Express corriendo en el puerto ${PORT}`);
    });
});

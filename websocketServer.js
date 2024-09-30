// websocketServer.js
import WebSocket from 'ws';
import mqttClient from './mqttClient.js';
import { connectDB } from './config/dbConfig.js';

let db; // Variable para almacenar la conexión a la base de datos

// Función para conectar a la base de datos
const connectDatabase = async () => {
    const client = await connectDB(); // Conectar a MongoDB
    db = client; // Guardar la conexión en la variable db
};

// Llamar a la función de conexión a la base de datos
connectDatabase().then(() => {
    console.log('Conectado a MongoDB desde WebSocket');

    const wss = new WebSocket.Server({ port: 8080 }); // Iniciar el servidor WebSocket

    // Al recibir una nueva conexión WebSocket
    wss.on('connection', (ws) => {
        console.log('Cliente WebSocket conectado');

        mqttClient.on('message', async (topic, message) => {
            const data = JSON.parse(message.toString());
            console.log(`Mensaje recibido: ${JSON.stringify(data)}`);

            // Guardar en la base de datos
            try {
                const collection = db.collection('datostamagotchi'); // Cambiar el nombre de la colección si es necesario
                await collection.insertOne(data); // Guardar el mensaje en la colección
                console.log('Datos guardados en MongoDB:', data);
            } catch (error) {
                console.error('Error al guardar en MongoDB:', error);
            }

            // Enviar los datos al cliente WebSocket
            ws.send(JSON.stringify(data));
        });

        ws.on('close', () => {
            console.log('Cliente WebSocket desconectado');
        });
    });

    console.log('Servidor WebSocket corriendo en el puerto 8080');
});

export default connectDatabase;

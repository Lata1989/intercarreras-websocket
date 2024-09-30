// mqttClient.js
import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const mqttClient = mqtt.connect(`mqtt://${process.env.MQTT_BROKER}`);

mqttClient.on('connect', () => {
    console.log('Conectado a MQTT');
    mqttClient.subscribe(process.env.MQTT_TOPIC, (err) => {
        if (!err) {
            console.log(`Suscrito al topic: ${process.env.MQTT_TOPIC}`);
        } else {
            console.error('Error al suscribirse:', err);
        }
    });
});

mqttClient.on('error', (error) => {
    console.error('Error de conexión a MQTT:', error);
});

export default mqttClient;
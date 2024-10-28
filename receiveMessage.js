const axios = require('axios');
require('dotenv').config();

// Función para obtener el token de acceso
const getToken = async () => {
    const response = await axios.post(process.env.tokenEndpoint, null, {
        auth: {
            username: process.env.clientId,
            password: process.env.clientSecret,
        },
        params: {
            grant_type: 'client_credentials',
            response_type: "token"
        }
    });
    return response.data.access_token;
};

// Función para leer mensajes de la cola
const receiveMessages = async () => {
    try {
        const token = await getToken();
        const response = await axios.post(process.env.eventMeshUrl + "/messagingrest/v1/queues/" + process.env.queueName + "/messages/consumption", {},{
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json',
                'x-qos': 1 
            }
        });
        console.log('Mensajes recibidos:', response.data);
    } catch (error) {
        console.error('Error al leer los mensajes:', error);
    }
};

// Ejemplo de uso
receiveMessages();


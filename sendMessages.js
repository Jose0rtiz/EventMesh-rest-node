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



//Función para publicar mensajes en la cola
const sendMessage = async (message) => {
    try {
        const token = await getToken();
        const response = await axios.post(process.env.eventMeshUrl +"/messagingrest/v1/topics/"+ process.env.topicName +"/messages", {
            message: message
        }, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json',
                'x-qos': 1
            }
        });
        console.log('Mensaje enviado:', response.data);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
};

// Ejemplo de uso
sendMessage("Hola, Event Mesh!");


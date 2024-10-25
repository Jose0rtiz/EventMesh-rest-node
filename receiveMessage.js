const axios = require('axios');
require('dotenv').config();

// Configura tus credenciales y la URL de la Event Mesh
//const eventMeshUrl = "https://enterprise-messaging-pubsub.cfapps.eu30.hana.ondemand.com";
//const queueName = "NOVIS%2FTest%2FEventMeshTest%2FFirstQueue";
//const tokenEndpoint = "https://integration-suite-ym32i65h.authentication.eu30.hana.ondemand.com/oauth/token";
//const clientId = "sb-default-02b4293a-df2e-492a-b233-3d1b7268faf5-clone!b4871|xbem-service-broker-!b34";
//const clientSecret = "97fa7921-f258-4042-b2c1-0abecaedefd3$JaYnKBnbE5sIL0Br4R_9F527CwANjukJAneODi6WJjU=";

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


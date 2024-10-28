## EventMesh-rest-node

Este proyecto contiene dos scripts en JavaScript que interactúan con un servicio de mensajería utilizando Axios para realizar peticiones HTTP. Uno de los scripts se encarga de recibir mensajes de una cola, mientras que el otro se utiliza para publicar mensajes en un tema específico. Ambos scripts requieren autenticación mediante un token de acceso, el cual se obtiene de un servidor de autenticación utilizando las credenciales de cliente proporcionadas.

## Requisitos Previos
Antes de ejecutar los scripts, asegúrate de tener instalados los siguientes requisitos:

- Asegúrate de tener instalado Node.js en tu sistema.
- Este proyecto utiliza la biblioteca Axios para realizar peticiones HTTP.
- Debes configurar un archivo `.env` en la raíz del proyecto con las siguientes variables:
```java
eventMeshUrl = ... // URL del servidor EventMesh
queueName = ... // Nombre de la cola
topicName = ... // Nombre del tópico
tokenEndpoint = ... // Endpoint para obtener el token
clientId = ... // ID del cliente
clientSecret = ... // Secreto del cliente
```

## Ejecución
### sendMessage.js
Este script se encarga de recibir mensajes de una cola. Utiliza la función getToken para obtener un token de acceso y luego realiza una petición POST al endpoint de consumo de mensajes. Los mensajes recibidos se imprimen en la consola.

### receiveMessage.js
Este script permite publicar un mensaje en un tema específico. Similar al anterior, utiliza getToken para obtener el token de acceso. Luego, envía un mensaje a través de una petición POST al endpoint correspondiente. La respuesta del servidor se imprime en la consola.

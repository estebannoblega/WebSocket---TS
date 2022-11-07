# WEBSOCKETS
WebSocket es una tecnología que proporciona un canal de comunicación bidireccional y full-duplex sobre un único socket TCP. Está diseñada para ser implementada en navegadores y servidores web, pero puede utilizarse por cualquier aplicación cliente/servidor. 
Debido a que las conexiones TCP comunes sobre puertos diferentes al 80 son habitualmente bloqueadas por los administradores de redes, el uso de esta tecnología proporcionaría una solución a este tipo de limitaciones proveyendo una funcionalidad similar a la apertura de varias conexiones en distintos puertos, pero multiplexando diferentes servicios WebSocket sobre un único puerto TCP (a costa de una pequeña sobrecarga del protocolo).
Para establecer una conexión WebSocket, el cliente envía una petición de negociación WebSocket, y el servidor envía una respuesta de negociación WebSocket.

# Creación de una aplicación WEBSOCKET
Como utilizar:
* `git clone https://github.com/estebannoblega/WebSocket---TS.git`
* Abrir una terminal en la carpeta.
* Ejecutar: `npm i`
* Inicializar el servidor: `ts-code server.ts NroPuerto`, en caso de no tener instalado ts-code, utilizar `tsc` y luego `node build/server.js`.
* Inicializar el cliente: `ts-code client.ts DireccionServer NroPuerto Usuario`, en caso de no tener instalado ts-code, utilizar `tsc` y luego `node build/client.js`.

# Referencias
* https://www.npmjs.com/package/ws
* https://www.youtube.com/watch?v=h5B0iOz8vVg
* https://www.youtube.com/watch?v=Y_gzsO4U7Dw



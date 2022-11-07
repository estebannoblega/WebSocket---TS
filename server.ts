// Inicializacion del WebSocket Server

import WebSocket, { WebSocketServer } from "ws";

const colors = require('colors/safe');
const END:string = 'END';
const usuarios = new Map();

/**
 * Cuando ocurre un error lo muestra por pantalla y finaliza la ejecución.
 * @param error
 */
const error = (error:string)=>{
    console.error(error);
    process.exit(1);
}


function escuchar(puerto:number){

    console.log(colors.bgMagenta(`Servirdor escuchando en el puerto ${puerto}...`));

    const servidor = new WebSocketServer({clientTracking:true,port:puerto});

    servidor.on('connection',(ws: WebSocket,req)=>{
        //Manejo de la nueva conexion
        ws.on('message', (mensaje: string) => {
            if (!usuarios.has(ws)) {
                // usuarios.forEach(cliente => {
                //     if(cliente.user.toString()===mensaje.toString()){
                //         ws.send("Nombre de usuario en uso, intente con otro...");
                //         ws.close();
                //     }
                // });
                const usuario = {
                    'user': mensaje,
                    'ip': req.socket.remoteAddress,
                    'puerto':req.socket.remotePort
                }
                console.log("Usuario "+colors.bgGreen(`${mensaje}`)+" se ha conectado al SERVIDOR ");
                usuarios.set(ws, usuario);
            } else if (mensaje == END) {
                console.log(colors.red(`Desconectando cliente: ${usuarios.get(ws)['user']}`));
                ws.close();
            } else {
                //muestra el mensaje recibido
                const {user,ip,puerto} = usuarios.get(ws);
                console.log(colors.bgWhite(`[${ip.split(':')[3]}::${puerto}::${user}]`)+"-> "+`${mensaje}`);

                 //Luego lo envía al resto de los clientes
                 servidor.clients.forEach((cliente) => {
                     if (cliente !== ws && cliente.readyState === WebSocket.OPEN) {
                         const enviar = `${usuarios.get(ws)['user']}-> ${mensaje}`;
                         cliente.send(enviar);
                     }
                 });
             }
            });

        //Manejo de Errores
        ws.on('error',(err)=>error(err.message));

        //Finalización de la conexion
        ws.on('close',()=>{
            
            const { user, ip, puerto } = usuarios.get(ws);
            console.log(colors.bgYellow(`Conexión con [${ip.split(':')[3]}::${puerto}::${user}] cerrada`));
            usuarios.delete(ws);
            if (servidor.clients.size <= 0) {
                console.log(colors.italic('No hay clientes conectados'));
            }

        });
    });
    servidor.on("error",(err)=>error(err.message));

}
// Define el comportamiento del WebSocket


const main = ()=>{
    if (process.argv.length !== 3) {//si pasa esto es porque no pusiste el puerto ni la direccion
        error(`Como usar: ts-node ${__filename} 'host'`);
    }
    let [, , port] = process.argv;
    escuchar(Number(port));
}
main();




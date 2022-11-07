//Inicializacion del websocket cliente
import { argv } from "process";
import WebSocket  from "ws";

const colors = require('colors/safe');
const [,,port,urlServidor,usuario] = argv;
const END:string= 'END';
const stdin = process.openStdin();

const error = (error:string)=>{
    console.error(error);
    process.exit(1);
}

const conectar = (urlServidor:string,port:number,usuario:string)=>{
    console.log(colors.green(`Conectandose al servidor: ${urlServidor}:${port}`));
    const ws = new WebSocket(`ws://${urlServidor}:${port}`);
    ws.on('open', () => {
        ws.send(usuario);
        console.log(colors.bgGreen(`${usuario} Conectado...`));
        stdin.addListener("data",(data)=>{
            const mensaje = data.toString().trim();
            ws.send(mensaje);
            if (mensaje === END) {
                ws.close();
                console.log('Desconectando...');
            }
            
        });       
    });

    ws.on('message', (data) => {
        console.log(colors.bgCyan(data.toString().trim()));
    });

    ws.on('close',()=>{
        console.log(colors.bgRed('El servidor a finalizado...\n'));
        process.exit(0);
    });

    ws.on('error', (err) => error(err.message));
}

const main = ()=>{
    if (process.argv.length !== 5) {//si pasa esto es porque no pusiste el puerto ni la direccion
        error(`Como usar: node ${__filename} host puerto usuario`);
    }
    let [, , urlServidor, port, usuario] = process.argv;
    if (isNaN(Number(port))) {
        error(`Puerto invalido ${port}`);
    }
    conectar(urlServidor,Number(port),usuario);
}

main();
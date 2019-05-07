import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

const socketUri = process.env.NODE_ENV === 'production'? 'http://passdemoapi.2cxibppjr5.us-east-1.elasticbeanstalk.com/'  :'http://localhost:8888';

let socket = io(socketUri);

const socketmiddleware = createSocketIoMiddleware(socket, "SOCKET_MESSAGE_OUT");

export default socketmiddleware;

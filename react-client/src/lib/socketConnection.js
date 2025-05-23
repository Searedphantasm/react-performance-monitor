import io from 'socket.io-client'

const options = {
    auth: {
        token: "reeeact-client",
    }
}

const socket = io.connect('http://localhost:3000',options);
socket.on('welcome', (data) => {
    console.log(data);
});

export default socket;
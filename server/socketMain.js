// main socket file

const socketMain = (io) => {

    io.on("connection", (socket) => {
        const auth = socket.handshake.auth;
        if (auth.token === "abcd") {

            socket.join('nodeClient');
        } else if (auth.token === "reeeact-client") {
            socket.join('reactClient');
        } else {
            socket.disconnect();
        }
        console.log("Tick...");
        socket.on('perfData', (data) => {
            console.log(data);
            io.to('reactClient').emit('perfData', data);
        });


    });
}

module.exports = socketMain;
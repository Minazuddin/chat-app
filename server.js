const http = require('http')

const { removeElement } = require('custom-array-methods-useful')

const server = http.createServer();

const io = require('socket.io')(server, {
    origin: '*'
});

let connections = [];

io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        connections = removeElement(connections, socket)
        console.log('disconnected')
    })

    connections.push(socket)

    console.log(`${connections.length} user connected`, socket.id)

    socket.on('subscribe', (roomName) => {
        socket.join(roomName) //subscribe the socket to the room
        console.log(`connection ${socket.id} subscribed channel ${roomName}`)
    })

    socket.on('unsubscribe', (roomName) => {
        socket.leave(roomName)
        console.log(`connection ${socket.id} unsubscribed channel ${roomName}`)
    })

    socket.on('chat', ({ roomId, msg }) => {
        //emit chat event to the specified rooms
        io.to(roomId).emit('chat', msg)
    })

    socket.on('increment', ({ roomId, counter }) => {
        io.to(roomId).emit('increment', counter)
    })

    socket.on('decrement', ({ roomId, counter }) => {
        io.to(roomId).emit('decrement', counter)
    })

})

server.listen(8000, () => console.log('Server listening on port 8000'))


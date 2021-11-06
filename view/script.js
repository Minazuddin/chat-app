// I have found a solution. for some reason the default transportation method is not always allowed by all servers.

// So i specified a neutral transportation method at the client side, like this:
    
const socket = io('ws://localhost:8000', { transports : ['websocket'] })

socket.on('connect', () => {
    console.log('socket connection established')
})

socket.on('chat', (msg) => {
    appendMessage(msg)
})

const subscribe = (e) => {
    e.preventDefault();
    const roomId = document.getElementById('subscribe').value
    socket.emit('subscribe', roomId)
}

const unsubscribe = (e) => {
    e.preventDefault();
    const roomId = document.getElementById('subscribe').value
    socket.emit('unsubscribe', roomId)
}

const send = (e) => {
    e.preventDefault()
    const msg = document.querySelector('#typearea').value;
    const roomId = document.getElementById('subscribe').value
    socket.emit('chat', { msg, roomId })
    document.querySelector('#typearea').value = '';
}

const appendMessage = (msg) => {
    console.log('msg', msg)
    const paragraph = document.createElement('p')
    paragraph.innerText = msg;
    const msg_container = document.getElementById('message-container')
    msg_container.append(paragraph)
}
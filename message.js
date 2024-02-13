const {formatPhoneNumber} = require('./utils')
    require('dotenv').config()

const id = process.env.WA_ALAN

const down = (client) => {
    const message = 'Server Down'
    client.sendMessage(formatPhoneNumber(id), message);
}

const up = (client) => {
    const message = 'Server is Online'
    client.sendMessage(formatPhoneNumber(id), message);
}

module.exports = { down, up }
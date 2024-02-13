const mqtt = require('mqtt');
const { up, down } = require('./message')
require('dotenv').config()

const getData = (client) => {
    // Konfigurasi broker MQTT
    const brokerUrl = `wss://${process.env.URL}`
    const options = {
        username: process.env.USER,
        password: process.env.PASSWORD
    };
    const topic = process.env.TOPIC

    // Buat koneksi MQTT dengan opsi
    const clientmqtt = mqtt.connect(brokerUrl, options);

    // Tangani ketika koneksi terbuka
    clientmqtt.on('connect', function () {
        console.log('Terhubung ke broker MQTT');
        up(client)

        // Lakukan subscribe ke topik MQTT
        clientmqtt.subscribe(topic, function (err) {
            if (err) {
                console.error('Gagal melakukan subscribe:', err);
            } else {
                console.log('Berlangganan ke topik:', topic);
            }
        });
    });

    // Tangani pesan yang diterima dari topik yang di-subscribe
    clientmqtt.on('message', function (topic, message) {
        console.log('Pesan diterima pada topik:', topic, ' - Pesan:', message.toString());
    });

    // Tangani jika koneksi terputus
    clientmqtt.on('close', function () {
        console.log('Koneksi ke broker MQTT terputus');
        down(client)
    });

    // Tangani kesalahan
    clientmqtt.on('error', function (error) {
        console.error('Terjadi kesalahan:', error);
    });
}

module.exports = { getData }

const router = require('express').Router()
var q = 'cahaya';
const mongo = require('mongoose')
const db = mongo.connection
KonekRmq();

function KonekRmq(){
    require('amqplib/callback_api')
    .connect({ protocol: 'amqp', hostname: 'rmq1.pptik.id', port: '5672', username: 'shadoofpertanian', password: 'TaniBertani19', vhost: '/shadoofpertanian' }, function(err, conn) {
        try{
            if(err){
                console.log("Tidak Ada Koneksi Internet")
                Reconnect();
            }else{
                console.log("Terhubung Ke Rmq")
                consumer(conn);
        }
        }catch(e){
            console.log("Koneksi Rmq Error")
        }
    });
}

function consumer(conn) {
    try{
    var ok = conn.createChannel(on_open);
    function on_open(err, ch) {
        ch.consume(q, function(msg) {
        if (msg == null) {
        console.log("Message Tidak Ada")
        }else{
            console.log(msg.content.toString());
            ch.ack(msg);
            var json=msg.content.toString();
            const obj = JSON.parse(json);
            var MAC=(obj.MAC);
            var ADC=(obj.ADC);
            var KET=(obj.KET);
            const date = require('date-and-time')
            const now  =  new Date();
            const Time = date.format(now,'YYYY/MM/DD HH:mm:ss');
            
            // Display the result
            console.log("current date and time : " + Time)
            console.log(Time)
            var Siram
            if (ADC >= 30) {
                Siram = "Proses Pengembunan Aktif"
            } else {
                Siram = "Proses Pengembunan Tidak Aktif"
            }
            const History= { MAC:MAC, ADC:ADC, KET:KET, Time, Siram}
                try {
                Save(History)
                }
                catch (e) {
                console.log("Error")
                }
            }
        });
    }
}catch(e){
    console.log('Error')
    }
}

function Save(history){
    Koneksi()
try {
    db.collection("sensors").insertOne(history, function(err) {
    if (err) {
            console.log("Gagal")
            } else {
            console.log("Berhasil Menyimpan data Sensor")
    }
});
}catch (e) {
    console.log("Error")
    }
}

function Koneksi(){
mongo.connect('mongodb://127.0.0.1:27017/gh', {
useNewUrlParser: true,
useUnifiedTopology: true})
try{
db.once('open', () => console.log('Berhasil Terhubung ke database'))
}catch (e) {
db.on('error', error => console.error(error))
console.log(error)
}

}

function Reconnect(){
    console.log("Menghubungkan Ulang Ke Rmq")
    KonekRmq(setInterval,1000);
}
module.exports = { router, Koneksi }
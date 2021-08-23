var fs = require('fs'); 
var parse = require('csv-parser');
const kafka = require ('kafka-node');
const moment=require('moment')



try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient({kafkaHost:"localhost:9092"});
    const producer = new Producer(client);
    const kafka_topic = 'test.topic';
    let payloads = [
    {
    topic: kafka_topic,
    messages:"",
    partition:0
    }]
    ;



    producer.on('ready', async function () {
        var i=0;
        var first=moment()
        fs.createReadStream('airtravel.csv')
        .pipe(parse({quote: '"', ltrim: true, rtrim: true,delimiter: ','}))
        .on('data', function(csvrow) {
           
            payloads[0].messages=JSON.stringify(csvrow)
            payloads[0].partition=i%10
            i++;
            console.log(payloads)
           
            //do something with csvrow
            producer.send(payloads, function (err, data) {
                console.log(data);
                console.log("message sent")
            });        
        })
        .on('end',function() {
            let end=moment()
            console.log("total time"+end.diff(first))
        });

   
    })
    
    producer.on("error",(err)=>{
        console.log(err)
    })
    
}
catch(e) {
    console.log(e);
}    

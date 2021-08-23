const kafka = require('kafka-node');
var db = require('./db');


try {
  console.log("Service start")

  var options = {
    KafkaHost: "localhost:9092",
    groupId: 'kafka-node-group',
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    sessionTimeout: 15000,
    fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
    // An array of partition assignment protocols ordered by preference. 'roundrobin' or 'range' string for
    // built ins (see below to pass in custom assignment protocol)
    protocol: ['roundrobin'],
    // Offsets to use for new groups other options could be 'earliest' or 'none'
    // (none will emit an error if no offsets were saved) equivalent to Java client's auto.offset.reset
    fromOffset: 'earliest',
    // how to recover from OutOfRangeOffset error (where save offset is past server retention)
    // accepts same value as fromOffset
    outOfRangeOffset: 'earliest'

  }

  let consumer = new kafka.ConsumerGroup(options, ["test.topic"]);

  consumer.on('message', async function (message) {
    const data = JSON.parse(message.value)
    await db.uploadToDB(data)
    console.log(data)
  });
  consumer.on('error', function (err) {
    console.log('error', err);
  });

}
catch (e) { }





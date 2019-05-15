#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// 'amqp://localhost'  --> localhost
var url = process.env.CLOUDAMQP_URL || "amqp://xtnkzpjg:PO_AGtxCluGJ0WZ9fnDOd67JEXnhc92o@baboon.rmq.cloudamqp.com/xtnkzpjg";


amqp.connect(url, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'task-queue';
        var msg = '**************** Hello Dyno world! **********************';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});

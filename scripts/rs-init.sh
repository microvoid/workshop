#!/bin/bash

DELAY=25

mongo <<EOF
var config = {
    "_id": "mongodb-rs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo-rs:27017",
            "priority": 2
        },
        {
            "_id": 2,
            "host": "mongo-rs-1:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
EOF

echo "****** Waiting for ${DELAY} seconds for replicaset configuration to be applied ******"

sleep $DELAY

mongo < /scripts/init.js

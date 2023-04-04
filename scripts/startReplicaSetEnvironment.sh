#!/bin/bash

DELAY=10

docker compose --file docker-compose-replicaset.yml down
docker compose --file docker-compose-replicaset.yml up -d

echo "****** Waiting for ${DELAY} seconds for containers to go up ******"
sleep $DELAY

docker exec mongo-rs sh /scripts/rs-init.sh

#!/bin/bash

CONTAINER_NAME=vuejs-doce-web

# check presence of base container, and if
# exist, removing it to recreate it after
container_exist=`docker inspect -f '{{.Id}}' ${CONTAINER_NAME}`
if [ ! -z $container_exist ];
    then
        echo "${CONTAINER_NAME} exist, removing"
        docker stop ${CONTAINER_NAME}
        docker rm ${CONTAINER_NAME}
fi

docker run -d -p 8080:8080 --name ${CONTAINER_NAME} -e "NODE_ENV=development" \
    -v $(cd ../ && pwd):/app \
    hypriot/rpi-node /app/scripts/dev_entrypoint.sh

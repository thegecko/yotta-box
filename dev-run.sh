#!/bin/bash
set -e

NAME=yotta-box
WORKSPACE=${@:-$HOME}
WORKSPACE="${WORKSPACE/#\~/$HOME}"

if hash docker-machine 2>/dev/null; then
    (docker-machine start default || exit 0)
    eval $(docker-machine env default)
    DOCKER_IP=`docker-machine ip default`
fi

(docker rm -f $NAME 2>/dev/null || exit 0)

PARAMS="$PARAMS -it"
PARAMS="$PARAMS --name $NAME"
PARAMS="$PARAMS -p 80:8000"
PARAMS="$PARAMS -u root"
PARAMS="$PARAMS -e CODEBOX_DEBUG=true"
PARAMS="$PARAMS -v $WORKSPACE:/workspace"

for D in packages/*/; do
rm $D/pkg-build.js | exit 0;
PARAMS="$PARAMS -v $PWD/$D:/yotta-box/$D";
done
echo $PARAMS

#open http://$DOCKER_IP
exec docker run $PARAMS thegecko/$NAME

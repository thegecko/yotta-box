#!/bin/bash
set -e

if hash docker-machine 2>/dev/null; then
    (docker-machine start default || exit 0)
fi

docker build "$@" -t thegecko/yotta-box .
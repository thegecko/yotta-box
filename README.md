## yotta-box

Docker container for presenting yotta tooling and development studio

### Prerequisites

[Docker](https://www.docker.com/)

## Running

Build the docker image:

```bash
> ./docker-build.sh
```

Run the image:

```bash
> ./docker-run.sh
```

and navigate to http://192.168.99.100

### Development

To develop a plugin for the IDE, a folder is mounted into the container when run from the ```packages``` folder.

The development helper script will do the right things to overlay the development folders while running:

```bash
> ./dev-run.sh
```
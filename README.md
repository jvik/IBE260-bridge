# IBE260-bridge ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/jvik/ibe260-bridge/docker_build_server.yml)

## About the project

Project for IBE260 at Molde University College. A fairly simple full stack application to emulate a simplified version of contract bridge with a node.js API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. You can download Node.js [here](https://nodejs.org/en/download/) and npm is included in the installation.

### Installing

1. Clone the repository: `git clone https://github.com/jvik/IBE260-bridge.git`
2. Navigate to the project directory: `cd IBE260-Bridge`
3. Navigate to the backend: `cd server`
4. Install the dependencies: `npm install`
5. Start the server: `npm run dev`

The application will be running at `http://localhost:3000`.

If you want to prepopulate the players, you can copy the .env.example to you own .env file. populate=true will create
4 players.

The server is also available in [dockerhub](https://hub.docker.com/repository/docker/jvik/ibe260-bridge-server/)

### Manual testing

With the vscode extension "REST Client"

You can use the api.rest file to manually test the endpoints.

VS Marketplace Link: <https://marketplace.visualstudio.com/items?itemName=humao.rest-client>

## Built With

* [Node.js](https://nodejs.org/) - The runtime environment used
* [TypeScript](https://www.typescriptlang.org/) - The language used

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

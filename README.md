# Doggos

Live version can be found here: https://doggos.hireokkimus.xyz/. Hosted on a VM in UpCloud.

Frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a small project to demonstrate my skills in Node, Typescript and React.
- [frontend](./src/frontend)
- [backend](./src/backend)

### Spec

- [x] frontend application with a button to fetch dog breeds from [Dog API](https://dog.ceo/dog-api/)
- [x] own route for specific dog breed and random image of that breed
- [x] possibility of liking/disliking a breed (backend to save the data)
- [x] relational database
- [ ] make the code clean and awesome

## Running locally

You can run this is devcontainer with Docker, VS Code and [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

Alternatively, you can run the project on host machine but that requires Node 18 and PostgreSQL.

### Devcontainer

Devcontainer makes your life easy. It has correct version of Node, PostgreSQL and other needed tools such as Docker (in Docker). It also mounts your `~/.ssh` directory, so you can deploy the project with a ghetto bash script to VMs with Docker running (requires manual server configuration for things like `nginx`, SSL, etc).

- Open project in VS Code
- Open command palette and run `Reopen in container`
- Creates the devcontainer with Node and PostgreSQL, and installs Node modules and .env automatically
- to run frontend, execute:
    - `cd /workspace/src/frontend`
    - `npm run start`
    - frontend is running on [port 3000](http://localhost:3000)
- to run backend, execute:
    - `cd /workspace/src/backend`
    - `npm run migrate:dev` to run db migrations
    - `npm run dev`
    - backend is running on [port 3001](http://localhost:3001)

## Deployment

Requires a server with Docker, running PostgreSQL container in `doggos`-network and SSH config to exist (automatically mounted into devcontainer). Also `env.list` file is setup alongside with nginx-configs + Let's Encrypt for SSL.

Backend runs in a Docker container with Nginx reverse proxy.
Frontend is statically built and served with Nginx.
PostgreSQL is running as a Docker container also, but setup made manually.

Run:
- `bash /workspace/deployment/deploy.sh -t all` to deploy backend and frontend
- `bash /workspace/deployment/deploy.sh -t backend` to deploy backend
- `bash /workspace/deployment/deploy.sh -t frontend` to deploy frontend

Not the optimal solution for deployment, but it works great. To make it better I would:
- use Github Actions for deployment
- use a container registry (i.e. Docker Hub) to push the images
- (in AWS) use service like RDS for DB and ECS to just spin up the backend image (though no experience in setting these up)
- use S3 for the frontend files + load balancer to get SSL (I have served websites from S3, but without load balancer and SSL)

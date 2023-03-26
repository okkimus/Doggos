#!/bin/bash

while getopts t: flag; do
  case "${flag}" in
  t) target=${OPTARG} ;;
  esac
done

valid_targets="all backend frontend"
is_valid=$(echo $valid_targets | grep -w -o "$target")

if [[ -z $is_valid ]]; then
  echo "Invalid target given ($target)"
  echo "Valid targets are: $valid_targets"
  exit
fi

configname=$(cat /workspace/deployment/.ssh_config_name 2>/dev/null)
frontendlocation=$(cat /workspace/deployment/.frontend_location 2>/dev/null)

if [[ -z $configname ]]; then
  echo "Please give the name of SSH config:"
  read configname
  echo $configname >.ssh_config_name
  echo "Saved ssh name config to /workspace/deployment/.ssh_config_name"
fi

if [ -z $frontendlocation ]; then
  echo "Please give the name of frontend location:"
  read frontendlocation
  echo $frontendlocation >.frontend_location
  echo "Saved frontend location config to /workspace/deployment/.frontend_location"
fi

echo "Starting timer"
start=$(date +%s)


if [[ $target == "all" || $target == "backend" ]]; then
  cd /workspace/src/backend
  echo "Building .backend"
  npm run build
  docker build . -t doggos-api

  echo "Transfering image to remote"
  docker save doggos-api | bzip2 | pv | ssh $configname docker load
fi

if [[ $target == "all" || $target == "frontend" ]]; then
  cd /workspace/src/frontend
  echo "Building frontend"
  npm run build
fi

if [[ $target == "all" || $target == "backend" ]]; then
  echo "Stopping old container"
  ssh $configname docker stop doggos-api

  echo "Removing old container"
  ssh $configname docker container rm doggos-api

  echo "Starting new docker container"
  ssh $configname docker run -d -p 5123:8080 --restart=unless-stopped --name doggos-api --network=doggos --env-file doggos/env.list doggos-api:latest

  echo "Clearing dangling images"
  ssh $configname docker rmi -f $(docker images -f "dangling=true" -q)
fi

if [[ $target == "all" || $target == "frontend" ]]; then
  cd /workspace/src/frontend
  echo "Syncing frontend files"
  rsync -a build/* $configname:/var/www/$frontendlocation/html/
fi

echo "Deployment done"
end=$(date +%s)
runtime=$((end - start))

echo "Deployment took $runtime s"

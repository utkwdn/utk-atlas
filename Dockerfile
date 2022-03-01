# download docker
# make sure docker is running

# Choose a base image to start the project from. 
# Alpine is a small base file. go to hub.docker.com to see full registry
FROM node:alpine

# create a new directory to copy all files into
COPY . /app

# define the new directory as the directory that we are already in
# all following commands assume you are in this location
WORKDIR /app

#d efine the actions that should occcur
# possibly use the ADD command

# execute the app (think we would use RUN)
CMD node app.js 


# after creating Dockerfile (this file) go to terminal window to project (ex. hello-docker)
# go to the project folder and run the following command to assign a tag to identify the project: 
# docker build -t hello-docker . 

# this will create a docker instance of the proejct on your local machine
# to see all docker instances on your machine in terminal:
# docker images 
# or 
# docker image ls

# docker run hello-docker (can be used from any folder in terminal)
# can then upload this to docker hub (similar to github) others can then run this file

# pull commands:
# docker pull dockerHubRepoName/hello-docker

# run from docker hub
# docker run dockerHubRepoName/hello-docker
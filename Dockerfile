# download docker
# make sure docker is running

# Choose a base image to start the project from. 
#Alpine is a small base file. go to hub.docker.com to see full registry
FROM node:alpine

#create a new directory to copy all files into
COPY . /app

# define the new directory as the directory that we are already in
# all following commands assume you are in this location
WORKDIR /app

#define the actions that should occcur
# possibly use the ADD command


# execute the app (the exmample used: CMD node app.js 
RUN npm run dev 


# after creating this file go to terminal window to project (ex. hello-docker)
# go to the project folder and run the following command to assign a tag to identify the project: 
# docker build -t hello-docker (replace hello-docker with project folder name)
# this will create a docker instance of this file
# to see all docker instances on your machine in terminal:
# docker images or docker image ls
# can then upload this to docker hub (similar to github) others can then run this file

# docker run hello-docker (can be used from any folder in terminal)

# pull commands:
# docker pull dockerHubRepoName/hello-docker

# run from docker hub
# docker run dockerHubRepoName/hello-docker
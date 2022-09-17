# TODO App

## Description
This is a basic Todo App written in Ionic(React) and NestJS with MariaDB database.

## Prerequisite
 - Docker Desktop V4 with docker compose
 - [Docker Hub](https://hub.docker.com/login) account to pull the image from docker hub repository

## Installation
```bash
$ docker compose up # use docker login first if required
```
or
```bash
$ docker compose up -d # To detach the container and remove after stopped
```

The app should be running on ``http://localhost:3000``

## Running the app
- To create new todo list, move the cursor/pointer to bottom "Add a Task" input
- Enter the task name then push enter or click the "+" sign button
- To edit the list, move the cursor/pointer to the list item, after edited move cursor/pointer to anywhere else to trigger the save action
- To mark the list as completed, tick the checkbox before the name/title, the completed tasks/lists will be moved to the bottom with "completed" badge
- To delete the list, click the trash icon button on the right side.

![](https://github.com/fazrialfan/todo-app/blob/main/todo-tutorial.gif)

## Resources
 - Repository - https://github.com/fazrialfan/todo-app
 - Docker Image - https://hub.docker.com/repository/docker/fazri/todoapp

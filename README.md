# Glint

> Where programmers meet ideas

- Use [glint](http://glintapp.azurewebsites.net)
- View the glint project website [here](http://adventurous-starfish.github.io/glint/)
- View our annotated source code [here](http://adventurous-starfish.github.io/glint/docs/glint.html)

## Greenfield Team

  - __Product Owner__: David Rabkin
  - __Scrum Master__: Anneke Floor
  - __Project Manager__: Kalev Roomann-Kurrik
  - __Development Team Members__: Michael Hari

## Legacy Team

  - __Full Stack Engineers__: Jason Chang, Steve Webster, Scott Kao, Danny Delott

## Table of Contents

1. [Team](#team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

> Glint is an app that you can use to find and share ideas. Submit your idea, and an optional description, and see it appear in the list of ideas. Search through the list of ideas submitted by all users to find new projects to work on. You can also upvote and downvote ideas using the voting buttons. Whether you're looking for a great idea, or have a great idea to share, glint is the app for you!

## Requirements

- Node 0.12.0
- Express 4.0.0
- MongoDB 1.4.34
- Mongoose 3.8.24

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

## Running it locally for development purposes
Running a local server and a local mongoDB instance are your first steps to start developing Glint on your own machine.

First, do `brew install mongodb`to install mongoDB.

Then, run `sudo mkdir -p /data/db` to create the default directory where your local mongo instance will live.

After doing this, you will run `sudo mongod` to spin up a local mongoDB instance.

Now running `grunt upload` from the tasks below will run the server locally with access to the local mongoDB instance. Wooh!

## Tasks

From within the root directory:

```sh
grunt (task)
```

> grunt tasks:
- grunt deploy - runs test, build, and upload. Is run with a --prod flag for production deployment by Azure
- grunt test - runs unit tests on the frontend and backend
- grunt build - concats and minifies source code files
- grunt upload - runs the server either locally or in production based on flags used on the grunt deploy task
- grunt annotate - creates annotated source code with docco in docs/ folder, for both client and server .js files.

### Roadmap

View the project roadmap [here](https://waffle.io/adventurous-starfish/glint)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

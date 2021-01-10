# Dockerfiles

> Monorepo managing personnal Dockerfiles

Lint, build, test, push any number of dockerfile using a monorepo

## Info
- Only work with node v14+ for now
- There is two images: `gitlab agent` and `personnal sandbox`

## Setup

- Clone the repository
- Install code dependencies
```sh
npm install
```
- Install docker dependencies
```sh
npx task docker:setup
```
- logout/login so you can use docker without sudo

## Usage
- See the tasksfile for a list of possible tasks
- You might want to do an alias 
```sh
alias task="npx task"
```
- See all tasks with
```sh
npx task --help
```

- Image name are mapped to file system. For example, next command will lint Dockerfile stored at romainprignon/ubuntu/focal/min/Dockerfile 
```sh
task docker:lint romainprignon/ubuntu/focal/min
```

- You can write unit test per Dockerfile in a `test` folder next to the Dockerfile. Run it with:
```sh
task docker:test romainprignon/ubuntu/focal/min
```

## Todo
- add login command
- Properly remove orphan docker image after failed test
- Might not need the Builder/Runner wrapper

## License

The code is available under the [MIT license](LICENSE).

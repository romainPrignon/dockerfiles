src=tasksfile.js scripts/ tasks/ utils/ romainprignon/

.PHONY: lint check default
default: help

define help
	Build various docker images

	Usage:
	unshell COMMAND [SCRIPT_PATH] [ARGS...]

	Commands:
	src/lint	lint sources
	src/check	typecheck sources
	...
endef

help:
	echo ${help}

install:
	npm ci

src/lint:
	npx eslint ${if ${fix}, --fix,} ${src}

src/lint/watch:
	npx nodemon -e yml,js -w scripts/ -w tasks/ -w utils/ -w romainprignon/ -x 'make src/lint'

src/check:
	npx tsc

src/check/watch:
	npx tsc --watch

# make -j watch
watch: src/check/watch src/lint/watch

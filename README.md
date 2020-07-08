dev-to-sync
===========

Sync your DEV account with a local folder

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dev-to-sync.svg)](https://npmjs.org/package/dev-to-sync)
[![CircleCI](https://circleci.com/gh/beeman/dev-to-sync/tree/master.svg?style=shield)](https://circleci.com/gh/beeman/dev-to-sync/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/dev-to-sync.svg)](https://npmjs.org/package/dev-to-sync)
[![License](https://img.shields.io/npm/l/dev-to-sync.svg)](https://github.com/beeman/dev-to-sync/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dev-to-sync
$ dev-to-sync COMMAND
running command...
$ dev-to-sync (-v|--version|version)
dev-to-sync/0.0.0 darwin-x64 node-v12.18.1
$ dev-to-sync --help [COMMAND]
USAGE
  $ dev-to-sync COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dev-to-sync hello [FILE]`](#dev-to-sync-hello-file)
* [`dev-to-sync help [COMMAND]`](#dev-to-sync-help-command)
* [`dev-to-sync list`](#dev-to-sync-list)
* [`dev-to-sync pull [FILE]`](#dev-to-sync-pull-file)

## `dev-to-sync hello [FILE]`

describe the command here

```
USAGE
  $ dev-to-sync hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ dev-to-sync hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/beeman/dev-to-sync/blob/v0.0.0/src/commands/hello.ts)_

## `dev-to-sync help [COMMAND]`

display help for dev-to-sync

```
USAGE
  $ dev-to-sync help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `dev-to-sync list`

List articles in a DEV account

```
USAGE
  $ dev-to-sync list
```

_See code: [src/commands/list.ts](https://github.com/beeman/dev-to-sync/blob/v0.0.0/src/commands/list.ts)_

## `dev-to-sync pull [FILE]`

describe the command here

```
USAGE
  $ dev-to-sync pull [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/pull.ts](https://github.com/beeman/dev-to-sync/blob/v0.0.0/src/commands/pull.ts)_
<!-- commandsstop -->

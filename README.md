# dev-to-sync

Two-way sync of your DEV account with a local folder.

This tool is inspired by (and uses code) from [dev-to-git](https://github.com/maxime1992/dev-to-git), which implements one-way local -> DEV sync.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dev-to-sync.svg)](https://npmjs.org/package/dev-to-sync)
[![CircleCI](https://circleci.com/gh/beeman/dev-to-sync/tree/master.svg?style=shield)](https://circleci.com/gh/beeman/dev-to-sync/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/dev-to-sync.svg)](https://npmjs.org/package/dev-to-sync)
[![License](https://img.shields.io/npm/l/dev-to-sync.svg)](https://github.com/beeman/dev-to-sync/blob/master/package.json)

<!-- toc -->
* [dev-to-sync](#dev-to-sync)
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
dev-to-sync/0.4.2 darwin-x64 node-v12.18.1
$ dev-to-sync --help [COMMAND]
USAGE
  $ dev-to-sync COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`dev-to-sync create TITLE`](#dev-to-sync-create-title)
* [`dev-to-sync hello [FILE]`](#dev-to-sync-hello-file)
* [`dev-to-sync help [COMMAND]`](#dev-to-sync-help-command)
* [`dev-to-sync list`](#dev-to-sync-list)
* [`dev-to-sync pull [INDEX]`](#dev-to-sync-pull-index)
* [`dev-to-sync push [INDEX]`](#dev-to-sync-push-index)

## `dev-to-sync create TITLE`

Create an article on DEV

```
USAGE
  $ dev-to-sync create TITLE
```

_See code: [src/commands/create.ts](https://github.com/beeman/dev-to-sync/blob/v0.4.2/src/commands/create.ts)_

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

_See code: [src/commands/hello.ts](https://github.com/beeman/dev-to-sync/blob/v0.4.2/src/commands/hello.ts)_

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

_See code: [src/commands/list.ts](https://github.com/beeman/dev-to-sync/blob/v0.4.2/src/commands/list.ts)_

## `dev-to-sync pull [INDEX]`

Pull articles from the DEV api and save them in a local path.

```
USAGE
  $ dev-to-sync pull [INDEX]

OPTIONS
  --dir=dir  [default: posts] Name of the directory the articles will be stored in
```

_See code: [src/commands/pull.ts](https://github.com/beeman/dev-to-sync/blob/v0.4.2/src/commands/pull.ts)_

## `dev-to-sync push [INDEX]`

Read articles from a local path and push to DEV.

```
USAGE
  $ dev-to-sync push [INDEX]

OPTIONS
  -t, --timeout=timeout  [default: 500] Timeout in milliseconds between calls to DEV api
```

_See code: [src/commands/push.ts](https://github.com/beeman/dev-to-sync/blob/v0.4.2/src/commands/push.ts)_
<!-- commandsstop -->

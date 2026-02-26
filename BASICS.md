# Term-O Basics

> Version 0.9.0  
> Updated: 2026-02-26

---

# Table of Contents

- [Overview](#overview)
- [Commands](#commands)
- [Options](#options)
- [Types](#types)
- [Commands](#commands)
  - [dom](#dom)
  - [tab](#tab)
- [Dependency Rules](#dependency-rules)
- [Examples](#examples)

---

# Overview

This documentation provides context about the basics of the Term-O Browser Extension.

**Term-O is a Browser Extension terminal-style developer tool for interacting with browser APIs.**

The goal of Term-O is to give to the user, the power of the browser APIs that we have only available while we create a browser extension and more.

To do that, all we need is a user input in the Terminal that will be converted into commands/instructions.

Each command:

- Has a unique name.
- Accepts typed options.
- Exists to build an answer with the given options.
- Supports short flags (`command -a` -> `-a` does not require explicit value).
- Supports short flags series (`command -abc` = `command -a -b -c`).
- May define dependencies between options.
- Can enforce strict option combinations.

---

# Commands

A command is just an instruction to be completed with an input from the user and the defined arguments, also called "Options". Once user input is provided, it is interpretated and converted into options, which if they fail it throws an error.

if arguments are valid, then a handler starts running in the background building an answer that we call "Logs". A command can have temporal logs while we wait for it to be completed but, at the end, it always returns a consistent anwser.

```bash
command [options]
```

# Options

Options are data supplied to the command handler and are defined within the user input.

It is important to understand that options are hard typed in Term-O. That means that if an option expects for a explicit value (i.e. "string"), the input must have quotes.

A command with existing options will always require options described within the input otherwise you will get an error at execution.

# Types

In Term-O, almost everything is a validated value. We have defined all the possible types that can be used as an option value and also command answer:

## String

String types are defined as chain a characters. In simple words, it is just text. It must be declared within quotes otherwise it will fail.

Double Quotes Accepted:

```bash
command --title "testing"
```

Single Quotes Accepted:

```bash
command --title 'testing'
```

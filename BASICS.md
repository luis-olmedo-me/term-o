# Term-O Basics

> Version 0.9.0  
> Updated: 2026-02-25

---

# Table of Contents

- [Overview](#overview)
- [Global Options](#global-options)
- [Command Structure](#command-structure)
- [Options Structure](#options-structure)
- [Commands](#commands)
  - [dom](#dom)
  - [tab](#tab)
- [Option Types](#option-types)
- [Dependency Rules](#dependency-rules)
- [Examples](#examples)

---

# Overview

This tool provides a declarative command system for interacting with browser contexts.

Each command:

- Has a unique name.
- Accepts typed options.
- Supports short flags ("command -a" -> "-a" does not require explicit value).
- Supports short flags series ("command -abc" = "command -a -b -c").
- May define dependencies between options.
- Can enforce strict option combinations.

---

# Command Structure

A command is just an instruction to be completed with an input from the user and the defined arguments, also called "Options". Once user input is provided, it is interpretated and converted into options, which if they fail it throws an error.

if arguments are valid, then a handler starts running in the background building an answer tha we call "Logs". A command can have temporal logs while we wait for it to be completed but, at the end, it always returns a consistent anwser.

-

```bash
command [args]
```

# Options Structure

Options are data that supply the command handler and are defined within the user input.

It is important to understand that options are hard typed in Term-O. This means that if an option expects for a explicit value (i.e. "string"), the input must have quotes.

A command with existing options will always require options defined in the input otherwise you will get an error at execution.

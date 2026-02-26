# Term-O Basics

> Version 0.9.0  
> Updated: 2026-02-26

---

# Table of Contents

- [Overview](#overview)
- [Commands](#commands)
- [Options](#options)
- [Types](#types)
  - [String](#string)
  - [Boolean (Flag)](#boolean-flag)
  - [Array](#array)
  - [Number](#number)

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

---

# Options

Options are data supplied to the command handler and are defined within the user input.

It is important to understand that options are hard typed in Term-O. That means that if an option expects for a explicit value (i.e. "string"), the input must have quotes.

A command with existing options will always require options described within the input otherwise you will get an error at execution.

---

# Types

In Term-O, almost everything is a validated value. We have defined all the possible types that can be used as an option value and also command answer.

This is an expamle of all the possibilities that can be expected as input and answers:

```bash
command --a-test --b-test "value" --c-test ["value" "value"] --d-test 30
"answer-1" false ["answer-1" "answer-1"] 45
"answer-2" true ["answer-2" "answer-2"] 90
```

The above command execution example is internally interpretated as:

```json
{
  "commands": [
    {
      "name": "command",
      "input": "command --option",
      "state": "finished",
      "options": {
        "a-test": true,
        "b-test": "value",
        "c-test": ["value", "value"],
        "d-test": 30
      },
      "answer": [
        ["answer-1", false, ["answer-1", "answer-1"]],
        ["answer-2", true, ["answer-2", "answer-2"]]
      ]
    }
  ]
}
```

Options have a shortcut that can be used. Most of the times, they start with the first letter to be easy to remember but there commands with so many options that shortcuts must take another letter.

> That's why all commands have an option by default called "--help" where all command options are displayed with a short description and their shortcut.

The above example can be replicated using them this way:

```bash
command -ab "value" -c ["value" "value"]
"answer-1" false ["answer-1" "answer-1"]
"answer-2" true ["answer-2" "answer-2"]
```

## String

String types are defined as chain a characters. In simple words, it is just text. It must be declared within quotes otherwise it will fail.

Double Quotes Accepted (user input):

```bash
command --title "testing"
"test-answer-1"
"test-answer-2"
"test-answer-3"
```

Single Quotes Accepted (user input):

```bash
command --title 'testing'
'test-answer-1'
'test-answer-2'
'test-answer-3'
```

## Boolean (flag)

Boolean types are defined as a binary value. In simple words, it is a `true` or `false` value. Its value is not needed to be explicit when it comes to options. So, in those cases, we just need to mention it in the user input.

```bash
command --enable
'test-answer-1' false
'test-answer-2' true
'test-answer-3' false
```

## Array

Array types are defined as a chain of values. This means they can contain many values inside and are described almost the same as arrays are in javascript/JSON but without commas.

```bash
command --titles ["title-1" "title-2"]
'test-answer-1' false ["answer-1" "answer-1"]
'test-answer-2' true ["answer-2" "answer-2"]
'test-answer-3' false ["answer-3" "answer-3"]
```

> Currently, arrays can only contain String values but this is schedule to be updated in future Term-O versions.

## Number

Number types are defined as they are. In simple words, it is just a number.

```bash
command --count 50
'test-answer-1' false ["answer-1" "answer-1"] 12
'test-answer-2' true ["answer-2" "answer-2"] 12
'test-answer-3' false ["answer-3" "answer-3"] 12
```

---

# Parameters

A parameter is a piece of the answer that a command can share with another command. To do that, both commands must be next to each other.

Comunication between commands can happen just in a unidirectional way and can be described in a few ways.

## Single

Take a look a the following example:

```bash
command-a --count 50 && command-b --title $0
```

1. The execution of `command-a --count 50` leave us with an answer of:
   ```bash
   command --count 50
   'test-answer-1' false ["answer-1" "answer-1"] 12
   'test-answer-2' true ["answer-2" "answer-2"] 12
   ```
2. The execution of `command-b --title $0` starts, but the `title` option is described using a `$0` keyword.
3. The value `$0` is replaced with the first parameter in the answers from the previous command, this is represented with `'test-answer-1'`. The previous command answers are two lines so `command-b --title $0` will be executed two times with each of the values.

In brief, the above example is equal to the following command chain:

```bash
command-a --count 50 && command-b --title 'test-answer-1' && command-b  --title 'test-answer-2'
```

## Many

Take a look a the following example:

```bash
command-a --count 50 && command-b --titles $0,1
```

1. The execution of `command-a --count 50` leave us with an answer of:
   ```bash
   command --count 50
   'test-answer-1' "test-title" ["answer-1" "answer-1"] 12
   'test-answer-2' "test-title" ["answer-2" "answer-2"] 12
   ```
2. The execution of `command-b --titles $0,1` starts, but the `title` option is described using a `$0,1` keyword.
3. The value `$0,1` is replaced with an array of the first and second parameters in the answers from the previous command, this is represented with `['test-answer-1' "test-title"]`. The previous command answers are two lines so `command-b --titles $0,1` will be executed two times with each of the values.

In brief, the above example is equal to the following command chain:

```bash
command-a --count 50 && command-b --titles ['test-answer-1' "test-title"] && command-b  --titles ['test-answer-2' "test-title"]
```

## All

Take a look a the following example:

```bash
command-a --count 50 && command-b --titles $.
```

1. The execution of `command-a --count 50` leave us with an answer of:
   ```bash
   command --count 50
   'test-answer-1' "test-title" "another-title"
   'test-answer-2' "test-title" "another-title"
   ```
2. The execution of `command-b --titles $.` starts, but the `title` option is described using a `$.` keyword.
3. The value `$.` is replaced with an array all the parameters avaialble in the answers from the previous command, this is represented with `['test-answer-1' "test-title" "another-title"]`. The previous command answers are two lines so `command-b --titles $.` will be executed two times with each of the values.

In brief, the above example is equal to the following command chain:

```bash
command-a --count 50 && command-b --titles ['test-answer-1' "test-title" "another-title"] && command-b  --titles ['test-answer-1' "test-title" "another-title"]
```

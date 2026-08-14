# Term-O Basics

> Version 0.9.4  
> Updated: 2026-06-13

---

# Table of Contents

- [Overview](#overview)
  - [Quick Start](#quick-start)
- [Commands](#commands)
- [Options](#options)
- [Types](#types)
  - [String](#string)
  - [Boolean (Flag)](#boolean-flag)
  - [Array](#array)
  - [Number](#number)
- [Parameters](#parameters)
  - [Pick Single](#pick-single)
  - [Pick Many](#pick-many)
  - [Pick All](#pick-all)
  - [Pick All As A String](#pick-all-as-a-string)
- [Themes](#themes)
  - [Paint Lines](#paint-lines)
- [Configuration](#configuration)
  - [Prompt Context](#prompt-context)

---

# Overview

This documentation provides context about the basics of the Term-O Browser Extension.

**Term-O is a Browser Extension terminal-style developer tool for interacting with browser APIs.**

The goal of Term-O is to give users access to browser APIs that are usually available only to extensions.

Users type input in the terminal, which is parsed into commands and options.

Each command:

- Has a unique name.
- Accepts typed options.
- Produces output (logs/answers) based on the provided options.
- Supports short flags (e.g., `command -a` — `-a` does not require an explicit value).
- Supports short flag series (e.g., `command -abc` is equivalent to `command -a -b -c`).
- May define dependencies between options and enforce valid combinations.

After reading this document, check [Term-O Commands](COMMANDS.md) for the full reference.

## Quick Start

Use Term-O from the terminal inside the extension UI. Here are a few common workflows to get started quickly.

- Show a command's options and shortcuts:

```bash
tabs --help
```

- Get XPath(s) for `button` elements in the current page DOM:

```bash
dom --search --tag "button" --see-xpath
```

- Get the current URL host for a specific tab:

```bash
url --get --host --tab-id "T00000000"
```

- Chain commands and reuse output (use `$0` to pick the first parameter from previous output):

```bash
history --list --max-results 5 && tabs --open --url $0
```

- Set a storage key and then copy it to the clipboard (re-using the stored key):

```bash
storage --set --local --data ["apiKey" "ABC123"] && storage --copy --input $0
```

- Read a JSON value from a page context and match a field:

```bash
inspect --read --path "user.profile" && inspect --match --input $0 --query "/name/"
```

---

# Commands

A command is an instruction executed with user input and optional arguments (options). User input is parsed into options; invalid or missing required options produce an error.

If the arguments are valid, a command handler runs and produces output (logs). Commands may emit temporary logs during execution but eventually return a final, consistent answer.

```bash
command [options]
```

---

# Options

Options are the data supplied to a command and are defined within the user input.

Options are strongly typed in Term-O. For example, string values must be quoted. If a command declares required options, omitting them will cause an execution error.

Some options can be repeated on the same command line. Repeated options are represented as arrays internally.

---

# Types

In Term-O, almost everything is a validated value. We have defined all the possible types that can be used as an option value and also command answer.

The following is an example of input and possible answers:

```bash
command --a-test --b-test "value" --c-test ["value" "value"] --d-test 30
"answer-1" false ["answer-1" "answer-1"] 45
"answer-2" true ["answer-2" "answer-2"] 90
```

The above command execution example is interpreted as:

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

Options have short flags (shortcuts). Usually they use the first letter of the option, but when conflicts occur shortcuts may use a different letter.

All commands include a `--help` option that shows available options with descriptions and their short flags.

The example above can be written using short flags like this:

```bash
command -ab "value" -c ["value" "value"]
"answer-1" false ["answer-1" "answer-1"]
"answer-2" true ["answer-2" "answer-2"]
```

## String

String values are sequences of characters (plain text). They must be enclosed in quotes.

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

Boolean values are true/false flags. For options that are flags, mentioning the option in the input sets it to `true`.

```bash
command --enabled
'test-answer-1' false
'test-answer-2' true
'test-answer-3' false
```

## Array

Array values are ordered collections of values. They are written similarly to JavaScript/JSON arrays but without commas.

```bash
command --titles ["title-1" 23 false ["embed-value" 2]]
'test-answer-1' false ["answer-1" "answer-1"]
'test-answer-2' true ["answer-2" "answer-2"]
'test-answer-3' false ["answer-3" "answer-3"]
```

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

A parameter is a piece of output from one command that can be reused by another command. To chain commands, place them next to each other using `&&`.

Communication between commands is unidirectional: output from the first command is passed to the next.

## Pick Single

Take a look at the following example:

```bash
command-a --count 50 && command-b --title $0
```

1. The execution of `command-a --count 50` leaves the following answer:
   ```bash
   command --count 50
   'test-answer-1' false ["answer-1" "answer-1"] 12
   'test-answer-2' true ["answer-2" "answer-2"] 12
   ```
2. The execution of `command-b --title $0` starts; the `title` option uses `$0` as a placeholder.
3. The value `$0` is replaced with the first parameter from each answer line of the previous command (e.g., `'test-answer-1'`). Since the previous command returns two lines, `command-b --title $0` will run twice with each value.

In brief, the above example is equal to the following command chain:

```bash
command-a --count 50 && command-b --title 'test-answer-1' && command-b  --title 'test-answer-2'
```

## Pick Many

Take a look at the following example:

```bash
command-a --count 50 && command-b --titles $0,1
```

1. The execution of `command-a --count 50` leaves the following answer:
   ```bash
   command --count 50
   'test-answer-1' "test-title" ["answer-1" "answer-1"] 12
   'test-answer-2' "test-title" ["answer-2" "answer-2"] 12
   ```
2. The execution of `command-b --titles $0,1` starts, but the `titles` option is described using a `$0,1` keyword.
3. The value `$0,1` is replaced with an array containing the first and second parameters from each answer line (e.g., `['test-answer-1', "test-title"]`). The command will run once per answer line.

In brief, the above example is equal to the following command chain:

```bash
command-a --count 50 && command-b --titles ['test-answer-1' "test-title"] && command-b  --titles ['test-answer-2' "test-title"]
```

## Pick All

Take a look at the following example:

```bash
command-a --count 50 && command-b --titles $.
```

1. The execution of `command-a --count 50` leave us with an answer of:
   ```bash
   command --count 50
   'test-answer-1' "test-title" "another-title"
   'test-answer-2' "test-title" "another-title"
   ```
2. The execution of `command-b --titles $.` starts, but the `titles` option is described using a `$.` keyword.
3. The value `$.` is replaced with an array containing all parameters available in each answer line (e.g., `['test-answer-1', "test-title", "another-title"]`). The command will run once per answer line.

In brief, the above example is equal to the following command chain:

```bash
command-a --count 50 && command-b --titles ['test-answer-1' "test-title" "another-title"] && command-b  --titles ['test-answer-2' "test-title" "another-title"]
```

## Pick All As A String

Take a look at the following example:

```bash
command-a --count 50 && command-b --title $-
```

1. The execution of `command-a --count 50` leave us with an answer of:
   ```bash
   command --count 50
   "test-answer-1" "test-title" "another-title"
   "test-answer-2" "test-title" "another-title"
   ```
2. The execution of `command-b --title $-` starts, but the `title` option is described using a `$-` keyword.
3. The value `$-` is replaced with all parameters from each answer line converted to a single string (e.g., `"\"test-answer-1\" \"test-title\" \"another-title\""`). The command will run once per answer line.

In brief, the above example is equal to the following command chain:

```bash
command-a --count 50 && command-b --title '"test-answer-1" "test-title" "another-title"' && command-b  --title '"test-answer-2" "test-title" "another-title"'
```

---

# Theme

This project uses a terminal-style color scheme compatible with common formats.

Themes are based on the Windows Terminal color scheme format, which follows a standard 16-color ANSI palette with additional UI properties.

You can explore a large collection of themes at:
https://windowsterminalthemes.dev/

Note: Themes may require slight adjustments to match this project's structure.
All credits for the original themes go to their respective authors.

Please, see [theme-example.json](assets/theme-example.json) to find a more detailed example of a valid theme.

## Paint lines

You can apply colors to specific lines by embedding color tokens directly into the string.

These tokens reference your current theme colors and are parsed by the terminal at runtime.

```
"{tfg:blue}{tbg:white}Any text for testing purposes"
```

This allows you to quickly highlight output, emphasize messages, or create more expressive command results.

### Tokens

tfg → sets the foreground color (text color)
tbg → sets the background color

Both tokens accept any color defined in the current theme (e.g. red, blue, brightBlack, etc.).

---

# Configuration

You can access the configuration panel by clicking the gear icon in the top-right corner of the Term-O terminal.

From there, you can customize different aspects of the app, including functionality, appearance, and data-related settings.

## Prompt Context

This section allows you to customize the information displayed above the command input.

It is typically used to show contextual data — such as the current URL or page-related details — so you always know where you are while executing commands.

These are all the possible key values:

- `{origin}` -> "https://www.test.com"
- `{pathname}` -> "/testing/item-1"
- `{host}` -> "www.test.com"
- `{title}` -> "Page Title"
- `{tab_id}` -> "T00000000"
- `{group_id}` -> "G00000000"
- `{window_id}` -> "W00000000"

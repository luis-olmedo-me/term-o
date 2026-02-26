# Term-O Commands

> Version 0.9.0  
> Updated: 2026-02-26

---

# Table of Contents

- [Overview](#overview)
- [Commands](#commands)
  - [DOM](#dom)

---

# Overview

This documentation provides context about the built-in commands in Term-O.

Please make sure, you have read the [Term-O Basics](BASICS.md) before reading this documentation. It will ensure you can use any command built-in this Browser Extension.

---

# Commands

Built-in commands aim to make a simple bridge for you to interact with Browser APIs. And the command options express an action to be asked to the command. If they are properly described, then the command will be executed.

## DOM

Interact with the DOM elements using declarative filters and structured search rules.

The `dom` command enables element selection, filtering, and contextual queries inside the active browser tab.

| Option                                           | Short | Description                                  |
| ------------------------------------------------ | ----- | -------------------------------------------- |
| `--search`                                       | `-s`  | Find elements by criteria.                   |
| `--search-xpath <xpath>`                         | `-X`  | Find elements with an XPath query.           |
| `--attr <[attrname<regex> attrvalue<regex>]>`    | `-a`  | Filter by attributes.                        |
| `--below <xpath>`                                | `-B`  | Limit search scope under a specific element. |
| `--child <number+>`                              | `-d`  | Select child element by index.               |
| `--content`                                      | `-C`  | Show textual content of matched element(s).  |
| `--parent <number+>`                             | `-p`  | Select parent element by index.              |
| `--sibling <numberint>`                          | `-b`  | Select sibling by index.                     |
| `--style <[stylename<regex> stylevalue<regex>]>` | `-S`  | Filter by CSS styles.                        |
| `--tab-id <tabid>`                               | `-i`  | Search elements in a specific tab..          |
| `--tag <regex>`                                  | `-t`  | Filter by tag name.                          |
| `--text <regex>`                                 | `-T`  | Filter by text content.                      |
| `--xpath`                                        | `-x`  | Show XPath(s) of matched element(s).         |
| `--help`                                         | `-h`  | Show help for this command.                  |

### Dependency Rules

When using `dom` command the options can express two possible actions:

1. An element search (using `--search`)

   Just using `--search` will trigger a search for all elements available but it is possible to filter combining other options. Here is an example of how specific a search can be:

   ```bash
   dom
       --search
       --attr ["class" "test-class-.+"] # Both values supplied expect for a regular expression.
       --below 'id("cards-container")' # The search will take place below this element.
       --content # It will force the command to display the textual content of the elements.
       --style ["color" "#00000\d"] # Both values supplied expect for a regular expression.
       --tab-id "T00000000" # It will look for elements at a specific tab.
       --tag "button" # Value expect a regular expression.
       --text "Buscar con Go.+" # Value expect a regular expression.
       --xpath # It will force the command to display the xpath expression of the elements.
   ```

2. An element search from an xpath (using `--search-xpath`)

   The option `--search-xpath` will trigger a element search with a given string value. This option is mainly used to make a concatenated search. An xpath can be passed as a parameter, then continue the search using combining it with more options.

   ```bash
   dom
       --search-xpath 'id("main-container")'
       --below 'id("cards-container")' # The search will take place below this element.
       --child 3 # Once the elements are found, the elements taken will look for the third child below. It happens after parent filtering.
       --parent 2 # Once the elements are found, the elements taken will look for two parents above.
       --tab-id "T00000000" # It will look for elements at a specific tab.
       --xpath # It will force the command to display the xpath expression of the elements.
   ```

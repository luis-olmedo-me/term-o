# Term-O Commands

> Version 0.9.0  
> Updated: 2026-02-26

---

# Table of Contents

- [Overview](#overview)
- [Commands](#commands)
  - [DOM](#dom)
  - [TABS](#tabs)
  - [HISTORY](#history)
  - [REQUEST](#request)
  - [ALIAS](#alias)
  - [STYLE](#style)
  - [INSPECT](#inspect)

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

When using `dom` command the options can express **2** possible actions:

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

## TABS

Interact with the tabs of the browser.

The `tab` command displays all data related to the current tabs active browser.

| Option                          | Short | Description                                      |
| ------------------------------- | ----- | ------------------------------------------------ |
| `--list`                        | `-l`  | List all currently open tabs.                    |
| `--open <url>`                  | `-o`  | Open a new tab with the given URL.               |
| `--reload <tabid>`              | `-r`  | Reload a specific tab by ID.                     |
| `--switch <tabid>`              | `-s`  | Switch focus to a specific tab by ID.            |
| `--point <tabid>`               | `-p`  | Point the terminal to a specific tab by ID.      |
| `--close <tabid>`               | `-c`  | Close a specific tab by ID.                      |
| `--current`                     | `-C`  | Show the currently active tab.                   |
| `--pointing`                    | `-P`  | Show the tab currently targeted by the terminal. |
| `--active`                      | `-a`  | Focus the tab open.                              |
| `--incognito`                   | `-i`  | Show only tabs in incognito mode.                |
| `--muted`                       | `-m`  | Show only muted tabs.                            |
| `--title <regex>`               | `-t`  | Filter tabs by title.                            |
| `--unmuted`                     | `-M`  | Show only unmuted tabs.                          |
| `--url <regex>`                 | `-u`  | Filter tabs by URL.                              |
| `--wait`                        | `-W`  | Wait until the tab finishes loading.             |
| `--window-id <windowid<regex>>` | `-w`  | Filter tabs by window ID.                        |
| `--help`                        | `-h`  | Show help for this command.                      |

### Dependency Rules

When using `tabs` command the options can express **8** possible actions:

1. Create a tabs summary (using `--list`)

   Just using `--list` will trigger a search for all tabs available but it is possible to filter combining other options. Here is an example of how specific a search can be:

   ```bash
   tabs
       --list
       --incognito # Filter tabs on icognito mode. Manage browser extension permissions in the browser configuration.
       --muted # Filter by muted state.
       --unmuted # Filter by unmuted state. If combined with --muted, no tabs will be found.
       --title "Goo.+" # Filter tabs by their title. Value must be a valid a regular expression.
       --url "Goo.+le\.com" # Filter tabs by their url. Value must be a valid a regular expression.
       --window-id "W00000000" # It will look for elements at a specific window.
   ```

2. Open a new tab (using `--open`)

   The option `--open` will open a tab with a given string value. We can choose how we want to open this tab.

   ```bash
   tabs
       --open 'https://test.com'
       --wait # Term-O will wait until page is properly loaded before continuing with any other task.
       --active # Term-O will use the current tab to open the URL.
   ```

3. Reload a tab (using `--reload`)

   The option `--reload` will reload a tab with a given string value.

   ```bash
   tabs
       --reload 'T0000000'
       --wait # Term-O will wait until page is properly loaded before continuing with any other task.
   ```

4. Select a tab for the terminal (using `--switch`)

   The option `--switch` will make a tab get in view with a given string value.

   ```bash
   tabs
       --switch 'T0000000'
   ```

5. Select a tab for the terminal (using `--point`)

   The option `--point` will change the selected tab in the terminal with a given string value.

   ```bash
   tabs
       --point 'T0000000'
   ```

6. Select a tab for the terminal (using `--close`)

   The option `--close` will close a tab with a given string value.

   ```bash
   tabs
       --close 'T0000000'
   ```

7. Get the current tab (using `--current`)

   The option `--current` will get the current tab (in view).

   ```bash
   tabs
       --current
   ```

8. Get the tab pointed by the terminal (using `--pointing`)

   The option `--pointing` will get data from the pointing tab (selected in the terminal).

   ```bash
   tabs
       --pointing
   ```

## HISTORY

Interact with the tabs of the browser.

The `history` command displays all data related to the old tabs open in the browser.

| Option                   | Short | Description                             |
| ------------------------ | ----- | --------------------------------------- |
| `--list`                 | `-l`  | Show a list of previously opened pages. |
| `--title <regex>`        | `-t`  | Filter pages by title.                  |
| `--url <regex>`          | `-u`  | Filter pages by URL.                    |
| `--max-results <number>` | `-r`  | Limit the number of items displayed.    |
| `--from <datetime>`      | `-F`  | Start date for deletion or filtering.   |
| `--to <datetime>`        | `-T`  | End date for deletion or filtering.     |
| `--delete`               | `-d`  | Delete pages in a specific date range.  |
| `--help`                 | `-h`  | Show help for this command.             |

### Dependency Rules

When using `history` command the options can express **2** possible actions:

1. Create an old tabs summary (using `--list`)

   Just using `--list` will trigger a search for all old tabs open and it is possible to filter combining other options. Here is an example of how specific a search can be:

   ```bash
   history
       --list
       --title "Goo.+" # Filter tabs by their title. Value must be a valid a regular expression.
       --url "Goo.+le\.com" # Filter tabs by their url. Value must be a valid a regular expression.
       --max-results 5 # Limit to the last 5 tabs in history.
       --from "2026-02-26T19:47:16.836Z" # Filter old tabs to be open after "2026-02-26T19:47:16.836Z".
       --to "2026-02-27T05:03:22.965Z" # Filter old tabs to be open before "2026-02-27T05:03:22.965Z".
   ```

2. Delete old tabs from history by range (using `--delete`)

   The option `--delete` will delete old tabs from history after specifing a datetime range.

   ```bash
   history
       --delete
       --from "2026-02-26T19:47:16.836Z" # Delete any old tabs from history after "2026-02-26T19:47:16.836Z".
       --to "2026-02-27T05:03:22.965Z" # Delete any old tabs from history before "2026-02-27T05:03:22.965Z".
   ```

## REQUEST

Interact with the Fetch API of the browser.

The `request` command is a bridge to the Fetch API of the browser.

| Option                    | Short | Description                                       |
| ------------------------- | ----- | ------------------------------------------------- |
| `--fetch`                 | `-l`  | Start an API request.                             |
| `--headers <[header ..]>` | `-u`  | Include request headers.                          |
| `--method <method>`       | `-F`  | HTTP method to use.                               |
| `--payload <json>`        | `-r`  | Add a payload to the request.                     |
| `--read-as <string>`      | `-T`  | Format to read the response: blob, text, or json. |
| `--url <url>`             | `-t`  | URL for the API request.                          |
| `--help`                  | `-h`  | Show help for this command.                       |

### Dependency Rules

When using `request` command the options can express **1** possible action:

1. Build an API call (using `--fetch`)

   Just using `--fetch` will trigger an API call but it must be combined with other options to define the details. Here is an example of how specific a fetch can be:

   ```bash
   request
       --fetch
       --headers ["Authorization: test large id", "header: test"] # Define header values.
       --payload '{ "test": "test-value" }' # Define a payload JSON.
       --method "GET" # Define the method the call should use.
       --url "https://test.com/api/v2/test" # Define the URL the call should use. This is a must have.
       --read-as "json" # Define how the response will be read as. It can be json|blob|text.
   ```

## ALIAS

Interact with the aliases/shortcut of commands on Term-O.

The `alias` command is a bridge to manage aliases of commands in the terminal.

| Option                                | Short | Description                 |
| ------------------------------------- | ----- | --------------------------- |
| `--list`                              | `-l`  | List all defined aliases.   |
| `--add <[aliasname, executableline]>` | `-a`  | Add a new alias.            |
| `--delete <aliasname>`                | `-d`  | Remove an alias by name.    |
| `--help`                              | `-h`  | Show help for this command. |

### Dependency Rules

When using `alias` command the options can express **3** possible actions:

1. Create a summary of all the aliases created (using `--list`)

   Just using `--list` will trigger a search for all the aliases created. Here is an example of how specific a search can be:

   ```bash
   alias
       --list
   ```

2. Add a new alias (using `--add`)

   Just using `--add` with a given array with values will save the new array if the format is correct. Here is an example of how specific a fetch can be:

   ```bash
   alias
       --add ["gotest", 'tabs --open "https://test.com" --wait']
   ```

   After that command is executed, you can just type `gotest` to open "https://test.com" in a new tab.

3. Delete an alias (using `--delete`)

   Just using `--delete` with a given alias name will search for it and delete it. Here is an example of how specific a fetch can be:

   ```bash
   alias
       --delete "gotest"
   ```

## STYLE

Interact with styles of elements and color references.

The `style` command is a bridge to manage aliases of commands in the terminal.

| Option                                              | Short | Description                                                |
| --------------------------------------------------- | ----- | ---------------------------------------------------------- |
| `--list`                                            | `-l`  | List CSS styles applied to elements matching the criteria. |
| `--on <xpath>`                                      | `-o`  | XPath expression to select elements.                       |
| `--apply <inlinestyles>`                            | `-a`  | Apply inline styles to elements matching the criteria.     |
| `--color-pick`                                      | `-c`  | Pick a color by clicking on the web page.                  |
| `--property <[stylename<regex> stylevalue<regex>]>` | `-p`  | Filter styles by property names.                           |
| `--selector <selector<regex>>`                      | `-s`  | Filter elements by CSS selector.                           |
| `--help`                                            | `-h`  | Show help for this command.                                |

### Dependency Rules

When using `style` command the options can express **3** possible actions:

1. Create a summary of styles applied to a DOM element (using `--list`)

   Just using `--list` will trigger a search for styles in a DOM element and that's why, the xpath must be specified. Here is an example of how specific a search can be:

   ```bash
   style
       --list
       --on 'id("cards-container")' # The search will take this element as a reference.
       --property [".+color" "000.+"] # Filter styles by their names and values using regular expressions.
   ```

2. Apply styles to a DOM element (using `--apply`)

   The option `--apply` will apply inline styles taken as a value. Here is an example of how specific a fetch can be:

   ```bash
   style
       --apply "display: none; color: red;"
       --on 'id("cards-container")' # The search will take this element as a reference.
   ```

3. Pick a color (using `--color-pick`)

   Just using `--color-pick` will convert the cursor into a color picker. When user clicks anywhere, it will find the color used at that position. Here is an example of how specific a fetch can be:

   ```bash
   style
       --color-pick
   ```

## INSPECT

Interact with styles of elements and color references.

The `inspect` command is a bridge to manage aliases of commands in the terminal.

| Option               | Short | Description                              |
| -------------------- | ----- | ---------------------------------------- |
| `--path <valuepath>` | `-p`  | Read a variable path from global object. |
| `--tab-id <tabid>`   | `-i`  | Search variable in a specific tab.       |
| `--help`             | `-h`  | Show help for this command.              |

### Dependency Rules

When using `inspect` command the options can express **1** possible action:

1. Inspect a value from the global object ("window.\*") (using `--path`)

   Just using `--path` will trigger a search for a value in the global object. Here is an example of how specific a search can be:

   ```bash
   inspect
       --path "window.screen"
       --tab-id "T00000000" # It will look for elements at a specific tab.
   ```

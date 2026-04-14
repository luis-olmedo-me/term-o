# Term-O Commands

> Version 0.9.1  
> Updated: 2026-04-13

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
  - [NOTIFY](#notify)
  - [SEARCH](#search)
  - [STORAGE](#storage)
  - [ERROR](#error)
  - [EVENTS](#events)
  - [INPUT](#input)
  - [THEME](#theme)
  - [ADDONS](#addons)
  - [CLEAR](#clear)

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

| Option               | Short | Description                                          |
| -------------------- | ----- | ---------------------------------------------------- |
| `--search`           | `-s`  | Search for elements by criteria.                     |
| `--find`             | `-f`  | Find one element by criteria.                        |
| `--create`           | `-c`  | Create a DOM element.                                |
| `--pick`             | `-P`  | Pick an element from the tab.                        |
| `--measure`          | `-M`  | Calculate the distance between two elements..        |
| `--inject`           | `-I`  | Inject HTML as within an element.                    |
| `--sibling <number>` | `-b`  | Define the sibling index.                            |
| `--parent <number>`  | `-p`  | Define the parent index.                             |
| `--child <number>`   | `-d`  | Define the child index.                              |
| `--attr <array>`     | `-a`  | Define the attribute(s) of element(s).               |
| `--style <array>`    | `-S`  | Define the style(s) of element(s).                   |
| `--tag <string>`     | `-g`  | Define the element tag name.                         |
| `--content <string>` | `-t`  | Define the text content.                             |
| `--html <string>`    | `-H`  | Define the HTML content.                             |
| `--see-content`      | `-C`  | Define whether the text content should be displayed. |
| `--see-xpath`        | `-X`  | Define whether XPath(s) should be displayed.         |
| `--tab-id <string>`  | `-i`  | Define a Tab ID where apply an action.               |
| `--below <string>`   | `-B`  | Define an Element XPath query where apply an action. |
| `--xpath <string>`   | `-x`  | Define an XPath query.                               |
| `--times <number>`   | `-m`  | Define how many times the action must be done.       |
| `--from <string>`    | `-F`  | Define the origin element XPath.                     |
| `--to <string>`      | `-T`  | Define the destination element XPath.                |
| `--help`             | `-h`  | Show help for this command.                          |

### Dependency Rules

When using `dom` command the options can express **6** possible actions:

1. An element search (using `--search`)

   The `--search` will trigger a search for all elements available in a tab that matches a criteria.

   ```bash
   dom
       --search                                                             # REQUIRED
       --attr ["class" "test-class"]                                        # OPTIONAL/REPEATABLE
       --style ["color" "#00000\d"]                                         # OPTIONAL/REPEATABLE
       --below 'id("cards-container")'                                      # OPTIONAL
       --tab-id "T00000000"                                                 # OPTIONAL
       --tag "button"                                                       # OPTIONAL
       --content "Buscar con Go"                                            # OPTIONAL
       --see-content                                                        # OPTIONAL
       --see-xpath                                                          # OPTIONAL
   ```

2. An element search from an xpath (using `--find`)

   The option `--find` will trigger an only element search. This option is commonly used to make a concatenated search. An xpath can be passed as a parameter, then continue the search using combining it with more options.

   ```bash
   dom
       --find                                                               # REQUIRED
       --xpath 'id("main-container")'                                       # REQUIRED
       --below 'id("cards-container")'                                      # OPTIONAL
       --child 3                                                            # OPTIONAL
       --parent 2                                                           # OPTIONAL
       --tab-id "T00000000"                                                 # OPTIONAL
       --see-content                                                        # OPTIONAL
       --see-xpath                                                          # OPTIONAL
   ```

3. Inject HTML code below an element (using `--inject`)

   The option `--inject` will trigger an injection of HTML code in a specified element.

   ```bash
   dom
       --inject '<button>Test</button>'                                     # REQUIRED
       --xpath 'id("main-container")'                                       # REQUIRED
       --html "<button>test</button>"                                       # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
       --see-content                                                        # OPTIONAL
       --see-xpath                                                          # OPTIONAL
   ```

4. Create an element (using `--create`)

   The option `--create` will trigger the creation of an element taking the given string value as its tag name.

   ```bash
   dom
       --create                                                             # REQUIRED
       --tag "button"                                                       # REQUIRED
       --attr ["class" "test-class"]                                        # OPTIONAL/REPEATABLE
       --below 'id("cards-container")'                                      # OPTIONAL
       --tab-id "T00000000"                                                 # OPTIONAL
       --see-content                                                        # OPTIONAL
       --see-xpath                                                          # OPTIONAL
   ```

5. Pick an element (using `--pick`)

   The option `--pick` will trigger a dialog on a tab to pick an element.

   ```bash
   dom
       --pick                                                               # REQUIRED
       --times 3                                                            # OPTIONAL
       --tab-id "T00000000"                                                 # OPTIONAL
       --see-content                                                        # OPTIONAL
       --see-xpath                                                          # OPTIONAL
   ```

6. Measure distance (pixels) from two elements (using `--measure`)

   The option `--measure` will locate two elements and measure the distance between them.

   ```bash
   dom
       --measure                                                            # REQUIRED
       --from "html"                                                        # REQUIRED
       --to "html/body[1]"                                                  # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
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
| `--incognito`                   | `-I`  | Show only tabs in incognito mode.                |
| `--muted`                       | `-m`  | Show only muted tabs.                            |
| `--title <regex>`               | `-t`  | Filter tabs by title.                            |
| `--unmuted`                     | `-M`  | Show only unmuted tabs.                          |
| `--url <regex>`                 | `-u`  | Filter tabs by URL.                              |
| `--wait`                        | `-W`  | Wait until the tab finishes loading.             |
| `--window-id <windowid<regex>>` | `-w`  | Filter tabs by window ID.                        |
| `--group-id <groupid<regex>>`   | `-g`  | Filter tabs by group ID.                         |
| `--tab-id <tabid<regex>>`       | `-i`  | Filter tabs by tab ID.                           |
| `--help`                        | `-h`  | Show help for this command.                      |

### Dependency Rules

When using `tabs` command the options can express **8** possible actions:

1. Create a tabs summary (using `--list`)

   Just using `--list` will trigger a search for all tabs available but it is possible to filter combining other options. Here is an example of how specific a search can be:

   ```bash
   tabs
       --list                                                               # REQUIRED
       --incognito                                                          # OPTIONAL
       --muted                                                              # OPTIONAL
       --unmuted                                                            # OPTIONAL
       --title "Goo.+"                                                      # OPTIONAL
       --url "Goo.+le\.com"                                                 # OPTIONAL
       --window-id "W00000000"                                              # OPTIONAL
       --group-id "G00000000"                                               # OPTIONAL
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

2. Open a new tab (using `--open`)

   The option `--open` will open a tab with a given string value. We can choose how we want to open this tab.

   ```bash
   tabs
       --open 'https://test.com'                                            # REQUIRED
       --wait                                                               # OPTIONAL
       --active                                                             # OPTIONAL
   ```

3. Reload a tab (using `--reload`)

   The option `--reload` will reload a tab with a given string value.

   ```bash
   tabs
       --reload 'T0000000'                                                  # REQUIRED
       --wait                                                               # OPTIONAL
   ```

4. Select a tab for the terminal (using `--switch`)

   The option `--switch` will make a tab get in view with a given string value.

   ```bash
   tabs
       --switch 'T0000000'                                                  # REQUIRED
   ```

5. Select a tab for the terminal (using `--point`)

   The option `--point` will change the selected tab in the terminal with a given string value.

   ```bash
   tabs
       --point 'T0000000'                                                   # REQUIRED
   ```

6. Select a tab for the terminal (using `--close`)

   The option `--close` will close a tab with a given string value.

   ```bash
   tabs
       --close 'T0000000'                                                   # REQUIRED
   ```

7. Get the current tab (using `--current`)

   The option `--current` will get the current tab (in view).

   ```bash
   tabs
       --current                                                            # REQUIRED
   ```

8. Get the tab pointed by the terminal (using `--pointing`)

   The option `--pointing` will get data from the pointing tab (selected in the terminal).

   ```bash
   tabs
       --pointing                                                           # REQUIRED
   ```

## HISTORY

Interact with the tabs of the browser.

The `history` command displays all data related to the old tabs open in the browser.

| Option                   | Short | Description                             |
| ------------------------ | ----- | --------------------------------------- |
| `--list <boolean>`       | `-l`  | Show a list of previously opened pages. |
| `--delete <boolean>`     | `-d`  | Delete pages in a specific date range.  |
| `--title <string>`       | `-t`  | Define the title.                       |
| `--url <string>`         | `-u`  | Define a valid URL.                     |
| `--max-results <number>` | `-r`  | Define the limit of items displayed.    |
| `--from <string>`        | `-F`  | Define the start date.                  |
| `--to <string>`          | `-T`  | Define the end date.                    |
| `--help`                 | `-h`  | Show help for this command.             |

### Dependency Rules

When using `history` command the options can express **2** possible actions:

1. Create an old tabs summary (using `--list`)

   The `--list` will trigger a search for all old tabs open and it is possible to filter combining other options.

   ```bash
   history
       --list                                                               # REQUIRED
       --title "Goo.+"                                                      # OPTIONAL
       --url "Goo.+le\.com"                                                 # OPTIONAL
       --max-results 5                                                      # OPTIONAL
       --from "2026-02-26T19:47:16.836Z"                                    # OPTIONAL
       --to "2026-02-27T05:03:22.965Z"                                      # OPTIONAL
   ```

2. Delete old tabs from history by range (using `--delete`)

   The option `--delete` will delete old tabs from history after specifing a datetime range.

   ```bash
   history
       --delete                                                             # REQUIRED
       --from "2026-02-26T19:47:16.836Z"                                    # REQUIRED
       --to "2026-02-27T05:03:22.965Z"                                      # REQUIRED
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
       --fetch                                                              # REQUIRED
       --url "https://test.com/api/v2/test"                                 # REQUIRED
       --headers ["Authorization" "test large id"]                          # OPTIONAL/REPEATABLE
       --payload '{ "test": "test-value" }'                                 # OPTIONAL
       --method "GET"                                                       # OPTIONAL
       --read-as "json"                                                     # OPTIONAL
   ```

## ALIAS

Interact with the aliases/shortcut of commands on Term-O.

The `alias` command is a bridge to manage aliases of commands in the terminal.

| Option                       | Short | Description                                   |
| ---------------------------- | ----- | --------------------------------------------- |
| `--list`                     | `-l`  | List all defined aliases.                     |
| `--add`                      | `-a`  | Add a new alias and the associated command.   |
| `--delete`                   | `-d`  | Remove an alias by name.                      |
| `--name <aliasname>`         | `-n`  | Define the name of the alias.                 |
| `--command <executableline>` | `-c`  | Define the command associated with the alias. |
| `--help`                     | `-h`  | Show help for this command.                   |

### Dependency Rules

When using `alias` command the options can express **3** possible actions:

1. Create a summary of all the aliases created (using `--list`)

   Just using `--list` will trigger a search for all the aliases created. Here is an example of how specific a search can be:

   ```bash
   alias
       --list                                                               # REQUIRED
   ```

2. Add a new alias (using `--add`)

   Just using `--add` with a given array with values will save the new array if the format is correct. Here is an example of how specific a fetch can be:

   ```bash
   alias
       --add                                                                # REQUIRED
       --name "gotest"                                                      # REQUIRED
       --command 'tabs --open "https://test.com" --wait'                    # REQUIRED
   ```

   After that command is executed, you can just type `gotest` to open "https://test.com" in a new tab.

3. Delete an alias (using `--delete`)

   Just using `--delete` with a given alias name will search for it and delete it. Here is an example of how specific a fetch can be:

   ```bash
   alias
       --delete                                                             # REQUIRED
       --name "gotest"                                                      # REQUIRED
   ```

## STYLE

Interact with styles of elements and color references.

The `style` command is a bridge to manage aliases of commands in the terminal.

| Option                                              | Short | Description                                                |
| --------------------------------------------------- | ----- | ---------------------------------------------------------- |
| `--list`                                            | `-l`  | List CSS styles applied to elements matching the criteria. |
| `--on <xpath>`                                      | `-o`  | XPath expression to select elements.                       |
| `--apply <inlinestyles>`                            | `-a`  | Apply styles to elements matching the criteria.            |
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
       --list                                                               # REQUIRED
       --on 'id("cards-container")'                                         # REQUIRED
       --property [".+color" "000.+"]                                       # OPTIONAL/REPEATABLE
   ```

2. Apply styles to a DOM element (using `--apply`)

   The option `--apply` will apply inline styles taken as a value. Here is an example of how specific a fetch can be:

   ```bash
   style
       --apply ["display" "none"]                                           # REQUIRED/REPEATABLE
       --on 'id("cards-container")'                                         # REQUIRED
   ```

3. Pick a color (using `--color-pick`)

   Just using `--color-pick` will convert the cursor into a color picker. When user clicks anywhere, it will find the color used at that position. Here is an example of how specific a fetch can be:

   ```bash
   style
       --color-pick                                                         # REQUIRED
   ```

## INSPECT

Interact with the global object of a specific tab.

The `inspect` command is a bridge to review global variables in the global object of the tab.

| Option               | Short | Description                                         |
| -------------------- | ----- | --------------------------------------------------- |
| `--read <valuepath>` | `-r`  | Read a variable from the global context of the Tab. |
| `--path <string>`    | `-p`  | Define a variable path.                             |
| `--tab-id <string>`  | `-i`  | Define a Tab ID where apply an action.              |
| `--help`             | `-h`  | Show help for this command.                         |

### Dependency Rules

When using `inspect` command the options can express **1** possible action:

1. Inspect a value from the global object ("window.\*") (using `--read`)

   The `--read` will trigger a search for a value in the global object.

   ```bash
   inspect
       --read                                                               # REQUIRED
       --path "window.screen"                                               # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

## NOTIFY

Interact with visual notifications inside a tab.

The `notify` command is a bridge to manage visual notifications on a tab.

| Option               | Short | Description                            |
| -------------------- | ----- | -------------------------------------- |
| `--create`           | `-c`  | Create a notification.                 |
| `--tab-id <tabid>`   | `-i`  | Define a Tab ID where apply an action. |
| `--title <string>`   | `-t`  | Define the title.                      |
| `--message <string>` | `-m`  | Define the message.                    |
| `--help`             | `-h`  | Show help for this command.            |

### Dependency Rules

When using `notify` command the options can express **1** possible action:

1. Create a notification (using `--create`)

   The `--create` will trigger a creation of a notification.

   ```bash
   notify
       --create                                                             # REQUIRED
       --title "Testing Title"                                              # REQUIRED
       --message "Message to be aware of."                                  # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

## SEARCH

Interact with a string search.

The `search` command is a bridge to search for a text inside another text.

| Option             | Short | Description                         |
| ------------------ | ----- | ----------------------------------- |
| `--query <regex>`  | `-q`  | Text query to be searched in input. |
| `--input <string>` | `-i`  | Text taken as input.                |
| `--help`           | `-h`  | Show help for this command.         |

### Dependency Rules

When using `search` command the options can express **1** possible action:

1. Search for text (using `--query`)

   The `--query` describes what the query used to match the input. Only if the input matches you will get an answer. Here is an example of how specific a notification can be:

   ```bash
   search
       --query "test\.testing"                                              # REQUIRED
       --input "template test.testing"                                      # REQUIRED
   ```

## STORAGE

Interact with the storage API and clipboard API at any tab.

The `storage` command is a bridge to the storage API and clipboard API at any tab.

| Option             | Short | Description                                   |
| ------------------ | ----- | --------------------------------------------- |
| `--local`          | `-l`  | Get local storage from the selected tab.      |
| `--session`        | `-s`  | Get session storage from the selected tab.    |
| `--cookie`         | `-c`  | Get cookies from the selected tab.            |
| `--json`           | `-j`  | Return storage as JSON.                       |
| `--tab-id <tabid>` | `-i`  | Specify a tab ID to get storage from.         |
| `--set <array>`    | `-S`  | Set a key-value pair in the selected storage. |
| `--copy <string>`  | `-C`  | Copy a value to the clipboard.                |
| `--help`           | `-h`  | Show help for this command.                   |

### Dependency Rules

When using `storage` command the options can express **4** possible action:

1. Get a summary of local storage in a tab (using `--local`)

   Just using `--local` will trigger the review of local storage at a certain tab. Here is an example of how specific a notification can be:

   ```bash
   search
       --local                                                              # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

2. Get a summary of session storage in a tab (using `--session`)

   Just using `--session` will trigger the review of session storage at a certain tab. Here is an example of how specific a notification can be:

   ```bash
   search
       --session                                                            # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

3. Get a summary of cookies storage in a tab (using `--cookie`)

   Just using `--cookie` will trigger the review of cookies storage at a certain tab. Here is an example of how specific a notification can be:

   ```bash
   search
       --cookie                                                             # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

4. Set a value in a certain storage at a certain tab (using `--set`)

   Just using `--set` will assigned a value in a ceratin tab at a certain tab. Here is an example of how specific a notification can be:

   ```bash
   search
       --set ["test-name" "test-value"]                                     # REQUIRED/REPEATABLE
       --tab-id "T00000000"                                                 # OPTIONAL
       --session                                                            # OPTIONAL
       --cookie                                                             # OPTIONAL
       --local                                                              # OPTIONAL
   ```

## ERROR

The `error` command is a bridge to the error API.

| Option             | Short | Description                           |
| ------------------ | ----- | ------------------------------------- |
| `--create`         | `-c`  | Create an error.                      |
| `--title <string>` | `-t`  | Throw an error with a custom message. |
| `--help`           | `-h`  | Show help for this command.           |

### Dependency Rules

When using `error` command the options can express **1** possible action:

1. Throw an error (using `--create`)

   `--create` will trigger the creation of an error.

   ```bash
   search
       --create                                                             # REQUIRED
       --title "test title"                                                 # REQUIRED
   ```

## EVENTS

The `events` command is a bridge to the page events API and DOM element events.

| Option                     | Short | Description                                      |
| -------------------------- | ----- | ------------------------------------------------ |
| `--register <boolean>`     | `-r`  | Register a new command for future execution.     |
| `--dom-dispatch <boolean>` | `-d`  | Dispatch a new DOM event in page.                |
| `--list <boolean>`         | `-l`  | List all registered events.                      |
| `--delete <boolean>`       | `-d`  | Delete a registered event by its identifier.     |
| `--xpath <string>`         | `-x`  | Define an XPath query.                           |
| `--tab-id <string>`        | `-i`  | Define a Tab ID where apply an action.           |
| `--url <string>`           | `-u`  | Define a valid URL.                              |
| `--name <string>`          | `-n`  | Define the name of the event.                    |
| `--command <string>`       | `-c`  | Define the command line associated to the event. |
| `--command-id <string>`    | `-C`  | Define the command identifier of the event.      |

### Dependency Rules

When using `evennts` command the options can express **4** possible action:

1. Trigger an event on a element (using `--dom-dispatch`)

   The `--dom-dispatch` will dispatch a DOM Event on an element.

   ```bash
   events
       --dom-dispatch                                                       # REQUIRED
       --name "click"                                                       # REQUIRED
       --xpath 'id("main-container")'                                       # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

2. Create a summary of all the page events created (using `--list`)

   The `--list` will trigger a search for all the page events created.

   ```bash
   events
       --list                                                               # REQUIRED
   ```

3. Register page events (using `--register`)

   The `--register` will trigger the creation of a page event.

   ```bash
   events
       --register                                                           # REQUIRED
       --url 'https://test.com'                                             # REQUIRED
       --command 'tabs --open "https://test.com" --wait'                    # REQUIRED
   ```

4. Delete a page events (using `--delete`)

   The option `--delete` will delete a specific page event.

   ```bash
   events
       --delete                                                             # REQUIRED
       --command-id "9edb327b-b67f-4a3e-9e10-90b35ad1f3e5"                  # REQUIRED
   ```

## INPUT

The `input` command is a bridge to UI terminal requests.

| Option     | Short | Description                         |
| ---------- | ----- | ----------------------------------- |
| `--text`   | `-t`  | Request user input in terminal.     |
| `--tab-id` | `-i`  | Specify a tab ID to take action on. |
| `--help`   | `-h`  | Show help for this command.         |

### Dependency Rules

When using `input` command the options can express **1** possible action:

1. Request a user input in the terminal (using `--text`)

   Just using `--text` will trigger a request that can be seen and completed in the UI terminal. Here is an example of how specific it can be:

   ```bash
   input
       --text                                                               # REQUIRED
   ```

## THEME

The `theme` command is a bridge to manage the theme in Term-O.

| Option              | Short | Description                           |
| ------------------- | ----- | ------------------------------------- |
| `--import <string>` | `-i`  | Import a color scheme in JSON format. |
| `--list`            | `-l`  | List all available themes.            |
| `--delete <string>` | `-d`  | Delete a theme by name.               |
| `--apply <string>`  | `-a`  | Apply a theme by name.                |
| `--current`         | `-C`  | Show the currently applied theme.     |
| `--help`            | `-h`  | Show help for this command.           |

### Dependency Rules

When using `theme` command the options can express **5** possible actions:

1. Create a summary of all themes available (using `--list`)

   Just using `--list` will trigger a search for all themes available. Here is an example of how specific a search can be:

   ```bash
   theme
       --list                                                               # REQUIRED
   ```

2. Delete a theme by its name (using `--delete`)

   The option `--delete` will delete a specific theme by its name.

   ```bash
   theme
       --delete "an-already-imported-theme-name"                            # REQUIRED
   ```

3. Change the current theme in use (using `--apply`)

   The option `--apply` will apply the specified theme name. Here is an example of how specific it can be:

   ```bash
   theme
       --apply "an-already-imported-theme-name"                             # REQUIRED
   ```

4. Import a theme (using `--import`)

   The option `--import` will import the specified theme in JSON format. Here is an example of how specific it can be:

   ```bash
   theme
       --import '{ "name": "an-already-imported-theme-name", ... }'         # REQUIRED
   ```

   Please, see [theme-example.json](assets/theme-example.json) to find a more detailed example of a valid theme.

5. Get the current theme name (using `--current`)

   The option `--current` will search for the name of the current theme. Here is an example of how specific it can be:

   ```bash
   theme
       --current                                                            # REQUIRED
   ```

## ADDONS

The `theme` command is a bridge to manage the addons in Term-O.

An addon is a new command added to Term-O.

| Option              | Short | Description                      |
| ------------------- | ----- | -------------------------------- |
| `--list`            | `-l`  | List all addons.                 |
| `--upload`          | `-u`  | Upload a file to add as a addon. |
| `--delete <string>` | `-d`  | Delete a addon by name.          |
| `--name`            | `-n`  | Define the name of the addon.    |
| `--help`            | `-h`  | Show help for this command.      |

### Dependency Rules

When using `theme` command the options can express **3** possible actions:

1. Create a summary of all addons available (using `--list`)

   Just using `--list` will trigger a search for all addons available. Here is an example of how specific a search can be:

   ```bash
   addons
       --list                                                               # REQUIRED
   ```

2. Delete a addon by its name (using `--delete`)

   The option `--delete` will delete a specific addon by its name.

   ```bash
   addons
       --delete                                                             # REQUIRED
       --name "an-already-uploaded-addon-name"                              # REQUIRED
   ```

3. Upload an addon (using `--upload`)

   The option `--upload` will trigger a file picker to show up asking for an addon in JSON format. Here is an example of how specific it can be:

   ```bash
   theme
       --upload                                                             # REQUIRED
   ```

   Please, see [addon-example.json](assets/addon-example.json) to find a more detailed example of a valid addon.

## CLEAR

Interact with the clean up of the UI terminal.

This command does not expect for any option, its only porpuse is to clean the terminal when called.

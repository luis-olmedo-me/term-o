# Term-O Commands

> Version 0.9.4  
> Updated: 2026-08-06

---

## Quick Start

A minimal set of examples to get started with Term-O commands.

```bash
# Open a new tab and wait until it loads
tabs --open "https://example.com" --wait --active

# Search for buttons containing "Submit" and show their XPaths
dom --search --tag "button" --content "Submit" --see-xpath
```

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
  - [EVENTS](#events)
  - [INPUT](#input)
  - [THEME](#theme)
  - [ADDONS](#addons)
  - [URL](#url)
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

| Option                  | Short | Description                                          |
| ----------------------- | ----- | ---------------------------------------------------- |
| `--search`              | `-s`  | Search for elements by criteria.                     |
| `--find`                | `-f`  | Find one element by criteria.                        |
| `--create`              | `-c`  | Create a DOM element.                                |
| `--pick`                | `-P`  | Pick an element from the tab.                        |
| `--measure`             | `-M`  | Calculate the distance between two elements.         |
| `--inject`              | `-I`  | Inject HTML as within an element.                    |
| `--dispatch`            | `-D`  | Dispatch an element over an element.                 |
| `--selection`           | `-l`  | Get selected text in the tab.                        |
| `--sibling <number>`    | `-b`  | Specify the sibling index.                           |
| `--parent <number>`     | `-p`  | Specify the parent index.                            |
| `--child <number>`      | `-d`  | Specify the child index.                             |
| `--attr <array>`        | `-a`  | Specify a name-value attribute pair.                 |
| `--style <array>`       | `-S`  | Specify a name-value style pair.                     |
| `--tag <string>`        | `-g`  | Specify the element tag name.                        |
| `--content <string>`    | `-t`  | Specify the text content.                            |
| `--html <string>`       | `-H`  | Specify the HTML content.                            |
| `--see-content`         | `-C`  | Show text content in results.                        |
| `--see-xpath`           | `-X`  | Show XPath(s) in results.                            |
| `--tab-id <string>`     | `-i`  | Specify a Tab ID to apply the action.                |
| `--below <string>`      | `-B`  | Specify an Element XPath query to apply the action.  |
| `--xpath <string>`      | `-x`  | Specify an XPath query.                              |
| `--times <number>`      | `-m`  | Specify how many times to repeat the action.         |
| `--from <string>`       | `-F`  | Specify the origin element XPath.                    |
| `--to <string>`         | `-T`  | Specify the destination element XPath.               |
| `--event-name <string>` | `-e`  | Specify the event name.                              |
| `--help`                | `-h`  | Show help for this command.                          |

### Dependency Rules

When using `dom` command the options can express **8** possible actions:

1. An element search (using `--search`)

   The `--search` will trigger a search for all elements available in a tab that matches a criteria.

   ```bash
   dom
       --search                                                             # REQUIRED
       --attr ["class" "test-class"]                                        # OPTIONAL/REPEATABLE
       --style ["color" "#00000\d"]                                         # OPTIONAL/REPEATABLE
       --below '//*[@id="cards-container"]'                                 # OPTIONAL
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
       --xpath '//*[@id="main-container"]'                                  # REQUIRED
       --below '//*[@id="cards-container"]'                                 # OPTIONAL
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
       --xpath '//*[@id="main-container"]'                                  # REQUIRED
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
       --below '//*[@id="cards-container"]'                                 # OPTIONAL
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

   The `--measure` will locate two elements and measure the distance between them.

   ```bash
   dom
       --measure                                                            # REQUIRED
       --from "html"                                                        # REQUIRED
       --to "html/body[1]"                                                  # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

7. Dispatch an event over an element (using `--dispatch`)

   The `--dispatch` will dispatch an event on an element from the DOM.

   ```bash
   dom
       --dispatch                                                           # REQUIRED
       --event-name 'click'                                                 # REQUIRED
       --xpath '//*[@id="cards-container"]'                                 # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

8. Get text selection (using `--selection`)

   The `--selection` will trigger a search in the tab for selected text.

   ```bash
   dom
       --selection                                                          # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

## TABS

Interact with the tabs of the browser.

The `tabs` command displays all data related to the browser's tabs.

| Option                 | Short | Description                                                |
| ---------------------- | ----- | ---------------------------------------------------------- |
| `--list`               | `-l`  | List all currently open tabs.                              |
| `--open`               | `-o`  | Open a new tab with the given URL.                         |
| `--reload`             | `-r`  | Reload a specific tab by its identifier.                   |
| `--switch`             | `-s`  | Switch focus to a specific tab by its identifier.          |
| `--point`              | `-p`  | Point the terminal to a specific tab by its identifier.    |
| `--current`            | `-C`  | Show the currently active tab.                             |
| `--pointing`           | `-P`  | Show the tab currently targeted by the terminal.           |
| `--close <string>`     | `-c`  | Close a specific tab by its identifier.                    |
| `--incognito`          | `-I`  | Include incognito tabs.                                     |
| `--muted`              | `-m`  | Include muted tabs.                                         |
| `--unmuted`            | `-M`  | Include unmuted tabs.                                       |
| `--wait`               | `-W`  | Wait for the action to complete before continuing.          |
| `--active`             | `-a`  | Use the current tab.                                        |
| `--title <string>`     | `-t`  | Specify a title filter.                                    |
| `--url <string>`       | `-u`  | Specify a valid URL.                                       |
| `--window-id <string>` | `-w`  | Define a Window ID where apply an action.                  |
| `--group-id <string>`  | `-g`  | Define a Group ID where apply an action.                   |
| `--tab-id <string>`    | `-i`  | Specify a Tab ID to apply the action.                     |
| `--help`               | `-h`  | Show help for this command.                                |

### Example

```bash
# Open a new tab and set it active
tabs --open --url "https://example.com" --wait --active

# List tabs with titles matching "Example"
tabs --list --title "Example"
```

### Dependency Rules

When using `tabs` command the options can express **8** possible actions:

1. Create a tabs summary (using `--list`)

   The `--list` will trigger a search for all tabs available.

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

   The `--open` will open a tab with a given string value.

   ```bash
   tabs
       --open                                                               # REQUIRED
       --url 'https://test.com'                                             # REQUIRED
       --wait                                                               # OPTIONAL
       --active                                                             # OPTIONAL
   ```

3. Reload a tab (using `--reload`)

   The `--reload` will reload a tab with a given string value.

   ```bash
   tabs
       --reload                                                             # REQUIRED
       --tab-id 'T0000000'                                                  # REQUIRED
       --wait                                                               # OPTIONAL
   ```

4. Select a tab for the terminal (using `--switch`)

   The `--switch` will make a tab get in view with a given string value.

   ```bash
   tabs
       --switch                                                             # REQUIRED
       --tab-id 'T0000000'                                                  # REQUIRED
   ```

5. Select a tab for the terminal (using `--point`)

   The `--point` will change the selected tab in the terminal with a given string value.

   ```bash
   tabs
       --point                                                              # REQUIRED
       --tab-id 'T0000000'                                                  # REQUIRED
   ```

6. Select a tab for the terminal (using `--close`)

   The `--close` will close a tab with a given string value.

   ```bash
   tabs
       --close                                                              # REQUIRED
       --tab-id 'T0000000'                                                  # REQUIRED
   ```

7. Get the current tab (using `--current`)

   The `--current` will get the current tab (in view).

   ```bash
   tabs
       --current                                                            # REQUIRED
   ```

8. Get the tab pointed by the terminal (using `--pointing`)

   The `--pointing` will get data from the pointing tab (selected in the terminal).

   ```bash
   tabs
       --pointing                                                           # REQUIRED
   ```

## HISTORY

Interact with the tabs of the browser.

The `history` command displays all data related to the old tabs open in the browser.

| Option                   | Short | Description                             |
| ------------------------ | ----- | --------------------------------------- |
| `--list`                 | `-l`  | Show a list of previously opened pages. |
| `--delete`               | `-d`  | Delete pages in a specific date range.  |
| `--title <string>`       | `-t`  | Specify a title filter.                  |
| `--url <string>`         | `-u`  | Specify a valid URL.                     |
| `--max-results <number>` | `-r`  | Specify the maximum number of items to display.    |
| `--from <string>`        | `-F`  | Specify the start date.                  |
| `--to <string>`          | `-T`  | Specify the end date.                    |
| `--help`                 | `-h`  | Show help for this command.             |

### Example

```bash
# List recent history entries
history --list --max-results 10

# Delete history between two datetimes
history --delete --from "2026-01-01T00:00:00Z" --to "2026-01-31T23:59:59Z"
```

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

   The `--delete` will delete old tabs from history after specifing a datetime range.

   ```bash
   history
       --delete                                                             # REQUIRED
       --from "2026-02-26T19:47:16.836Z"                                    # REQUIRED
       --to "2026-02-27T05:03:22.965Z"                                      # REQUIRED
   ```

## REQUEST

Interact with the Fetch API of the browser.

The `request` command is a bridge to the Fetch API of the browser.

| Option                    | Short | Description                            |
| ------------------------- | ----- | -------------------------------------- |
| `--fetch`                 | `-l`  | Start an API request.                  |
| `--headers <[header ..]>` | `-u`  | Specify the request headers.            |
| `--method <method>`       | `-F`  | Define a HTTP method.                  |
| `--payload <json>`        | `-r`  | Specify the request payload.           |
| `--read-as <string>`      | `-T`  | Define how response should be read as. |
| `--url <url>`             | `-t`  | Specify a valid URL.                    |
| `--help`                  | `-h`  | Show help for this command.            |

### Example

```bash
# Simple GET request and read JSON
request --fetch --url "https://api.example.com/items" --method "GET" --read-as "json"

# POST with payload
request --fetch --url "https://api.example.com/items" --method "POST" --payload '{"name":"test"}'
```

### Dependency Rules

When using `request` command the options can express **1** possible action:

1. Build an API call (using `--fetch`)

   The `--fetch` will trigger an API call.

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
| `--name <aliasname>`         | `-n`  | Specify the alias name.                        |
| `--command <executableline>` | `-c`  | Specify the command associated with the alias. |
| `--help`                     | `-h`  | Show help for this command.                   |

### Example

```bash
# List aliases
alias --list

# Add a new alias
alias --add --name "gotest" --command 'tabs --open --url "https://test.com" --wait'
```

### Dependency Rules

When using `alias` command the options can express **3** possible actions:

1. Create a summary of all the aliases created (using `--list`)

   The `--list` will trigger a search for all the aliases created. Here is an example of how specific a search can be:

   ```bash
   alias
       --list                                                               # REQUIRED
   ```

2. Add a new alias (using `--add`)

   The `--add` with a given array with values will save the new array if the format is correct. Here is an example of how specific a fetch can be:

   ```bash
   alias
       --add                                                                # REQUIRED
       --name "gotest"                                                      # REQUIRED
       --command 'tabs --open "https://test.com" --wait'                    # REQUIRED
   ```

   After that command is executed, you can just type `gotest` to open "https://test.com" in a new tab.

3. Delete an alias (using `--delete`)

   The `--delete` with a given alias name will search for it and delete it. Here is an example of how specific a fetch can be:

   ```bash
   alias
       --delete                                                             # REQUIRED
       --name "gotest"                                                      # REQUIRED
   ```

## STYLE

Interact with styles of elements and color references.

The `style` command is a bridge elements styles or just styles API related.

| Option             | Short | Description                                                |
| ------------------ | ----- | ---------------------------------------------------------- |
| `--list`           | `-l`  | List CSS styles applied to elements matching the criteria. |
| `--apply`          | `-a`  | Apply styles to elements matching the criteria.            |
| `--color-pick`     | `-c`  | Pick a color by clicking on the web page.                  |
| `--xpath <string>` | `-x`  | Define an XPath query.                                     |
| `--style <array>`  | `-S`  | Define a name-value style pair.                            |
| `--help`           | `-h`  | Show help for this command.                                |

### Example

```bash
# Apply inline style to an element
style --apply --style ["display" "none"] --xpath '//*[@id="cards-container"]'

# Pick a color from the page (interactive)
style --color-pick
```

### Dependency Rules

When using `style` command the options can express **3** possible actions:

1. Create a summary of styles applied to a DOM element (using `--list`)

   The `--list` will trigger a search for styles in a DOM element.

   ```bash
   style
       --list                                                               # REQUIRED
       --style ["color" "red"]                                              # OPTIONAL/REPEATABLE
       --xpath '//*[@id="cards-container"]'                                 # REQUIRED
   ```

2. Apply styles to a DOM element (using `--apply`)

   The `--apply` will apply inline styles taken as a value.

   ```bash
   style
       --apply                                                              # REQUIRED
       --style ["display" "none"]                                           # REQUIRED/REPEATABLE
       --xpath '//*[@id="cards-container"]'                                 # REQUIRED
   ```

3. Pick a color (using `--color-pick`)

   The `--color-pick` will trigger a dialog to pick a color.

   ```bash
   style
       --color-pick                                                         # REQUIRED
   ```

## INSPECT

Interact with the global object of a specific tab.

The `inspect` command is a bridge to review global variables in the global object of the tab.

| Option              | Short | Description                                                |
| ------------------- | ----- | ---------------------------------------------------------- |
| `--read`            | `-r`  | Read a variable from the global context of the Tab.        |
| `--match`           | `-m`  | Match a given query within an input value.                 |
| `--path <string>`   | `-p`  | Define a variable path.                                    |
| `--tab-id <string>` | `-i`  | Specify a Tab ID to apply the action.                     |
| `--query <string>`  | `-q`  | Define a regular expression used to match within an input. |
| `--input <string>`  | `-I`  | Define a user input.                                       |
| `--help`            | `-h`  | Show help for this command.                                |

### Example

```bash
# Read a global property from the current tab
inspect --read --path "window.navigator.userAgent"

# Inspect a value inside a JSON input
inspect --read --input '{"test":3}' --path "test"
```

### Dependency Rules

When using `inspect` command the options can express **3** possible action:

1. Inspect a value from the global context (using `--read`)

   The `--read` will trigger a search for a value in the global context.

   ```bash
   inspect
       --read                                                               # REQUIRED
       --path "window.screen"                                               # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

2. Inspect a value from input (using `--read`)

   The `--read` will trigger a search for a value within a given input JSON value.

   ```bash
   inspect
       --read                                                               # REQUIRED
       --input '{"test":3}'                                                 # REQUIRED
       --path "test"                                                        # REQUIRED
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

3. Search for text (using `--match`)

   The `--match` describes what the query used to match the input.

   ```bash
   search
       --match                                                              # REQUIRED
       --query "test\.testing"                                              # REQUIRED
       --input "template test.testing"                                      # REQUIRED
   ```

## NOTIFY

Interact with visual notifications inside a tab.

The `notify` command is a bridge to manage visual notifications on a tab.

| Option               | Short | Description                            |
| -------------------- | ----- | -------------------------------------- |
| `--create`           | `-c`  | Create a notification.                 |
| `--tab-id <tabid>`   | `-i`  | Specify a Tab ID to apply the action. |
| `--title <string>`   | `-t`  | Specify the notification title.        |
| `--message <string>` | `-m`  | Specify the notification message.      |
| `--icon <string>`    | `-I`  | Specify the icon to show.              |
| `--color <string>`   | `-C`  | Specify the notification color.        |
| `--help`             | `-h`  | Show help for this command.            |

### Example

```bash
# Create a visual notification in the current tab
notify --create --title "Hi" --message "This is a test" --icon "success"
```

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
       --icon "success"                                                     # OPTIONAL
       --color "red"                                                        # OPTIONAL
   ```

## STORAGE

Interact with the storage API and clipboard API at any tab.

The `storage` command is a bridge to the storage API and clipboard API at any tab.

| Option              | Short | Description                                             |
| ------------------- | ----- | ------------------------------------------------------- |
| `--list`            | `-l`  | List all storage key-values.                            |
| `--set`             | `-s`  | Set a key-value pair in the selected storage.           |
| `--get`             | `-g`  | Get storage data.                                       |
| `--copy`            | `-c`  | Copy a value to the clipboard.                          |
| `--local`           | `-L`  | Target local storage.                                     |
| `--session`         | `-S`  | Target session storage.                                   |
| `--cookie`          | `-C`  | Target cookie storage.                                    |
| `--see-json`        | `-j`  | Display results as JSON.                                  |
| `--tab-id <string>` | `-i`  | Specify a Tab ID to apply the action.                  |
| `--key <string>`    | `-k`  | Define a storage key.                                   |
| `--input <string>`  | `-I`  | Define a user input.                                    |
| `--data <array>`    | `-d`  | Define a key-value pair.                                |
| `--help`            | `-h`  | Show help for this command.                             |

### Example

```bash
# Set a key in session storage
storage --set --session --data ["lastSearch" "term-o"]

# Get a key from local storage
storage --get --key "lastSearch" --local
```

### Dependency Rules

When using `storage` command the options can express **4** possible action:

1. Get a summary of local storage in a tab (using `--list`)

   The `--list` will trigger a search for all the storage key-values in a certain tab.

   ```bash
   storage
       --list                                                               # REQUIRED
       --local                                                              # -
       --session                                                            # | ONE REQUIRED
       --cookie                                                             # -
       --tab-id "T00000000"                                                 # OPTIONAL
       --data ["test-" "-value"]                                            # OPTIONAL
       --see-json                                                           # OPTIONAL
   ```

2. Set a value in a certain storage in a certain tab (using `--set`)

   The `--set` assigns a value in a certain storage in a certain tab.

   ```bash
   storage
       --set                                                                # REQUIRED
       --local                                                              # -
       --session                                                            # | ONE REQUIRED
       --cookie                                                             # -
       --data ["test-name" "test-value"]                                    # REQUIRED/REPEATABLE
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

3. Get data from a storage (using `--get`)

   The `--get` will trigger a search for an unique storage value.

   ```bash
   storage
       --get                                                                # REQUIRED
       --key "test-value"                                                   # REQUIRED
       --local                                                              # -
       --session                                                            # | ONE REQUIRED
       --cookie                                                             # -
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

4. Copy value into the clipboard (using `--copy`)

   The `--copy` will trigger the clipboard edition.

   ```bash
   storage
       --copy                                                                # REQUIRED
       --input "test-value"                                                  # REQUIRED
   ```

## EVENTS

The `events` command is a bridge to the page events API and DOM element events.

| Option                | Short | Description                                  |
| --------------------- | ----- | -------------------------------------------- |
| `--register`          | `-r`  | Register a new command for future execution. |
| `--list`              | `-l`  | List all registered events.                  |
| `--delete`            | `-d`  | Delete a registered event by its identifier. |
| `--debounce <number>` | `-D`  | Specify the debounce time (ms) for the event. |
| `--event <array>`     | `-e`  | Specify a type-url-command event tuple.       |
| `--event-id <string>` | `-E`  | Specify the event identifier.                 |

### Example

```bash
# Register a page event that runs a command when the page loads
events --register --event ["tab-loaded" "https://example.com" "dom -s"] --debounce 80
```

### Dependency Rules

When using `events` command the options can express **3** possible action:

1. Create a summary of all the page events created (using `--list`)

   The `--list` will trigger a search for all the page events created.

   ```bash
   events
       --list                                                               # REQUIRED
   ```

2. Register page events (using `--register`)

   The `--register` will trigger the creation of a page event.

   ```bash
   events
       --register                                                           # REQUIRED
       --event ["tab-loaded" 'https://test.com' 'dom -s']                   # REQUIRED
       --debounce 80                                                        # OPTIONAL
   ```

3. Delete a page events (using `--delete`)

   The `--delete` will delete a specific page event.

   ```bash
   events
       --delete                                                             # REQUIRED
       --event-id "35ad1f3e"                                                # REQUIRED
   ```

## INPUT

The `input` command is a bridge to UI terminal requests.

| Option   | Short | Description                     |
| -------- | ----- | ------------------------------- |
| `--text` | `-t`  | Request user input in terminal. |
| `--help` | `-h`  | Show help for this command.     |

### Example

```bash
# Request a text input from the terminal
input --text
```

### Dependency Rules

When using `input` command the options can express **1** possible action:

1. Request a user input in the terminal (using `--text`)

   The `--text` will trigger a request that can be seen and completed in the UI terminal. Here is an example of how specific it can be:

   ```bash
   input
       --text                                                               # REQUIRED
   ```

## THEME

The `theme` command is a bridge to manage the theme in Term-O.

| Option                  | Short | Description                           |
| ----------------------- | ----- | ------------------------------------- |
| `--import`              | `-i`  | Import a color scheme in JSON format. |
| `--list`                | `-l`  | List all available themes.            |
| `--delete`              | `-d`  | Delete a theme by its name.           |
| `--apply`               | `-a`  | Apply a theme by name.                |
| `--current`             | `-C`  | Show the currently applied theme.     |
| `--theme-json <string>` | `-t`  | Specify the theme JSON string.        |
| `--name <string>`       | `-n`  | Specify the name of the theme.        |
| `--help`                | `-h`  | Show help for this command.           |

### Example

```bash
# Import and apply a theme
theme --import --theme-json '{"name":"dark","colors":{}}'
theme --apply --name "dark"
```

### Dependency Rules

When using `theme` command the options can express **5** possible actions:

1. Create a summary of all themes available (using `--list`)

   The `--list` will trigger a search for all themes available.

   ```bash
   theme
       --list                                                               # REQUIRED
   ```

2. Delete a theme by its name (using `--delete`)

   The option `--delete` will delete a specific theme by its name.

   ```bash
   theme
       --delete                                                             # REQUIRED
       --name "an-already-imported-theme-name"                              # REQUIRED
   ```

3. Change the current theme in use (using `--apply`)

   The option `--apply` will apply the specified theme name.

   ```bash
   theme
       --apply                                                              # REQUIRED
       --name "an-already-imported-theme-name"                              # REQUIRED
   ```

4. Import a theme (using `--import`)

   The `--import` will import the specified theme in JSON format.

   ```bash
   theme
       --import                                                             # REQUIRED
       --theme-json '{ "name": "an-already-imported-theme-name", ... }'     # REQUIRED
   ```

   Please, see [theme-example.json](assets/theme-example.json) to find a more detailed example of a valid theme.

5. Get the current theme name (using `--current`)

   The `--current` will search for the name of the current theme.

   ```bash
   theme
       --current                                                            # REQUIRED
   ```

## ADDONS

The `addons` command is a bridge to manage addons in Term-O.

An addon is a new command added to Term-O.

| Option              | Short | Description                       |
| ------------------- | ----- | --------------------------------- |
| `--list`            | `-l`  | List all addons.                  |
| `--upload`          | `-u`  | Upload a file to add as an addon. |
| `--delete <string>` | `-d`  | Delete an addon by name.          |
| `--name`            | `-n`  | Specify the name of the addon.     |
| `--help`            | `-h`  | Show help for this command.       |

### Example

```bash
# Upload an addon (interactive file picker)
addons --upload

# List installed addons
addons --list
```

### Dependency Rules

When using `addons` command the options can express **3** possible actions:

1. Create a summary of all addons available (using `--list`)

   The `--list` will trigger a search for all addons available. Here is an example of how specific a search can be:

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
   addons
      --upload                                                             # REQUIRED
   ```

   Please, see [addon-example.json](assets/addon-example.json) to find a more detailed example of a valid addon.

## URL

The `url` command manages the URL of the current tab.

| Option                  | Short | Description                                 |
| ----------------------- | ----- | ------------------------------------------- |
| `--get <boolean>`       | `-g`  | Get property from current URL.              |
| `--set <boolean>`       | `-s`  | Set a property from current URL.            |
| `--host <boolean>`      | `-o`  | Get the current URL host.                   |
| `--pathname <boolean>`  | `-p`  | Get the current URL pathname.               |
| `--href <boolean>`      | `-H`  | Get the full current URL.                   |
| `--hash <boolean>`      | `-a`  | Get the current URL hash.                   |
| `--search <boolean>`    | `-S`  | Get the current URL search string.          |
| `--as-params <boolean>` | `-P`  | Get the current URL search/hash parameters. |
| `--tab-id <string>`     | `-i`  | Specify a Tab ID to apply the action.      |
| `--value <string>`      | `-v`  | Specify the value.                           |
| `--param <array>`       | `-r`  | Specify a parameter key/value pair.          |
| `--help`                | `-h`  | Show help for this command.                 |

### Example

```bash
# Get the full href of the current tab
url --get --href

# Set the current tab URL
url --set --search --as-params --param ["ref" "123"]
url --set --search --value "ref=123"
url --set --href --value "https://www.example.com"
```

### Dependency Rules

When using `url` command the options can express **2** possible actions:

1. Get an URL attribute (using `--get`)

   ```bash
   url
       --get                                                                # REQUIRED
       --host                                                               # -
       --pathname                                                           # |
       --href                                                               # | ONE REQUIRED
       --search                                                             # |
       --hash                                                               # -
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

2. Set an URL attribute (using `--set`)

   ```bash
   url
       --set                                                                # REQUIRED
       --host                                                               # -
       --pathname                                                           # |
       --href                                                               # | ONE REQUIRED
       --search                                                             # |
       --hash                                                               # -
       --value "test"                                                       # -
       --as-params                                                          # | ONE REQUIRED
       --param ["key" "value"]                                              # -
       --tab-id "T00000000"                                                 # OPTIONAL
   ```

## CLEAR

Interact with the clean up of the UI terminal.

This command does not expect any option; its only purpose is to clear the terminal when called.

### Example

```bash
# Clear the terminal
clear
```

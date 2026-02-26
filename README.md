# TERM-O

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="src/tutorial/illustration.png">
  <source media="(prefers-color-scheme: light)" srcset="src/tutorial/illustration.png">
  <img src="src/tutorial/illustration.png" alt="Project illustration">
</picture>

## Introduction

Term-O is a Browser Extension developer tool for interacting with browser APIs using terminal-style UI.

## Installation

Clone the repo:

```
git clone git@github.com:luis-olmedo-me/term-o.git term-o
```

Open the downloaded folder:

```
cd term-o
```

Install dependencies:

```
yarn install
```

## Usage

To run a development server that will watch for file changes and rebuild the scripts, run:

```
yarn start
```

To just build the files without the development server:

```
yarn build-prod
```

Both commands will create a `build/` directory, it will contain the built files that should be loaded into the browser or packed.

Then, type `alt + t`:

![Developer Mode Checkbox](src/tutorial/usage.png)

## Load into Chrome

To load the built files into Chrome, open [chrome://extensions/](chrome://extensions/).

Enable "Developer mode" if it's not enabled yet:

![Developer Mode Checkbox](src/tutorial/install-step-1.png)

Click on "Load unpacked":

![Load Unpacked Button](src/tutorial/install-step-2.png)

Find the `build/` directory on your system and open it.

The extension should be now at the top of the page:

![Extension Loaded](src/tutorial/install-step-3.png)

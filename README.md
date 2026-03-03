# TERM-O

<picture>
  <img src="docs/assets/illustration.png" alt="Project illustration">
</picture>

## Introduction

Term-O is a Browser Extension developer tool for interacting with browser APIs using terminal-style UI.

This documentation only explains how to test Term-O locally. Please review [Term-O Basics](docs/BASICS.md) for more details.

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

> [!IMPORTANT]
> If you do not know how to load a Chrome Extension. Please see [Load into Chrome](#load-into-chrome).

Then, type `alt + t`:

![Developer Mode Checkbox](docs/assets/usage.png)
Please review [Term-O Basics](docs/BASICS.md) for more details.

## Load into Chrome

To load the built files into Chrome, open [chrome://extensions/](chrome://extensions/).

1. Enable "Developer mode" if it's not enabled yet:

   ![Developer Mode Checkbox](docs/assets/install-step-1.png)

2. Click on "Load unpacked":

   ![Load Unpacked Button](docs/assets/install-step-2.png)

3. Find the `build/` directory on your system and open it. A notification should appear with the label of "Extension Loaded":

   ![Extension Loaded](docs/assets/install-step-3.png)

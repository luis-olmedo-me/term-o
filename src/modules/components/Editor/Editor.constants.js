import { commander } from 'libs/commander'

const getJSONTheme = theme => [
  {
    pattern: /""/g,
    style: { color: theme.green[700] }
  },
  {
    pattern: /"[^"]+"/g,
    style: { color: theme.green[700] }
  },
  {
    pattern: /\[/g,
    style: { color: theme.blue[900] }
  },
  {
    pattern: /\]/g,
    style: { color: theme.blue[900] }
  },
  {
    pattern: /\{/g,
    style: { color: theme.blue[900] }
  },
  {
    pattern: /\}/g,
    style: { color: theme.blue[900] }
  },
  {
    pattern: /false|true/g,
    style: { color: theme.cyan[800] }
  },
  {
    pattern: /\d+/g,
    style: { color: theme.purple[800] }
  },
  {
    pattern: /:/g,
    style: { color: theme.cyan[700] }
  }
]

const getBashTheme = theme => [
  {
    pattern: /""/g,
    style: { color: theme.green[700] }
  },
  {
    pattern: /"[^"]+"/g,
    style: { color: theme.green[700] }
  },
  {
    pattern: /http:\S+|https:\S+/g,
    style: { color: theme.blue[800] }
  },
  {
    pattern: /--[^\s]+|-[^\s]+/g,
    style: { color: theme.yellow[800] }
  },
  {
    pattern: new RegExp(commander.commandNames.map(key => `\\b${key}\\b`).join('|'), 'g'),
    style: { color: theme.purple[800] }
  },
  {
    pattern: new RegExp(commander.aliasNames.map(alias => `\\b${alias}\\b`).join('|'), 'g'),
    style: { color: theme.pink[800] }
  },
  {
    pattern: /\b(&{2,3}|[|])\b/g,
    style: { color: theme.purple[900] }
  },
  {
    pattern: /[$]\d+/g,
    style: { color: theme.blue[700] }
  },
  {
    pattern: /\d+/g,
    style: { color: theme.cyan[800] }
  }
]

export const languages = {
  JSON: getJSONTheme,
  BASH: getBashTheme
}

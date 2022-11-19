import { commander } from 'libs/commander'

const getJSONTheme = theme => [
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

const getTERMOTheme = theme => [
  {
    pattern: /"[^"]+"/g,
    style: { color: theme.green[700] }
  },
  {
    pattern: /--[^\s]|-[^\s]/g,
    style: { color: theme.yellow[800] }
  },
  {
    pattern: new RegExp(`${commander.commandNames.join('|')}|&{2,3}|[|]`, 'g'),
    style: { color: theme.purple[800] }
  }
]

export const languages = {
  JSON: getJSONTheme,
  TERMO: getTERMOTheme
}

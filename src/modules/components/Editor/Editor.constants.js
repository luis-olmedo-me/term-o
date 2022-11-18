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

export const languages = {
  JSON: getJSONTheme
}

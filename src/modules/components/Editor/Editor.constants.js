const getJSONTheme = theme => [
  {
    pattern: /\[/g,
    style: { color: theme.blue[900], fontWeight: 'bold' }
  },
  {
    pattern: /\]/g,
    style: { color: theme.blue[900], fontWeight: 'bold' }
  },
  {
    pattern: /\{/g,
    style: { color: theme.blue[900], fontWeight: 'bold' }
  },
  {
    pattern: /\}/g,
    style: { color: theme.blue[900], fontWeight: 'bold' }
  },
  {
    pattern: /"[^"]+"/g,
    style: { color: theme.green[700], fontWeight: 'bold' }
  },
  {
    pattern: /\d+/g,
    style: { color: theme.purple[800], fontWeight: 'bold' }
  },
  {
    pattern: /:/g,
    style: { color: theme.cyan[700], fontWeight: 'bold' }
  }
]

export const languages = {
  JSON: getJSONTheme
}

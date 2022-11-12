export const theme = pathsString => props => {
  const paths = pathsString.split('.')

  return paths.reduce((theme, path) => theme[path], props.theme)
}

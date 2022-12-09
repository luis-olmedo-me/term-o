export const searchIn = (reference, pathsString) => {
  const paths = pathsString.split('.')

  return paths.reduce((result, path) => result[path], reference)
}

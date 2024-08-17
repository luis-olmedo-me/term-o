export const executeCode = async (resolve, data) => {
  const { scriptContent } = data
  console.log('💬  scriptContent:', scriptContent)

  resolve({ updates: ['test'] })
}

export const executeCode = async (resolve, data) => {
  const { scriptContent } = data
  console.log('💬  scriptContent:', scriptContent)
  console.log('💬  data:', data)

  resolve({ updates: ['test'] })
}

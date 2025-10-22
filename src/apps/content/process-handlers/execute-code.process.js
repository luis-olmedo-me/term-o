export default async (resolve, data) => {
  const { script } = data
  console.log('💬 ~ script:', script)

  resolve()
}

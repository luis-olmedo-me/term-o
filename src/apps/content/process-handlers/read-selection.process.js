export default async resolve => {
  const selection = document.getSelection().toString()

  resolve(selection)
}

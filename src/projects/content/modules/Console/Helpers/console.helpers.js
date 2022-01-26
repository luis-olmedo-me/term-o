export const buildProps = ({ _: values = [], ...props }) => {
  return {
    values: values.splice(1),
    ...props
  }
}

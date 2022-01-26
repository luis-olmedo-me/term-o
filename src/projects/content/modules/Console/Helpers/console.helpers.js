export const buildProps = ({ _, ...props }) => {
  return {
    values: _,
    ...props
  }
}

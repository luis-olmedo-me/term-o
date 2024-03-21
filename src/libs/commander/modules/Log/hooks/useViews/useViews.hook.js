import { useState } from 'preact/hooks'

export const useViews = ({ views, defaultView }) => {
  const [itemInView, setItemInView] = useState(defaultView)

  const viewActions = views.map(view => {
    return {
      id: `head-to-${view.id}`,
      text: view.text,
      onClick: () => setItemInView(view.id)
    }
  })

  return { itemInView, changeView: setItemInView, viewActions }
}

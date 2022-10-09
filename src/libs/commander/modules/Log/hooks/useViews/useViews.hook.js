import { useState } from 'react'

export const useViews = ({ views, defaultView }) => {
  const [itemInView, setItemInView] = useState(defaultView)

  const actions = views.map((view) => {
    return {
      id: `head-to-${view.id}`,
      text: view.text,
      onClick: () => setItemInView(view.id)
    }
  })

  return { itemInView, changeView: setItemInView, actions }
}

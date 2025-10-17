function listCSS(element) {
  const result = []

  // Inline styles
  if (element.style && element.getAttribute('style')) {
    result.push([
      'inline-style',
      ...Array.from(element.style).map(prop => `${prop}: ${element.style.getPropertyValue(prop)};`)
    ])
  }

  // Recorre todas las hojas de estilo
  for (const sheet of document.styleSheets) {
    let rules
    try {
      rules = sheet.cssRules
    } catch (err) {
      // Algunos styles (CORS, etc.) no se pueden leer
      continue
    }

    for (const rule of rules) {
      if (rule instanceof CSSStyleRule && element.matches(rule.selectorText)) {
        const styles = rule.style
        const declarations = Array.from(styles).map(
          prop => `${prop}: ${styles.getPropertyValue(prop)};`
        )

        result.push([rule.selectorText, ...declarations])
      }
    }
  }

  return result
}

export default async resolve => {
  const css = listCSS(document.body)
  console.log('💬 ~ css:', css)
  resolve()
}

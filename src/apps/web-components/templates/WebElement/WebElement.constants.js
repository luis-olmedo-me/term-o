import webElementCss from './WebElement.raw.css?raw'

export const baseSheet = new CSSStyleSheet()
baseSheet.replaceSync(webElementCss)

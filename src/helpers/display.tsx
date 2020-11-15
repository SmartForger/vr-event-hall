export const withCountDisplay = ({ items, maxDisplayed = 9, showZero = false }) => {
  if (Array.isArray(items)) {
    if (items.length > maxDisplayed) {
      return `(${maxDisplayed}+)`
    } else if (items.length > (showZero ? -1 : 0)) {
      return `(${items.length})`
    }
  }
  return null
}

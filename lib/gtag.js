export const GA_ID = "UA-198566576-2"

export const existsGaId = GA_ID !== ''

export const pageview = (path) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

export const event = ({action, category, label, value = ''}) => {
  if (!existsGaId) {
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  })
}
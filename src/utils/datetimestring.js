export default (timestamp, locale = "en-US") => new Date(timestamp * 1000).toLocaleString(locale)

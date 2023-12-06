export const formatDate = (date: Date) => {
  const currentDate = new Date()
  const targetDate = new Date(date)

  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (daysAgo > 0) {
    formattedDate = targetDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${formattedDate}, ${fullDate}`
}

export function dateFormatter(dateString: string): string {
  if (!dateString) return ''

  const date = new Date(dateString)

  if (isNaN(date.getTime())) return 'Invalid Date'

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function calculateAge(birthdateStr: string): number {
  const [month, day, year] = birthdateStr.split('/').map(Number)
  const birthdate = new Date(year, month - 1, day)
  const today = new Date()

  let age = today.getFullYear() - birthdate.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate())

  if (!hasHadBirthdayThisYear) {
    age--
  }

  return age
}

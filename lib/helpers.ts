import type { MouseEvent } from 'react'

export const handleNavClick = (event: MouseEvent<HTMLAnchorElement>) => {
  const href = event.currentTarget.getAttribute('href')
  if (!href) return

  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) return

  const hash = href.slice(hashIndex)
  const id = hash.replace('#', '')
  if (!id) return

  const target = document.getElementById(id)
  if (!target) return

  event.preventDefault()

  const headerOffset = 80
  const elementPosition = target.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - headerOffset

  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })

  if (history.pushState) {
    history.pushState(null, '', hash)
  } else {
    window.location.hash = hash
  }
}

export const getStatusLabel = (status: string) => {
  const s = status.toLowerCase()
  if (s === 'checked_in') return 'Selesai'
  if (s === 'cancelled') return 'Dibatalkan'
  return status.replace('_', ' ')
}
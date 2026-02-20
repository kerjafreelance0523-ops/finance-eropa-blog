'use client'

export default function CookiePreferencesButton() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('show-cookie-settings'))
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label="Update cookie preferences"
    >
      Update preferences
    </button>
  )
}

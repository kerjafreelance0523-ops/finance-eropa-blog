'use client'

export default function CookiePreferencesButton() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('show-cookie-settings'))
  }

  return (
    <button
      onClick={handleClick}
      className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
      aria-label="Update cookie preferences"
    >
      Update preferences
    </button>
  )
}

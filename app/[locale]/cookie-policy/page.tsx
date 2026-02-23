import SectionContainer from '@/components/SectionContainer'
import { genPageMetadata } from '../../seo'
import CookiePreferencesButton from '@/components/CookiePreferencesButton'

export const metadata = genPageMetadata({
  title: 'Cookie Policy',
  description:
    'Cookie Policy for EuroCoinInvest - Learn about how we use cookies and manage your preferences.',
})

export default function CookiePolicyPage() {
  return (
    <SectionContainer>
      <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        <h1 className="text-primary-900 mb-8 font-serif text-4xl font-bold dark:text-white">
          Cookie Policy
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: February 2026</p>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            What Are Cookies?
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Cookies are small text files that are placed on your device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to
            the website owners. Cookies allow websites to remember your preferences, analyze how you
            use the site, and deliver personalized content and advertisements.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            How We Use Cookies
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We use cookies and similar technologies for the following purposes:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Strictly Necessary Cookies:</strong> These cookies are essential for the
              website to function properly. They enable basic functions like page navigation and
              access to secure areas. The website cannot function properly without these cookies.
            </li>
            <li>
              <strong>Preference Cookies:</strong> These cookies remember your choices (such as
              language preferences or cookie consent) to provide a more personalized experience.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These cookies help us understand how visitors
              interact with our website by collecting and reporting information anonymously. This
              helps us improve our content and user experience.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> These cookies are used to deliver advertisements
              that are relevant to you and your interests. They also help measure the effectiveness
              of advertising campaigns. We use Google AdSense, which may set cookies to show you
              personalized ads based on your browsing behavior.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Cookies We Use
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Below is a list of the main cookies used on our website:
          </p>
          <div className="mb-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-300">
                    Cookie Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-300">
                    Purpose
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-300">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                <tr>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                    cookie_consent
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Stores your cookie consent preference (accept/reject)
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">1 year</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                    Google AdSense cookies
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Used by Google AdSense to deliver personalized advertisements and measure ad
                    performance. Includes cookies like __gads, __gpi, and others.
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    Varies (see{' '}
                    <a
                      href="https://policies.google.com/technologies/cookies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Google's Cookie Policy
                    </a>
                    )
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Managing Your Cookie Preferences
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            You can manage your cookie preferences at any time. When you first visit our website,
            you will see a cookie consent banner where you can choose to accept or reject
            non-essential cookies. You can change your preferences at any time by:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Clicking the "Cookie Settings" link in the footer of any page</li>
            <li>Using the "Update preferences" button below on this page</li>
            <li>Clearing your browser cookies and revisiting the site</li>
          </ul>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Please note that if you reject non-essential cookies, you may still see advertisements,
            but they will be less relevant to your interests. Some website features may also be
            limited.
          </p>
          <div className="my-6">
            <CookiePreferencesButton />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Third-Party Cookies
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Some cookies on our website are set by third-party services, such as Google AdSense.
            These third parties may use cookies to collect information about your online activities
            across different websites. We do not control these third-party cookies. For more
            information about how Google uses cookies, please visit{' '}
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Google's Cookie Policy
            </a>
            .
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Browser Settings
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Most web browsers allow you to control cookies through their settings. You can set your
            browser to refuse cookies or alert you when cookies are being sent. However, if you
            disable cookies, some parts of our website may not function properly. For more
            information about managing cookies in your browser, please visit:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Changes to This Policy
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We may update this cookie policy from time to time to reflect changes in our practices
            or for other operational, legal, or regulatory reasons. We will notify you of any
            material changes by posting the new policy on this page and updating the "Last updated"
            date.
          </p>
        </section>
      </div>
    </SectionContainer>
  )
}

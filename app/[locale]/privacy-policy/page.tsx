import SectionContainer from '@/components/SectionContainer'
import { genPageMetadata } from '../../seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for WealthEuro - Learn how we collect, use, and protect your personal data.',
})

export default function PrivacyPolicyPage() {
  return (
    <SectionContainer>
      <div className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
        <h1 className="mb-8 font-serif text-4xl font-bold text-primary-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Last updated: February 2026
        </p>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Data Controller
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            This website ({siteMetadata.siteUrl}) is operated by {siteMetadata.headerTitle}. We are
            the data controller responsible for your personal data. If you have any questions about
            this privacy policy or our data practices, please contact us at{' '}
            <a
              href={`mailto:${siteMetadata.email}`}
              className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {siteMetadata.email}
            </a>
            .
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Information We Collect
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We collect information that you provide directly to us and information that is
            automatically collected when you visit our website:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Usage Data:</strong> We collect information about how you interact with our
              website, including pages visited, time spent on pages, and referring websites.
            </li>
            <li>
              <strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your
              experience, analyze site traffic, and deliver personalized advertising. For more
              details, please see our{' '}
              <a
                href="/cookie-policy"
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Cookie Policy
              </a>
              .
            </li>
            <li>
              <strong>Advertising Data:</strong> When you visit our site, Google AdSense may
              collect information about your browsing behavior to show you relevant advertisements.
              This includes data such as your IP address, browser type, and pages you visit.
            </li>
            <li>
              <strong>Analytics Data:</strong> We may use analytics services to understand how
              visitors use our site, which helps us improve our content and user experience.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Legal Basis for Processing
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We process your personal data based on the following legal grounds:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Consent:</strong> When you accept cookies, you consent to the processing of
              your data for advertising and analytics purposes.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> We process data to improve our website,
              analyze usage patterns, and ensure website security.
            </li>
            <li>
              <strong>Legal Obligations:</strong> We may process data to comply with applicable
              laws and regulations.
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Your Rights
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Under the General Data Protection Regulation (GDPR) and other applicable data
            protection laws, you have the following rights:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Right of Access:</strong> You can request a copy of the personal data we hold
              about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You can request that we correct any
              inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You can request that we delete your personal data
              in certain circumstances.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> You can request that we limit how we
              use your data.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> You can request a copy of your data in a
              structured, machine-readable format.
            </li>
            <li>
              <strong>Right to Object:</strong> You can object to processing based on legitimate
              interests or for direct marketing purposes.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> If processing is based on consent, you
              can withdraw it at any time by updating your cookie preferences.
            </li>
            <li>
              <strong>Right to Complain:</strong> You have the right to lodge a complaint with
              your local data protection supervisory authority.
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            To exercise any of these rights, please contact us at{' '}
            <a
              href={`mailto:${siteMetadata.email}`}
              className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {siteMetadata.email}
            </a>
            .
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Data Sharing and Third Parties
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We share your data with the following third parties:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Google AdSense:</strong> We use Google AdSense to display advertisements on
              our website. Google may collect and process data about your visits to this and other
              websites to provide personalized ads. You can learn more about how Google uses data
              at{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Google's Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Analytics Providers:</strong> We may use analytics services to understand
              website usage and improve our content.
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We do not sell your personal data to third parties. We only share data as described in
            this policy or as required by law.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Data Retention
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We retain your personal data only for as long as necessary to fulfill the purposes
            outlined in this privacy policy, unless a longer retention period is required or
            permitted by law. Cookie data is typically retained according to the cookie's expiration
            date, which is usually up to one year for consent cookies.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            International Data Transfers
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Some of our service providers, including Google AdSense, may be located outside the
            European Economic Area (EEA). When we transfer data to these providers, we ensure
            appropriate safeguards are in place, such as standard contractual clauses or adequacy
            decisions by the European Commission.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Security
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We implement appropriate technical and organizational measures to protect your personal
            data against unauthorized access, alteration, disclosure, or destruction. However, no
            method of transmission over the Internet is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Changes to This Policy
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We may update this privacy policy from time to time. We will notify you of any material
            changes by posting the new policy on this page and updating the "Last updated" date. We
            encourage you to review this policy periodically.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-primary-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            If you have any questions, concerns, or requests regarding this privacy policy or our
            data practices, please contact us at:{' '}
            <a
              href={`mailto:${siteMetadata.email}`}
              className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {siteMetadata.email}
            </a>
            .
          </p>
        </section>
      </div>
    </SectionContainer>
  )
}

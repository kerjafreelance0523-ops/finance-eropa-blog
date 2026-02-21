import SectionContainer from '@/components/SectionContainer'
import { genPageMetadata } from '../../seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: 'Terms of Service',
  description:
    'Terms of Service for WealthEuro - Read our terms and conditions for using our website.',
})

export default function TermsOfServicePage() {
  return (
    <SectionContainer>
      <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        <h1 className="text-primary-900 mb-8 font-serif text-4xl font-bold dark:text-white">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: February 2026</p>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Acceptance of Terms
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            By accessing and using {siteMetadata.siteUrl} (the "Website"), you accept and agree to
            be bound by these Terms of Service. If you do not agree to these terms, please do not
            use our Website.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Use of the Website
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            You may use our Website for lawful purposes only. You agree not to:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use the Website in any way that violates any applicable law or regulation</li>
            <li>Transmit any malicious code, viruses, or harmful materials through the Website</li>
            <li>Attempt to gain unauthorized access to any part of the Website</li>
            <li>Interfere with or disrupt the Website or servers connected to the Website</li>
            <li>
              Use automated systems or software to extract data from the Website without our express
              written permission
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Content and Intellectual Property
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            All content on this Website, including articles, images, graphics, logos, and software,
            is the property of {siteMetadata.headerTitle} or its content suppliers and is protected
            by copyright, trademark, and other intellectual property laws. You may not reproduce,
            distribute, modify, or create derivative works from any content without our express
            written permission.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            You may view and download content for your personal, non-commercial use only, provided
            you retain all copyright and other proprietary notices contained in the original
            content.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Disclaimer of Warranties
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            The content on this Website is provided for informational purposes only. We make no
            representations or warranties of any kind, express or implied, about:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              The completeness, accuracy, reliability, or suitability of the information on the
              Website
            </li>
            <li>The availability, functionality, or uninterrupted access to the Website</li>
            <li>That the Website will be free from errors, viruses, or other harmful components</li>
          </ul>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            <strong>Important:</strong> Content on this site is for information only and is not
            investment or financial advice. Past performance and analysis do not guarantee future
            results. You should consult with qualified financial advisors before making any
            investment decisions.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Limitation of Liability
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            To the fullest extent permitted by law, {siteMetadata.headerTitle} and its officers,
            directors, employees, and agents shall not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages arising out of or relating to
            your use of the Website, including but not limited to:
          </p>
          <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Loss of profits, data, or other intangible losses</li>
            <li>Errors or omissions in the content</li>
            <li>Any investment decisions made based on information from the Website</li>
            <li>Interruption or cessation of the Website</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Third-Party Links and Services
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Our Website may contain links to third-party websites or services that are not owned or
            controlled by us. We have no control over, and assume no responsibility for, the
            content, privacy policies, or practices of any third-party websites or services. You
            acknowledge and agree that we shall not be responsible or liable for any damage or loss
            caused by or in connection with the use of any third-party content, goods, or services.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Modifications to the Website
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We reserve the right to modify, suspend, or discontinue any aspect of the Website at any
            time, with or without notice. We shall not be liable to you or any third party for any
            modification, suspension, or discontinuance of the Website.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Changes to Terms
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We reserve the right to modify these Terms of Service at any time. We will notify you of
            any material changes by posting the new terms on this page and updating the "Last
            updated" date. Your continued use of the Website after such changes constitutes your
            acceptance of the new terms.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Governing Law
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            These Terms of Service shall be governed by and construed in accordance with the laws
            applicable in the European Union, without regard to its conflict of law provisions. Any
            disputes arising out of or relating to these terms shall be subject to the exclusive
            jurisdiction of the courts of the European Union.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-primary-900 mb-4 font-serif text-2xl font-semibold dark:text-white">
            Contact Information
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            If you have any questions about these Terms of Service, please contact us at:{' '}
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

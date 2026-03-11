import ReachOutSection from "@/app/components/ReachOutSection";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white/95">
      {/* Page Header - Deep Purple → Royal Blue gradient */}
      <div className="py-6" style={{ background: "linear-gradient(135deg, #4B0082 0%, #1F3C88 100%)" }}>
        <div className="mx-auto max-w-7xl w-full px-4">
          <h1 className="text-3xl md:text-4xl text-white text-center font-alice">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white py-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-bottom-left bg-no-repeat opacity-100"
          style={{
            backgroundImage: "url('/images/innerbg.jpg')",
            backgroundPosition: "left center",
          }}
        />

        <div className="relative mx-auto max-w-4xl w-full px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-8">
            {/* Header Info */}
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm text-gray-600">
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.sl-nstranscripts.ca/"
                  className="text-[#1F3C88] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.sl-nstranscripts.ca/
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Last Updated:</strong> December 12, 2025
              </p>
            </div>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none text-black leading-relaxed">
              <p>
                This Privacy Policy describes how SL-NS Transcripts (the
                &quot;Site,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) collects, uses, processes, and protects the
                personal information you provide when using our transcription
                services and website (collectively, the &quot;Services&quot;).
                We are committed to protecting your privacy in compliance with
                applicable Canadian privacy laws, including the Personal
                Information Protection and Electronic Documents Act (PIPEDA).
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F3C88]">
                1. Accountability and Scope (PIPEDA Principle 1)
              </h2>
              <div className="prose prose-lg max-w-none text-black leading-relaxed space-y-3">
                <p>
                  SL-NS Transcripts is responsible for the personal information
                  under its control, including information transferred to third
                  parties for processing (such as Microsoft Azure).
                </p>
                <p>
                  <strong>Privacy Officer:</strong> Steora has appointed a
                  Privacy Officer accountable for compliance with this policy.
                </p>
                <p>
                  <strong>Contact:</strong> Please see &quot;Contact Us&quot;
                  contact details.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F3C88]">
                2. Information We Collect
              </h2>
              <div className="prose prose-lg max-w-none text-black leading-relaxed space-y-4">
                <p className="font-semibold">
                  A. Personal Information You Directly Provide
                </p>
                <p className="text-sm text-gray-600 italic">
                  (PIPEDA Principles 2 & 4: Identifying Purposes and Limiting
                  Collection)
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Contact & Account Data:</strong> Name, email
                    address, telephone number, and payment/billing address (if
                    applicable).
                  </li>
                  <li>
                    <strong>Customer Content:</strong> The audio or video files
                    you upload and the resulting text transcripts. This is
                    considered highly sensitive data.
                  </li>
                  <li>
                    <strong>Correspondence:</strong> Information contained in
                    communications with us, such as support tickets or email
                    exchanges.
                  </li>
                </ul>
                <p className="font-semibold mt-4">
                  B. Technical and Usage Data Collected Automatically
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Log Data:</strong> IP address, browser type,
                    operating system, pages viewed, and access times.
                  </li>
                  <li>
                    <strong>Cookies:</strong> Small data files placed on your
                    device to maintain session integrity, remember your
                    preferences, and analyze site traffic.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F3C88]">
                3. How We Use Your Information (Identifying Purposes)
              </h2>
              <p className="text-sm text-gray-600 italic">
                (PIPEDA Principle 2: Identifying Purposes)
              </p>
              <div className="prose prose-lg max-w-none text-black leading-relaxed">
                <p>
                  We use the collected information only for the following
                  purposes:
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border-collapse border border-[#1F2937]/20">
                    <thead>
                      <tr className="bg-[#F9FAFB]">
                        <th className="border border-[#1F2937]/20 px-4 py-2 text-left">
                          Category
                        </th>
                        <th className="border border-[#1F2937]/20 px-4 py-2 text-left">
                          Purpose
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-[#1F2937]/20 px-4 py-2 font-semibold">
                          Service Delivery
                        </td>
                        <td className="border border-[#1F2937]/20 px-4 py-2">
                          To process your uploaded files, generate transcripts,
                          manage your account, and fulfil your transcription
                          orders.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-[#1F2937]/20 px-4 py-2 font-semibold">
                          Security & Auditing
                        </td>
                        <td className="border border-[#1F2937]/20 px-4 py-2">
                          To detect and prevent fraud, protect the integrity of
                          our systems, and comply with legal or governmental
                          requests.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-[#1F2937]/20 px-4 py-2 font-semibold">
                          Communication
                        </td>
                        <td className="border border-[#1F2937]/20 px-4 py-2">
                          To provide support, send service updates, and notify
                          you of changes to our policies.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-[#1F2937]/20 px-4 py-2 font-semibold">
                          Improvement
                        </td>
                        <td className="border border-[#1F2937]/20 px-4 py-2">
                          To analyse Service usage, fix errors, and improve the
                          speed and accuracy of our transcription platform.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F3C88]">
                4. Consent (PIPEDA Principle 3)
              </h2>
              <div className="prose prose-lg max-w-none text-black leading-relaxed space-y-3">
                <p>
                  We collect, use, and disclose your personal information only
                  with your knowledge and meaningful consent, except where
                  legally required or permitted without consent.
                </p>
                <p>
                  <strong>Meaningful Consent:</strong> By registering for an
                  account, uploading files, or submitting information via a
                  form, you are providing your express consent to the
                  collection, use, and disclosure of your personal information
                  as outlined in this policy.
                </p>
                <p>
                  <strong>Withdrawal of Consent:</strong> You may withdraw your
                  consent at any time, subject to legal or contractual
                  restrictions, by contacting us. Withdrawing consent may limit
                  our ability to provide you with certain Services.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F3C88]">
                5. Disclosure to Third Parties and Use of Processors
              </h2>
              <p className="text-sm text-gray-600 italic">
                (PIPEDA Principle 5: Limiting Use and Disclosure)
              </p>
              <div className="prose prose-lg max-w-none text-black leading-relaxed space-y-4">
                <p>
                  We use trusted third-party service providers to support our
                  operations. These providers are bound by contractual
                  obligations to protect your personal information and limit its
                  use to the purposes specified by us.
                </p>
                <p className="font-semibold">
                  A. Microsoft Azure Disclosure (Cloud Computing and Storage)
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Data Hosting and Processing:</strong> We rely on
                    Microsoft Azure to host our website, manage application
                    infrastructure, and securely store and process your Customer
                    Content (files and transcripts).
                  </li>
                  <li>
                    <strong>Microsoft&apos;s Role:</strong> Microsoft acts as a
                    data processor on our behalf, providing the underlying
                    computing, storage, and networking resources.
                  </li>
                  <li>
                    <strong>Security and Location:</strong> We select the Azure
                    Region(s) where your data is stored (e.g., Canadian data
                    centres, if available and selected). We leverage
                    Microsoft&apos;s industry-leading security commitments to
                    safeguard your data.
                  </li>
                  <li>
                    <strong>Contractual Terms:</strong> Our relationship with
                    Microsoft is governed by the Microsoft Products and Services
                    Data Protection Addendum (&quot;DPA&quot;), which outlines
                    both our and Microsoft&apos;s obligations regarding the
                    processing and security of your data.
                  </li>
                  <li>
                    <strong>Microsoft Privacy:</strong> For more information on
                    Microsoft&apos;s own data practices, please review the{" "}
                    <a
                      href="https://privacy.microsoft.com/en-us/privacystatement"
                      className="text-[#1F3C88] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Microsoft Privacy Statement
                    </a>
                    .
                  </li>
                </ul>
                <p className="font-semibold mt-4">
                  B. Google reCAPTCHA Disclosure (Spam and Abuse Prevention)
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    We use Google reCAPTCHA on our forms (e.g., sign-up,
                    contact) to protect against bots and abuse.
                  </li>
                  <li>
                    <strong>Data Collected:</strong> The reCAPTCHA service
                    collects certain user and device information for the sole
                    purpose of determining if the user is human. This may
                    include your IP address, the date and time of the visit,
                    browser and device information, and interaction patterns
                    with the web page.
                  </li>
                  <li>
                    <strong>Purpose:</strong> The information collected is used
                    by Google to provide, maintain, and improve the reCAPTCHA
                    service and for general security purposes. The data is not
                    used by Google for personalized advertising.
                  </li>
                  <li>
                    <strong>Google&apos;s Policy:</strong> By using our
                    Services, you consent to the data collection and processing
                    by Google in accordance with the{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="text-[#1F3C88] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://policies.google.com/terms"
                      className="text-[#1F3C88] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Terms of Service
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F3C88]">
                6. Safeguards (PIPEDA Principle 7)
              </h2>
              <div className="prose prose-lg max-w-none text-black leading-relaxed space-y-3">
                <p>
                  We implement reasonable physical, organisational, and
                  technical security safeguards appropriate to the sensitivity
                  of the information.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Encryption:</strong> Customer Content is protected
                    by encryption both in transit (using SSL/TLS) and at rest
                    (storage encryption within Azure).
                  </li>
                  <li>
                    <strong>Access Control:</strong> Access to Customer Content
                    is strictly limited to authorised personnel necessary for
                    service delivery, troubleshooting, and support.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F3C88]">
                7. Individual Access and Correction
              </h2>
              <p className="text-sm text-gray-600 italic">
                (PIPEDA Principle 9: Individual Access)
              </p>
              <div className="prose prose-lg max-w-none text-black leading-relaxed space-y-3">
                <p>
                  You have the right to be informed of the existence, use, and
                  disclosure of your personal information and to challenge the
                  accuracy and completeness of that information.
                </p>
                <p>
                  <strong>Access Request:</strong> To request access to your
                  personal information, please submit a written request to us.
                  We will respond to your request within the timeframe required
                  by PIPEDA (generally 30 days) and provide the information in
                  an understandable format.
                </p>
                <p>
                  <strong>Correction:</strong> You may update or correct your
                  account information directly through your online account
                  settings, or by submitting a written request to our Privacy
                  Officer.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1F3C88]">
                8. Openness and Challenging Compliance (PIPEDA Principles 8 &
                10)
              </h2>
              <p className="text-sm text-gray-600 italic">
                (PIPEDA Principle 8: Openness and Principle 10: Challenging
                Compliance)
              </p>
              <div className="prose prose-lg max-w-none text-black leading-relaxed space-y-3">
                <p>
                  We are committed to making our privacy policies and practices
                  easily understandable and readily available. If you have any
                  questions, concerns, or wish to challenge our compliance with
                  this policy or PIPEDA, please contact:
                </p>
                <div className="bg-[#F9FAFB] p-4 rounded-lg space-y-2">
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href="https://www.sl-nstranscripts.ca/"
                      className="text-[#1F3C88] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.sl-nstranscripts.ca/
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:mgraham@actontario.ca"
                      className="text-[#1F3C88] hover:underline"
                    >
                      mgraham@actontario.ca
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <ReachOutSection />
    </div>
  );
}

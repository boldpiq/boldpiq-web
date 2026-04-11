"use client"
import { ScrollReveal } from "@/components/scroll/ScrollReveal"
import { Footer } from "@/components/layout/Footer"
import { LegalNav } from "@/components/legal/LegalNav"

const BG = "#0B0F1C"
const ACCENT = "#C4541A"
const MUTED = "rgba(255,255,255,0.45)"
const BORDER = "rgba(255,255,255,0.08)"

const H2Style = { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12, color: "#fff" }
const BodyStyle = { color: MUTED, fontSize: 15, lineHeight: 1.75, whiteSpace: "pre-line" as const }
const SectionStyle = { borderBottom: `1px solid ${BORDER}`, paddingBottom: 32 }

export default function DisclaimersPage() {
  return (
    <main style={{ background: BG, color: "#fff", minHeight: "100vh" }}>
      <section style={{ padding: "clamp(100px, 14vw, 140px) clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)", maxWidth: 860, margin: "0 auto" }}>
        <ScrollReveal effect="fade-up">
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 32 }}>
            <span style={{ width: 32, height: 1, background: ACCENT, flexShrink: 0 }} />
            <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>Legal</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: 16 }}>
            Legal<br /><span style={{ color: ACCENT }}>Disclaimers</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 13, marginBottom: 8, opacity: 0.6 }}>www.boldpiq.com/disclaimers</p>
          <p style={{ color: MUTED, fontSize: 14, marginBottom: 16 }}>Effective Date: 01 April 2026 · Last Updated: 04 April 2026</p>
          <p style={{ color: MUTED, fontSize: 14, marginBottom: 48, lineHeight: 1.65 }}>
            These disclaimers apply to all content, services, and communications provided by Cinnimon t/a BoldPiq (Reg. 2015/193038/07). By accessing our website or engaging our services, you acknowledge and accept these disclaimers.
          </p>
        </ScrollReveal>

        <LegalNav />

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          {[
            {
              title: "1. General Website Disclaimer",
              body: `The information on this website (www.boldpiq.com) is provided for general informational purposes only. BoldPiq makes no representations or warranties of any kind, express or implied, regarding the accuracy, completeness, reliability, suitability, or availability of the information, products, services, or related graphics on this website.

Any reliance you place on such information is strictly at your own risk. BoldPiq shall not be liable for any loss or damage — including, without limitation, indirect or consequential loss or damage — arising from the use of, or inability to use, this website or any information contained herein.`,
            },
            {
              title: "2. No Professional Advice",
              body: `Nothing on this website constitutes legal, financial, accounting, tax, or other professional advice. All content is provided for general informational and educational purposes only.

You should consult a qualified professional before making any business, legal, or financial decisions. BoldPiq accepts no responsibility for decisions made based on the content of this website.`,
            },
            {
              title: "3. Results Disclaimer",
              body: `Any case studies, testimonials, portfolio examples, or results mentioned on this website reflect individual outcomes and are not a guarantee of future results. Results vary based on client involvement, market conditions, industry, and other factors outside BoldPiq's control.

BoldPiq makes no representation that any client will achieve the same or similar results.`,
            },
            {
              title: "4. Third-Party Links",
              body: `This website may contain links to third-party websites, platforms, or services. These links are provided for convenience only. BoldPiq does not endorse, control, or accept responsibility for the content, privacy practices, or availability of any linked third-party website.

Access to any third-party website is entirely at your own risk. BoldPiq is not liable for any loss or damage incurred through your use of third-party services.`,
            },
            {
              title: "5. AI-Generated Content",
              body: `BoldPiq may use artificial intelligence (AI) tools to assist in content creation, drafting, research, or ideation. All AI-generated content is reviewed by a human team member before delivery; however, BoldPiq does not guarantee that AI-assisted outputs are free from errors, omissions, or inaccuracies.

Clients should review all deliverables and confirm accuracy before publication or use. BoldPiq accepts no liability for errors in AI-assisted content that has not been reviewed by the client.`,
            },
            {
              title: "6. Third-Party Tools & Platform Disclaimers",
              body: `BoldPiq's services may rely on or integrate third-party platforms and tools, including but not limited to GoHighLevel, Cloudflare, Hostinger, Google Workspace, OpenAI, and others. BoldPiq is not responsible for:

· Downtime, outages, or service interruptions caused by third-party platforms
· Changes to third-party pricing, terms, or features
· Data loss or breaches occurring within third-party systems
· Any actions or omissions by third-party providers

Clients are encouraged to review the terms and privacy policies of all third-party tools used in their projects.`,
            },
            {
              title: "7. BoldPiq Technology Stack",
              body: `The website will be built using BoldPiq's proprietary baseline stack (the "Stack"), as documented at www.boldpiq.com and in the applicable project specification. The Stack includes specific security configurations, AI crawler access protocols, IndexNow automation, server-side rendering setup, performance optimisations, and related technical best practices as implemented at the Go-Live date.

BoldPiq continually refines its Stack across new and existing projects. The version deployed for a specific client reflects the standards current at the time of that project's Go-Live. BoldPiq makes no warranty that the Stack deployed in any project will remain compliant with future third-party platform requirements, evolving security standards, or updated AI search protocols after the Go-Live date, except under a separate Maintenance & Support Agreement.`,
            },
            {
              title: "8. Post-Launch Maintenance and Liability",
              body: `After the official Go-Live / handover date, BoldPiq is not automatically responsible for applying updates to third-party services, frameworks (including but not limited to Next.js, Sanity CMS, and Vercel), security patches, or evolving industry best practices, unless a separate Maintenance & Support Agreement is in place.

BoldPiq will not be liable for any issues, vulnerabilities, performance degradation, or loss arising from:

· Missed updates to third-party frameworks or services
· Changes in external platform behaviour, APIs, or policies
· New security threats or exploits emerging after Go-Live
· Evolution of SEO, GEO, or AI search standards after Go-Live
· Any combination of the above

This limitation applies except where such issues result directly from BoldPiq's gross negligence or willful misconduct occurring before the Go-Live date.

Any ongoing updates, monitoring, security hardening, or performance optimisation are provided exclusively under a separate paid Maintenance Plan. Clients are encouraged to enquire about BoldPiq's Maintenance & Support packages at support@boldpiq.com.`,
            },
            {
              title: "9. Intellectual Property",
              body: `All content on this website — including but not limited to text, graphics, logos, images, and code — is the property of BoldPiq or its licensors, unless otherwise stated. Unauthorised reproduction, distribution, or commercial use of any content without prior written permission from BoldPiq is strictly prohibited.

Client-owned deliverables are subject to the intellectual property terms outlined in the applicable Statement of Work or Terms of Service.`,
            },
            {
              title: "10. Limitation of Liability",
              body: `To the fullest extent permitted by South African law (including the Consumer Protection Act 68 of 2008 and the Electronic Communications and Transactions Act 25 of 2002), BoldPiq's total cumulative liability to any client or website visitor under any Agreement shall not exceed the total fees paid by that client in the twelve (12) months immediately preceding the event giving rise to the claim. This limitation applies regardless of the form of action, whether in contract, delict, or otherwise.

BoldPiq shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of revenue, loss of data, loss of goodwill, or business interruption, even if advised of the possibility of such damages.`,
            },
            {
              title: "11. Jurisdiction",
              body: `These disclaimers are governed by the laws of the Republic of South Africa. Any disputes arising from or relating to these disclaimers shall be subject to the jurisdiction of the courts of South Africa, without regard to conflict of law principles.`,
            },
            {
              title: "12. Changes to This Page",
              body: `BoldPiq reserves the right to update or amend these disclaimers at any time without prior notice. Continued use of the website or our services following any changes constitutes acceptance of the revised disclaimers. The "Last Updated" date at the top of this page reflects the most recent revision.`,
            },
            {
              title: "13. Contact",
              body: `If you have questions about these disclaimers, please contact us:

BoldPiq (Cinnimon t/a BoldPiq, Reg. 2015/193038/07)
Email: support@boldpiq.com
Website: www.boldpiq.com`,
            },
          ].map(({ title, body }) => (
            <div key={title} style={SectionStyle}>
              <h2 style={H2Style}>{title}</h2>
              <p style={BodyStyle}>{body}</p>
            </div>
          ))}

        </div>
      </section>
      <Footer />
    </main>
  )
}

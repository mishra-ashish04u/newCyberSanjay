"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CancellationRefundPolicyPage() {
  return (
    <>
      <Header />

      <main className="bg-yellow-50 min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white border border-yellow-200 rounded-2xl shadow-lg p-8 md:p-12 space-y-6">

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Cancellation & Refund Policy
              </h1>
              <p className="text-sm text-slate-500">
                Last updated on 10-01-2026 14:59:24
              </p>
            </div>

            {/* Intro */}
            <p className="text-slate-700 leading-relaxed">
              <strong>Cyber Sanjay</strong> believes in helping its customers as far
              as possible, and has therefore a liberal cancellation policy. Under
              this policy, the following terms apply:
            </p>

            {/* Policy Points */}
            <section className="space-y-4 text-slate-700 leading-relaxed">
              <ul className="list-disc pl-6 space-y-3">

                <li>
                  Cancellations will be considered only if the request is made
                  immediately after placing the order. However, the cancellation
                  request may not be entertained if the orders have been
                  communicated to the vendors/merchants and they have initiated
                  the process of shipping them.
                </li>

                <li>
                  Cyber Sanjay does not accept cancellation requests for
                  perishable items like flowers, eatables, etc. However,
                  refund or replacement can be made if the customer establishes
                  that the quality of product delivered is not good.
                </li>

                <li>
                  In case of receipt of damaged or defective items, please report
                  the same to our Customer Service team. The request will be
                  entertained once the merchant has checked and determined the
                  same at their own end. This should be reported within the same
                  day of receipt of the products.
                </li>

                <li>
                  If you feel that the product received is not as shown on the
                  site or does not meet your expectations, you must bring it to
                  the notice of our Customer Service team within the same day of
                  receiving the product. After reviewing your complaint, an
                  appropriate decision will be taken.
                </li>

                <li>
                  In case of complaints regarding products that come with a
                  manufacturer’s warranty, please refer the issue directly to
                  the respective manufacturer.
                </li>

                <li>
                  In case any refunds are approved by Cyber Sanjay, it will take
                  approximately <strong>1–2 business days</strong> for the
                  refund to be processed to the end customer.
                </li>

              </ul>
            </section>

            {/* Contact */}
            <section className="space-y-2 pt-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Contact Us
              </h2>
              <p className="text-slate-700">
                If you have any questions or concerns regarding this policy,
                please contact us using the information available on our website.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

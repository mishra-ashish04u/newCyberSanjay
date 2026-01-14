"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const paymentId = params.get("payment_id");

  if (!paymentId) {
    return <p>Invalid or missing payment</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful 🎉</h1>
        <p className="mb-6">Your PDF is ready to download</p>

        <a
          href="/pdfs/cybersecurity-starter.pdf"
          className="px-6 py-3 bg-black text-white rounded"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}

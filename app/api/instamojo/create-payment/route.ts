import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, purpose, email } = await req.json();

    const response = await fetch(
      `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": process.env.INSTAMOJO_API_KEY!,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purpose,
          amount,
          buyer_name: "Customer",
          email,
          redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
          send_email: true,
          allow_repeated_payments: false,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json({ success: false, error: data });
    }

    return NextResponse.json({
      success: true,
      payment_url: data.payment_request.longurl,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

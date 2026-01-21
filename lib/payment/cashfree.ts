// lib/payment/cashfree.ts
export interface ProductInfo {
  id: string
  name: string
  amount: number
  description: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
}

// Helper function to get the base URL
function getBaseUrl(): string {
  // Use environment variable if available
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Fallback for development
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  return 'http://localhost:3000';
}

export async function createPaymentOrder(
  product: ProductInfo,
  customer: CustomerInfo
) {
  try {
    const response = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: product.name,
        amount: product.amount,
        customerEmail: customer.email,
        customerName: customer.name,
        customerPhone: customer.phone,
        returnUrl: `${getBaseUrl()}/payment/success`, // Return URL after payment
        notifyUrl: `${getBaseUrl()}/api/payment/webhook`, // Webhook URL
      }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Failed to create order')
    }

    return data
  } catch (error) {
    console.error('Error creating payment order:', error)
    throw error
  }
}

export async function initiatePayment(paymentSessionId: string) {
  try {
    // Dynamically import Cashfree SDK
    const { load } = await import('@cashfreepayments/cashfree-js')
    
    const cashfree = await load({
      mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PROD' 
        ? 'production' 
        : 'sandbox'
    })

    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      returnUrl: `${getBaseUrl()}/payment/success`,
    }

    cashfree.checkout(checkoutOptions)
    
  } catch (error) {
    console.error('Error initiating payment:', error)
    throw error
  }
}
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
      mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' 
        ? 'production' 
        : 'sandbox'
    })

    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      returnUrl: process.env.NEXT_PUBLIC_PAYMENT_SUCCESS_URL,
    }

    cashfree.checkout(checkoutOptions)
    
  } catch (error) {
    console.error('Error initiating payment:', error)
    throw error
  }
}
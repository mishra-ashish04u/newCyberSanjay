// lib/payment/cashfree.ts

export interface ProductInfo {
  itemId: string
  name: string
  type: string
  amount: number
  metadata?: {
    downloadUrl?: string
    githubPath?: string
    thumbnail?: string
  }
}

interface CustomerInfo {
  name: string
  email: string
  phone: string
}

declare global {
  interface Window {
    Cashfree: any
  }
}

// Load Cashfree SDK
export const loadCashfreeSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      console.log('✅ Cashfree SDK already loaded')
      resolve()
      return
    }

    const existingScript = document.querySelector('script[src*="cashfree"]')
    if (existingScript) {
      console.log('⏳ Cashfree SDK is loading...')
      
      const checkSDK = setInterval(() => {
        if (window.Cashfree) {
          clearInterval(checkSDK)
          console.log('✅ Cashfree SDK ready')
          resolve()
        }
      }, 100)

      setTimeout(() => {
        clearInterval(checkSDK)
        if (!window.Cashfree) {
          reject(new Error('Cashfree SDK load timeout'))
        }
      }, 10000)
      
      return
    }

    console.log('📦 Loading Cashfree SDK...')
    
    const script = document.createElement('script')
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js'
    script.type = 'text/javascript'
    script.async = true
    
    script.onload = () => {
      console.log('📥 Script loaded, waiting for SDK...')
      
      const checkSDK = () => {
        if (window.Cashfree) {
          console.log('✅ Cashfree SDK ready')
          resolve()
        } else {
          setTimeout(checkSDK, 100)
        }
      }
      
      checkSDK()
      
      setTimeout(() => {
        if (!window.Cashfree) {
          reject(new Error('Cashfree SDK loaded but not initialized'))
        }
      }, 5000)
    }

    script.onerror = () => {
      console.error('❌ Failed to load Cashfree SDK script')
      reject(new Error('Failed to load Cashfree SDK. Please check your internet connection.'))
    }

    document.head.appendChild(script)
  })
}

// Create Payment Order (calls your API)
export const createPaymentOrder = async (
  product: ProductInfo,
  customerInfo: CustomerInfo
) => {
  try {
    console.log('📝 Creating payment order...')
    
    const response = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: product.itemId,
        itemName: product.name,
        itemType: product.type,
        amount: product.amount,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        metadata: product.metadata
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create order')
    }

    const data = await response.json()
    console.log('✅ Order created:', data.orderId)
    
    return {
      orderId: data.orderId,
      paymentSessionId: data.paymentSessionId,
      orderToken: data.orderToken
    }
    
  } catch (error: any) {
    console.error('❌ Create order error:', error)
    throw error
  }
}

// Initiate Payment (opens Cashfree checkout)
export const initiatePayment = async (
  paymentSessionId: string,
  mode: 'sandbox' | 'production' = 'sandbox'
) => {
  try {
    console.log('🔄 Initiating payment...')
    console.log('💳 Session ID:', paymentSessionId)
    
    await loadCashfreeSDK()

    if (!window.Cashfree) {
      throw new Error('Cashfree SDK not available')
    }

    console.log('🔧 Initializing Cashfree...')
    const cashfree = await window.Cashfree({ mode })

    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: '_self'
    }

    console.log('🚀 Opening checkout...')
    await cashfree.checkout(checkoutOptions)
    
  } catch (error: any) {
    console.error('❌ Payment error:', error)
    
    if (error.message?.includes('Failed to load')) {
      throw new Error('Unable to connect to payment gateway. Please check your internet connection and try again.')
    }
    
    throw new Error(error.message || 'Payment initialization failed. Please try again.')
  }
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckoutModal } from "./checkout-modal"
import { createPaymentOrder, initiatePayment, ProductInfo } from "@/lib/payment/cashfree"
import { useToast } from "@/hooks/use-toast"

interface CheckoutButtonProps {
  product: ProductInfo
  className?: string
  children: React.ReactNode
}

export function CheckoutButton({ product, className, children }: CheckoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleProceedToPayment = async (customerInfo: {
    name: string
    email: string
    phone: string
  }) => {
    setIsProcessing(true)

    try {
      // Step 1: Create payment order
      const orderData = await createPaymentOrder(product, customerInfo)

      // Step 2: Initiate Cashfree checkout
      await initiatePayment(orderData.paymentSessionId)

    } catch (error) {
      console.error('Payment error:', error)
      
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      })

      setIsProcessing(false)
    }
  }

  return (
    <>
      <Button
        className={className}
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </Button>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        amount={product.amount}
        onProceed={handleProceedToPayment}
        isProcessing={isProcessing}
      />
    </>
  )
}
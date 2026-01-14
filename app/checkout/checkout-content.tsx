// "use client"

// declare global {
//   interface Window {
//     Cashfree: any
//   }
// }

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { useSearchParams, useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import Script from "next/script"

// interface Product {
//   id: string
//   name: string
//   price: number
// }

// export default function CheckoutContent() {
//   // 🔹 STATE
//   const [products, setProducts] = useState<Product[]>([])
//   const [email, setEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(true)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [totalPrice, setTotalPrice] = useState(0)

//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const productParam = searchParams.get("product")

//   // 🔹 LOAD PRODUCT INFO
//   useEffect(() => {
//     const loadCheckout = async () => {
//       let productsData: Product[] = []

//       // HARD-CODED PRICING (safe & simple for now)
//       if (productParam === "combo") {
//         productsData = [
//           { id: "combo", name: "Combo Bundle", price: 149 },
//         ]
//         setTotalPrice(149)
//       } else if (productParam === "starter") {
//         productsData = [
//           { id: "starter", name: "Starter Bundle", price: 99 },
//         ]
//         setTotalPrice(99)
//       } else {
//         // fallback
//         router.push("/")
//         return
//       }

//       setProducts(productsData)
//       setIsLoading(false)
//     }

//     loadCheckout()
//   }, [productParam, router])

//   // 🔹 HANDLE PAYMENT
//   const handlePayment = async () => {
//     if (!email) {
//       alert("Please enter your email")
//       return
//     }

//     setIsProcessing(true)

//     try {
//       const response = await fetch("/api/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productIds: products.map((p) => p.id),
//           amount: totalPrice,
//           customerEmail: email,
//         }),
//       })

//       const data = await response.json()

//       if (!data.success) {
//         throw new Error(data.message || "Order creation failed")
//       }

//       const cashfree = new window.Cashfree({
//         mode: "TEST", // change to PROD later
//       })

//       cashfree.checkout({
//         paymentSessionId: data.data.sessionId,
//         redirectTarget: "_self",
//       })
//     } catch (error) {
//       console.error("Payment error:", error)
//       alert("Failed to initiate payment. Please try again.")
//       setIsProcessing(false)
//     }
//   }

//   // 🔹 LOADING STATE
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   return (
//     <>
//       {/* 🔹 Cashfree SDK */}
//       <Script
//         src="https://sdk.cashfree.com/js/cashfree.js"
//         strategy="beforeInteractive"
//       />

//       <div className="min-h-screen bg-background flex items-center justify-center p-4">
//         <div className="w-full max-w-sm">
//           <Card>
//             <CardHeader className="space-y-2">
//               <CardTitle className="text-2xl">Order Summary</CardTitle>
//               <CardDescription>Review your purchase</CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-6">
//               {/* PRODUCTS */}
//               <div className="space-y-3">
//                 {products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex justify-between items-center pb-3 border-b"
//                   >
//                     <span className="text-sm">{product.name}</span>
//                     <span className="font-semibold">₹{product.price}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* EMAIL */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Email</label>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>

//               {/* TOTAL */}
//               <div className="bg-primary/5 p-4 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Total Amount</span>
//                   <span className="text-2xl font-bold">₹{totalPrice}</span>
//                 </div>
//               </div>

//               {/* PAY BUTTON */}
//               <div className="space-y-3">
//                 <Button
//                   onClick={handlePayment}
//                   className="w-full py-6 text-base"
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? "Processing..." : `Pay ₹${totalPrice}`}
//                 </Button>

//                 <p className="text-xs text-center text-muted-foreground">
//                   Secure payment via Cashfree
//                 </p>
//               </div>

//               {/* CANCEL */}
//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => router.back()}
//               >
//                 Cancel
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </>
//   )
// }

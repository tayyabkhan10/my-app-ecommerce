// "use client"
// import { useEffect, useState } from "react";

// export default function cart() {
//     const [isCart, setIsCart] = useState(false)
//     const [bookOne, setBookOne] = useState<any>(null);
//     async function GETone() {
//         const response = await fetch(`https://simple-books-api.click/books/${localStorage.getItem("BookID")}`);
//         const data = await response.json();
//         setBookOne(data)
//         setIsCart(true);
//         return data;
//     }
//     useEffect(()=>{
//         GETone();
//     },[])
//     async function order(bookId: number) {
//     const api_key = "https://simple-books-api.click/orders"
//     const response = await fetch(api_key, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem("Tokens")}`
//       },
//       body: JSON.stringify({
//         bookId: bookId,
//         customerName: localStorage.getItem("NameC")
//       })
//     })
//     const data = await response.json();
//     const orderId = data.orderId || data.id || data.order_id;
//     if (!orderId) {
//       alert("Not Found")
//     }
//     localStorage.setItem("Orders", data.orderId)
//     console.log("Order Created", data.orderId)
//     return data;
//   }
//     return (
//         < div className = {`${isCart ? 'flex' : 'hidden'} fixed inset-0 z-50  flex items-center justify-center bg-gray-100 backdrop-blur-sm`
// }>
//     <div className=" bg-white p-6 rounded-xl shadow w-[320px]">
//         <h1 className="text-2xl font-bold text-purple-950">
//             {bookOne?.name}
//         </h1>

//         <p className="text-gray-600 mt-2">
//             Type: {bookOne?.type}
//         </p>

//         <p className="text-gray-600 mt-1">
//             Available: {bookOne?.available ? "Yes" : "No"}
//         </p>

//         <button onClick={() => { 
//   if (bookOne) order(bookOne.id);  // Only call if book exists
// }}
//             className="mt-5 bg-green-600 text-white px-4 py-2 rounded-lg w-full">
//             Buy Now
//         </button>
//        <a href="/"><button onClick={()=> setIsCart(false)}className="mt-3 text-red-500 w-full">Close</button></a> 
//     </div>
//      </div >
//     )
// }




























































// "use client"

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function Cart() {
//     const [cartItems, setCartItems] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [total, setTotal] = useState(0);

//     useEffect(() => {
//         const cart = JSON.parse(localStorage.getItem("Cart") || "[]");
//         setCartItems(cart);
//         const sum = cart.reduce((acc: number, item: any) => acc + (item.price || 0), 0);
//         setTotal(sum);
//     }, []);

//     const removeFromCart = (id: number) => {
//         const updated = cartItems.filter(item => item.id !== id);
//         setCartItems(updated);
//         localStorage.setItem("Cart", JSON.stringify(updated));
//         setTotal(updated.reduce((acc: number, item: any) => acc + (item.price || 0), 0));
//     };

//     const clearCart = () => {
//         if (confirm("Clear all items from cart?")) {
//             localStorage.removeItem("Cart");
//             setCartItems([]);
//             setTotal(0);
//         }
//     };

//     async function checkout() {
//         const token = localStorage.getItem("Tokens");
//         const customerName = localStorage.getItem("NameC") || "Guest";

//         if (!token) {
//             alert("⚠️ Please register first to place an order!");
//             window.location.href = "/";
//             return;
//         }

//         if (cartItems.length === 0) {
//             alert("🛒 Your cart is empty!");
//             return;
//         }

//         const unavailable = cartItems.filter((item: any) => !item.available);
//         if (unavailable.length > 0) {
//             alert(`❌ These items are out of stock: ${unavailable.map((i: any) => i.name).join(", ")}`);
//             return;
//         }

//         setLoading(true);

//         try {
//             const orderIds: string[] = [];

//             for (const item of cartItems) {
//                 const response = await fetch("https://simple-books-api.click/orders", {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`
//                     },
//                     body: JSON.stringify({
//                         bookId: item.id,
//                         customerName: customerName
//                     })
//                 });

//                 if (!response.ok) {
//                     const errData = await response.json();
//                     throw new Error(errData.error || `Failed to order: ${item.name}`);
//                 }

//                 const data = await response.json();

//                 const orderId = data.orderId || data.id || data.order_id;

//                 if (orderId) {
//                     orderIds.push(String(orderId));

//                     localStorage.setItem("LastOrderId", String(orderId));
//                 }

//                 await new Promise(resolve => setTimeout(resolve, 200));
//             }

//             if (orderIds.length > 0) {
//                 localStorage.setItem("OrderIds", JSON.stringify(orderIds));

//                 const orderHistory = JSON.parse(localStorage.getItem("OrderHistory") || "[]");
//                 const newOrders = cartItems.map((item, index) => ({
//                     orderId: orderIds[index],
//                     bookId: item.id,
//                     bookName: item.name,
//                     price: item.price,
//                     orderedAt: new Date().toISOString()
//                 }));
//                 localStorage.setItem("OrderHistory", JSON.stringify([...newOrders, ...orderHistory]));
//             }

//             localStorage.removeItem("Cart");

            

//         } catch (err: any) {
//             console.error("Checkout error:", err);
//             alert("❌ Checkout failed: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     if (cartItems.length === 0 && loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-purple-950 text-xl">Loading cart...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8 px-4">
//             <div className="max-w-3xl mx-auto">


//                 <div className="flex items-center justify-between mb-6">
//                     <h1 className="text-3xl font-bold text-purple-950">🛒 Your Cart</h1>
//                     <Link href="/" className="text-purple-600 hover:underline">
//                         ← Continue Shopping
//                     </Link>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden">


//                     {cartItems.length === 0 ? (
//                         <div className="p-10 text-center">
//                             <div className="text-6xl mb-4">🛒</div>
//                             <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
//                             <Link
//                                 href="/"
//                                 className="inline-block bg-purple-950 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
//                             >
//                                 Browse Books
//                             </Link>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="divide-y">
//                                 {cartItems.map((item) => (
//                                     <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                                         <div className="flex items-center gap-4">
//                                             <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                                                 {item.image ? (
//                                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
//                                                 ) : (
//                                                     <span className="text-2xl">Books</span>
//                                                 )}
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-semibold text-purple-950">{item.name}</h3>
//                                                 <p className="text-gray-600 text-sm">{item.type}</p>
//                                                 <p className="text-purple-700 font-bold mt-1">${item.price?.toFixed(2) || "0.00"}</p>
//                                                 <p className={`text-xs ${item.available ? 'text-green-600' : 'text-red-600'}`}>
//                                                     {item.available ? "✓ In Stock" : "✗ Out of Stock"}
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         <button
//                                             onClick={() => removeFromCart(item.id)}
//                                             className="text-red-500 hover:text-red-700 text-sm font-medium self-start sm:self-center"
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>


//                             <div className="p-5 bg-gray-50 border-t">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <span className="text-gray-600">Subtotal ({cartItems.length} items):</span>
//                                     <span className="text-2xl font-bold text-purple-950">${total.toFixed(2)}</span>
//                                 </div>

//                                 <div className="flex flex-col sm:flex-row gap-3">
//                                     <button
//                                         onClick={clearCart}
//                                         className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
//                                     >
//                                         Clear Cart
//                                     </button>
//                                     <button
//                                         onClick={checkout}
//                                         disabled={loading || cartItems.some((i: any) => !i.available)}
//                                         className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {loading ? "Processing..." : "Checkout Now"}
//                                     </button>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>

//                 <p className="text-center text-gray-400 text-sm mt-6">
//                     🔐 Secure checkout • Orders processed via Simple Books API
//                 </p>

//             </div>
//         </div>
//     );
// }


























































"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Cart() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("Cart") || "[]");
        setCartItems(cart);
        const sum = cart.reduce((acc: number, item: any) => acc + (item.price || 0), 0);
        setTotal(sum);
    }, []);

    const removeFromCart = (id: number) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem("Cart", JSON.stringify(updated));
        setTotal(updated.reduce((acc: number, item: any) => acc + (item.price || 0), 0));
    };

    const clearCart = () => {
        if (confirm("Clear all items from cart?")) {
            localStorage.removeItem("Cart");
            setCartItems([]);
            setTotal(0);
        }
    };

    async function checkout() {
        const token = localStorage.getItem("Tokens");
        const customerName = localStorage.getItem("NameC") || "Guest";

        if (!token) {
            alert("⚠️ Please register first to place an order!");
            window.location.href = "/";
            return;
        }

        if (cartItems.length === 0) {
            alert("🛒 Your cart is empty!");
            return;
        }

        const unavailable = cartItems.filter((item: any) => !item.available);
        if (unavailable.length > 0) {
            alert(`❌ These items are out of stock: ${unavailable.map((i: any) => i.name).join(", ")}`);
            return;
        }

        setLoading(true);

        try {
            const orderIds: string[] = [];

            for (const item of cartItems) {
                const response = await fetch("https://simple-books-api.click/orders", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        bookId: item.id,
                        customerName: customerName
                    })
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || `Failed to order: ${item.name}`);
                }

                const data = await response.json();
                const orderId = data.orderId || data.id || data.order_id;

                if (orderId) {
                    orderIds.push(String(orderId));
                    localStorage.setItem("LastOrderId", String(orderId));
                }

                await new Promise(resolve => setTimeout(resolve, 200));
            }

            if (orderIds.length > 0) {
                localStorage.setItem("OrderIds", JSON.stringify(orderIds));
                const orderHistory = JSON.parse(localStorage.getItem("OrderHistory") || "[]");
                const newOrders = cartItems.map((item, index) => ({
                    orderId: orderIds[index],
                    bookId: item.id,
                    bookName: item.name,
                    price: item.price,
                    orderedAt: new Date().toISOString()
                }));
                localStorage.setItem("OrderHistory", JSON.stringify([...newOrders, ...orderHistory]));
            }

            localStorage.removeItem("Cart");
            setCartItems([]);
            setTotal(0);
            
            window.location.href = "/orders";  
            
        } catch (err: any) {
            console.error("Checkout error:", err);
            alert("❌ Checkout failed: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    if (cartItems.length === 0 && loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-purple-950 text-xl">Loading cart...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-purple-950">🛒 Your Cart</h1>
                    <Link href="/" className="text-purple-600 hover:underline">
                        ← Continue Shopping
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {cartItems.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                            <Link
                                href="/"
                                className="inline-block bg-purple-950 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
                            >
                                Browse Books
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                                ) : (
                                                    <span className="text-2xl">📖</span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-purple-950">{item.name}</h3>
                                                <p className="text-gray-600 text-sm">{item.type}</p>
                                                <p className="text-purple-700 font-bold mt-1">${item.price?.toFixed(2) || "0.00"}</p>
                                                <p className={`text-xs ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                                                    {item.available ? "✓ In Stock" : "✗ Out of Stock"}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium self-start sm:self-center"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="p-5 bg-gray-50 border-t">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">Subtotal ({cartItems.length} items):</span>
                                    <span className="text-2xl font-bold text-purple-950">${total.toFixed(2)}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={clearCart}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        onClick={checkout}
                                        disabled={loading || cartItems.some((i: any) => !i.available)}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Processing..." : "Checkout Now"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <p className="text-center text-gray-400 text-sm mt-6">
                    🔐 Secure checkout • Orders processed via Simple Books API
                </p>
            </div>
        </div>
    );
}
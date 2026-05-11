"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

interface OrderBook {
  bookId?: number;
  id?: number;
  quantity?: number;
}

interface Order {
  id: number;
  customerId?: number;
  bookId?: number;
  quantity?: number;
  books?: OrderBook[];
  createdOn: string;
  [key: string]: any;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [booksMap, setBooksMap] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deleteOrder = async (orderId: number) => {
  const userChoice = confirm("Are you sure you want to delete this order?");
  if (!userChoice) {
    console.log("User cancelled deletion");
    return;
  }

  const token = localStorage.getItem("Tokens");
  
  if (!token) {
    alert("⚠️ Authentication required to delete orders");
    return;
  }

  try {
    setLoading(true);
    
    const response = await fetch(`https://simple-books-api.click/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to delete order #${orderId}`);
    }

    const storedOrderIds = JSON.parse(localStorage.getItem("OrderIds") || "[]");
    const updatedOrderIds = storedOrderIds.filter((id: string | number) => 
      String(id) !== String(orderId)
    );
    localStorage.setItem("OrderIds", JSON.stringify(updatedOrderIds));

    const orderHistory = JSON.parse(localStorage.getItem("OrderHistory") || "[]");
    const updatedHistory = orderHistory.filter((order: any) => 
      String(order.orderId) !== String(orderId)
    );
    localStorage.setItem("OrderHistory", JSON.stringify(updatedHistory));

    const lastOrderId = localStorage.getItem("LastOrderId");
    if (lastOrderId && String(lastOrderId) === String(orderId)) {
      localStorage.removeItem("LastOrderId");
    }

    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    
    console.log(`Order #${orderId} deleted from API + localStorage`);

  } catch (err: any) {
    console.error("❌ Delete order error:", err);
    alert("❌ Error: " + err.message);
  } finally {
    setLoading(false);
  }
};

  // function del(){
  //   let userChoice =confirm("Are you sure you want to delete order")
  //   if(userChoice==true){
  //     alert("Your Order is successfuly deleted");
  //     console.log("User deleted Order")
  //   }else{
  //     console.log("User respond Cancel")
  //   }
  // }

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem("Tokens");

      if (!token) {
        setError("⚠️ Please register/login to view orders");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://simple-books-api.click/orders", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Failed to fetch orders");
        }

        const data = await response.json();
        console.log("📦 Raw API Response:", data);

        const orderList: Order[] = Array.isArray(data) ? data : [data];
        setOrders(orderList);

        const allBookIds = orderList.flatMap(order => {
          console.log("🔍 Order structure:", order);

          if (order.books && Array.isArray(order.books)) {
            return order.books.map((book: OrderBook) => book.bookId || book.id).filter(Boolean);
          }

          if (order.bookId) {
            return [order.bookId];
          }

          if (typeof order.id === "number") {
            return [order.id];
          }

          return [];
        });

        const uniqueBookIds = Array.from(new Set(allBookIds)).filter((id): id is number =>
          typeof id === "number"
        );

        console.log("📚 Unique Book IDs to fetch:", uniqueBookIds);

        const bookDetails: Record<number, any> = {};
        for (const bookId of uniqueBookIds) {
          try {
            const bookRes = await fetch(`https://simple-books-api.click/books/${bookId}`);
            if (bookRes.ok) {
              const bookData = await bookRes.json();
              bookDetails[bookId] = bookData;
              console.log(`✅ Fetched book ${bookId}:`, bookData.name);
            }
          } catch (e) {
            console.warn(`⚠️ Could not fetch book ${bookId}`, e);
          }
        }
        setBooksMap(bookDetails);

      } catch (err: any) {
        console.error("❌ Fetch orders error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getBookInfo = (order: Order) => {
    if (order.books && Array.isArray(order.books)) {
      return order.books
        .map(book => {
          const bId = book.bookId || book.id;
          if (!bId || typeof bId !== "number") return null;
          return {
            bookId: bId,
            info: booksMap[bId] || null,
            quantity: book.quantity || 1
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
    }

    const bId = order.bookId || (typeof order.id === "number" ? order.id : null);
    if (bId && typeof bId === "number") {
      return [{
        bookId: bId,
        info: booksMap[bId] || null,
        quantity: order.quantity || 1
      }];
    }

    return [];
  };

  const totalSpent = orders.reduce((sum, order) => {
    const books = getBookInfo(order);
    return sum + books.reduce((bookSum, book) => {
      const price = book.info?.price || 0;
      return bookSum + (price * (book.quantity || 1));
    }, 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-purple-950 text-xl animate-pulse">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow p-6 max-w-md text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-gray-700 mb-4">{error}</p>
          <Link
            href="/"
            className="inline-block bg-purple-950 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-purple-950">📦 My Orders</h1>
            <Link href="/" className="text-purple-600 hover:underline">
              ← Continue Shopping
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg mb-2">No orders yet</p>
            <p className="text-gray-400 text-sm mb-6">Start shopping to see your order history</p>
            <Link
              href="/"
              className="inline-block bg-purple-950 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition font-medium"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-purple-950">📦 My Orders</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">
              Total Spent: <span className="font-bold text-purple-700">0.0$</span>
            </span>
            <Link href="/" className="text-purple-600 hover:underline">
              ← Shop More
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const books = getBookInfo(order);
            const orderTotal = books.reduce((sum, book) => {
              const price = book.info?.price || 0;
              return sum + (price * (book.quantity || 1));
            }, 0);

            return (
              <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">

                <div className="bg-gradient-to-r from-purple-950 to-purple-800 px-5 py-4 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-purple-200 text-sm">
                          Placed on {new Date(order.createdOn).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm">
                      ✅ Completed
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="space-y-3">
                    {books.map((book, idx) => {
                      if (!book || !book.bookId) return null;
                      const bookInfo = book.info;

                      return (
                        <div
                          key={`${book.bookId}-${idx}`}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            {bookInfo?.image ? (
                              <img
                                src={bookInfo.image}
                                alt={bookInfo.name || "Book"}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <span className="text-xl">📖</span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-purple-950 truncate">
                              {bookInfo?.name || `Book #${book.bookId}`}
                            </h4>
                            <p className="text-gray-500 text-sm">
                              Type: {bookInfo?.type || "Unknown"}
                            </p>
                            <p className="text-purple-700 font-bold text-sm mt-1">
                              ${0.0} × {book.quantity}
                            </p>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                              Qty: {book.quantity}
                            </span>
                            <p className="text-gray-600 font-semibold mt-1">
                              ${0.0 * book.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      disabled={loading}
                      className="bg-purple-950 hover:bg-gray-300 text-white font-bold py-2 px-5 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? "Deleting..." : "Delete Order"}
                    </button>
                    <div className="text-right">
                      <span className="text-gray-500 text-sm">Order Total: </span>
                      <span className="text-xl font-bold text-purple-950">0.0$</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          🔐 Orders synced with Simple Books API • Last updated: {new Date().toLocaleTimeString()}
        </p>

      </div>
    </div>
  );
}
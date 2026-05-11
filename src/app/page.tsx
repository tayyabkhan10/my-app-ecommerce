// "use client"
// import { useEffect, useState } from "react";
// export default function Home() {
//     const [isOpen, setIsOpen] = useState(false)
//     const [isSign, setIsSign] = useState(false)
//     const [Tname, setTName] = useState("")
//     const [Temail, setTEmail] = useState("")
//     const [books, setBooks] = useState([])







//     // const [bookOne, setBookOne] = useState<any>(null);
//     // const [isCart, setIsCart] = useState(false)









//     const signForm = () => setIsSign(!isSign)
//     const toggelMenu = () => setIsOpen(!isOpen)

//     function handleSubmit(e: any) {
//         e.preventDefault();
//         async function gett() {
//             const api_key = "https://simple-books-api.click/api-clients/"
//             const response = await fetch(api_key, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     clientName: Tname,
//                     clientEmail: Temail
//                 })
//             })
//             const data = await response.json();
//             console.log(data)

//             localStorage.setItem("Tokens", data.accessToken)
//             localStorage.setItem("NameC", Tname)
//             const token = localStorage.getItem("Tokens");
//             console.log("Token is ", token)
//             console.log(data)
//             return data;
//         }
//         gett();
//     }
//     async function GETT() {
//         const response = await fetch("https://simple-books-api.click/books/");
//         const data = await response.json();
//         setBooks(data)
//         return data;
//     }
//     useEffect(() => {
//         GETT()
//     }, []);









//     // async function GETone(bookId: number) {
//     //   const response = await fetch(`https://simple-books-api.click/books/${bookId}`);
//     //   const data = await response.json();
//     //   setBookOne(data)
//     //   setIsCart(true);
//     //   return data;
//     // }
//     // async function order(bookId: number) {
//     //   const api_key = "https://simple-books-api.click/orders"
//     //   const response = await fetch(api_key, {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //       Authorization: `Bearer ${localStorage.getItem("Tokens")}`
//     //     },
//     //     body: JSON.stringify({
//     //       bookId: bookId,
//     //       customerName: Tname
//     //     })
//     //   })
//     //   const data = await response.json();
//     //   const orderId = data.orderId || data.id || data.order_id;
//     //   if (!orderId) {
//     //     alert("Not Found")
//     //   }
//     //   localStorage.setItem("Orders", data.orderId)
//     //   console.log("Order Created", data.orderId)
//     //   return data;
//     // }









//     return (
//         <div className="bg-white">
//             <header>
//                 <nav>
//                     <div className="flex justify-between w-full bg-white px-3 md:px-8">
//                         <div className="flex  justify-between items-center h-25 bg-white gap-x-7">
//                             <a className="text-purple-950 font-bold text-[30px]" href="">T-Books</a>
//                             <a className="hidden md:inline cursor-pointer text-[16px] text-purple-950 pt-2 xl:ml-2" href="">About</a>
//                             <a className="hidden md:inline cursor-pointer pt-2 text-[16px] text-purple-950  xl:ml-2" href="">Contact</a>
//                             <a className="hidden md:inline cursor-pointer pt-2 text-[16px] text-purple-950  xl:ml-2" href="">Pricing</a>
//                         </div>
//                         <div className="flex items-center gap-x-5">
//                             <button className="bg-blue-600 text-white w-25 h-8 rounded-full text-sm" onClick={signForm}>
//                                 Sign-up
//                             </button>
//                             <div className="md:hidden pr-3">
//                                 <button className="text-black" onClick={toggelMenu}>
//                                     {
//                                         isOpen ? (<span className="text-2xl">✕</span>) : (<span className="text-2xl">☰</span>)
//                                     }
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>
//             </header>
//             <div className={`${isOpen ? 'block' : 'hidden'} md:hidden flex justify-center absolute top-40 inset-x-10 `}>
//                 <div className="flex flex-col h-60 w-[90vw] bg-white rounded-4xl pl-5 pt-5 ">
//                     <a className=" md:hidden cursor-pointer text-[20px] text-black xl:ml-2 pt-2 h-[15vh]" href="">About</a>
//                     <a className=" md:hidden cursor-pointer text-[20px] text-black xl:ml-2 h-[13vh]" href="">Contact</a>
//                     <a className=" md:hidden cursor-pointer text-[20px] text-black xl:ml-2 h-[13vh] " href="">Pricing</a>
//                     <hr />
//                     <a className=" md:hidden cursor-pointer text-[20px] text-black xl:ml-2 pt-2 h-[15vh]" href="">Sign up</a>
//                 </div>
//             </div>
//             <main className={`${isSign ? 'block' : 'hidden'} flex min-h-screen items-center justify-center bg-purple-950`}>
//                 <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
//                     <h2 className="text-purple-950 text-[32px] font-semibold">Sign-up Form</h2>
//                     <input type="email" placeholder="Enter Email" className="rounded-md text-purple-950 border p-3 outline-none" value={Temail} onChange={(e) => { setTEmail(e.target.value) }} />
//                     <input type="text" placeholder="Enter Name" className="rounded-md border text-purple-950 p-3 outline-none" value={Tname} onChange={(e) => { setTName(e.target.value) }} />
//                     <button type="submit" className="rounded-md p-3 text-white bg-purple-950 ">Submit</button>

//                 </form>
//             </main>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
//                 {books.map((book: any) => (
//                     <div
//                         key={book.id}
//                         className="border rounded-xl p-5 shadow bg-white"
//                     >
//                         <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
//                             Book Image
//                         </div>

//                         <h1 className="text-2xl text-purple-950 font-bold mt-4">
//                             {book.name}
//                         </h1>

//                         <p className="text-gray-600 mt-2">
//                             Type: {book.type}
//                         </p>
//                         <a href="/cart"><button onClick={() => localStorage.setItem("BookID", book.id)} className="mt-4 bg-purple-950 text-white px-4 py-2 rounded-lg">Add To Cart</button></a>

//                     </div>
//                 ))}
//             </div>










//             {/* <div className={`${isCart ? 'flex' : 'hidden'} fixed inset-0 z-50  flex items-center justify-center bg-gray-100 backdrop-blur-sm`}>
//         <div className=" bg-white p-6 rounded-xl shadow w-[320px]">
//           <h1 className="text-2xl font-bold text-purple-950">
//             {bookOne?.name}
//           </h1>

//           <p className="text-gray-600 mt-2">
//             Type: {bookOne?.type}
//           </p>

//           <p className="text-gray-600 mt-1">
//             Available: {bookOne?.available ? "Yes" : "No"}
//           </p>

//           <button
//             onClick={() => {
//               if (!bookOne) return;
//               order(bookOne.id);
//             }}
//             className="mt-5 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
//           >
//             Buy Now
//           </button>
//           <button
//             onClick={() => setIsCart(false)}
//             className="mt-3 text-red-500 w-full"
//           >
//             Close
//           </button>
//         </div>
//       </div> */}









//         </div>

//     );
// }




















































































// "use client"

// import { useEffect, useState } from "react";

// export default function Home() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isSign, setIsSign] = useState(false)
//   const [Tname, setTName] = useState("")
//   const [Temail, setTEmail] = useState("")
//   const [books, setBooks] = useState<any[]>([])
//   const [cartCount, setCartCount] = useState(0)
//   const [loading, setLoading] = useState(false)

//   const signForm = () => setIsSign(!isSign)
//   const toggleMenu = () => setIsOpen(!isOpen)

//   useEffect(() => {
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem("Cart") || "[]");
//       setCartCount(cart.length);
//     };
//     updateCartCount();
//     window.addEventListener("storage", updateCartCount);
//     return () => window.removeEventListener("storage", updateCartCount);
//   }, []);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("https://simple-books-api.click/api-clients/", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           clientName: Tname,
//           clientEmail: Temail
//         })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Registration failed");
//       }

//       if (data.accessToken) {
//         localStorage.setItem("Tokens", data.accessToken);
//         localStorage.setItem("NameC", Tname);
//       }

//       alert("✅ Registration successful!");
//       setIsSign(false);
//       setTName("");
//       setTEmail("");

//     } catch (err: any) {
//       console.error(err);
//       alert("❌ Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function fetchBooks() {
//     try {
//       const response = await fetch("https://simple-books-api.click/books/");
//       const data = await response.json();
//       setBooks(data);
//     } catch (error) {
//       console.error("Failed to load books:", error);
//     }
//   }

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const addToCart = (book: any) => {
//     const cart = JSON.parse(localStorage.getItem("Cart") || "[]");

//     // if (cart.find((item: any) => item.id === book.id)) {
//     //   alert("📚 Already in cart!");
//     //   return;
//     // }

//     cart.push({
//       id: book.id,
//       name: book.name,
//       type: book.type,
//       price: book.price || 0,
//       available: book.available
//     });

//     localStorage.setItem("Cart", JSON.stringify(cart));
//     setCartCount(cart.length);
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
//         <nav>
//           <div className="flex justify-between w-full px-3 md:px-8 py-4">
//             <div className="flex items-center gap-x-7">
//               <a className="text-purple-950 font-bold text-[30px]" href="/">T-Books</a>
//               <a className="hidden md:inline cursor-pointer text-[16px] text-purple-950" href="/">About</a>
//               <a className="hidden md:inline cursor-pointer text-[16px] text-purple-950" href="/">Contact</a>
//               <a className="hidden md:inline cursor-pointer text-[16px] text-purple-950" href="/">Pricing</a>
//             </div>

//             <div className="flex items-center gap-x-5">
//               <a href="/cart" className="relative">
//                 <span className="text-2xl">🛒</span>
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </a>

//               <button 
//                 className="bg-blue-600 text-white px-4 h-8 rounded-full text-sm hover:bg-blue-700 transition"
//                 onClick={signForm}
//               >
//                 Sign-up
//               </button>

//               <button className="md:hidden text-black" onClick={toggleMenu}>
//                 {isOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
//               </button>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-20 inset-x-0 z-30`}>
//         <div className="flex flex-col h-auto w-[90vw] mx-auto bg-white rounded-xl p-5 shadow-lg">
//           <a className="py-3 text-[18px] text-purple-950 border-b" href="/">About</a>
//           <a className="py-3 text-[18px] text-purple-950 border-b" href="/">Contact</a>
//           <a className="py-3 text-[18px] text-purple-950 border-b" href="/">Pricing</a>
//           <a className="py-3 text-[18px] text-purple-950" href="/cart">🛒 Cart ({cartCount})</a>
//         </div>
//       </div>

//       <main className={`${isSign ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center bg-black/50 backdrop-blur-sm p-4`}>
//         <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
//           <h2 className="text-purple-950 text-[28px] font-bold text-center">Create Account</h2>

//           <input 
//             type="email" 
//             placeholder="Enter Email" 
//             className="rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-purple-500" 
//             value={Temail} 
//             onChange={(e) => setTEmail(e.target.value)} 
//             required
//           />
//           <input 
//             type="text" 
//             placeholder="Enter Name" 
//             className="rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-purple-500" 
//             value={Tname} 
//             onChange={(e) => setTName(e.target.value)} 
//             required
//           />

//           <button 
//             type="submit" 
//             disabled={loading}
//             className="rounded-lg bg-purple-950 p-3 text-white font-semibold hover:bg-purple-800 transition disabled:opacity-50"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>

//           <button 
//             type="button" 
//             onClick={() => setIsSign(false)}
//             className="text-gray-500 text-sm hover:text-gray-700"
//           >
//             Cancel
//           </button>
//         </form>
//       </main>

//       <main className="p-5">
//         <h1 className="text-3xl font-bold text-purple-950 mb-6 text-center">📚 Our Books</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {books.map((book) => (
//             <div key={book.id} className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white flex flex-col">
//               <div className="h-48 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
//                 {book.image ? (
//                   <img src={book.image} alt={book.name} className="h-full w-full object-cover rounded-lg" />
//                 ) : (
//                   <span className="text-gray-400 text-4xl">📖</span>
//                 )}
//               </div>

//               <h2 className="text-xl text-purple-950 font-bold">{book.name}</h2>
//               <p className="text-gray-600 mt-1">Type: {book.type}</p>
//               <p className="text-gray-600">Price: ${book.price || 0}</p>
//               <p className={`text-sm font-medium mt-1 ${book.available ? 'text-green-600' : 'text-red-600'}`}>
//                 {book.available ? "✓ In Stock" : "✗ Out of Stock"}
//               </p>

//               <button 
//                 onClick={() => addToCart(book)}
//                 disabled={!book.available}
//                 className="mt-4 bg-purple-950 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Add To Cart
//               </button>
//             </div>
//           ))}
//         </div>

//         {books.length === 0 && (
//           <p className="text-center text-gray-500 py-10">Loading books...</p>
//         )}
//       </main>
//     </div>
//   );
// }

































































































"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSign, setIsSign] = useState(false)
  const [Tname, setTName] = useState("")
  const [Temail, setTEmail] = useState("")
  const [books, setBooks] = useState<any[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const signForm = () => setIsSign(!isSign)
  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("Cart") || "[]");
      setCartCount(cart.length);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://simple-books-api.click/api-clients/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: Tname,
          clientEmail: Temail
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      if (data.accessToken) {
        localStorage.setItem("Tokens", data.accessToken);
        localStorage.setItem("NameC", Tname);
      }

      alert("✅ Registration successful!");
      setIsSign(false);
      setTName("");
      setTEmail("");

    } catch (err: any) {
      console.error(err);
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBooks() {
    try {
      const response = await fetch("https://simple-books-api.click/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Failed to load books:", error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const addToCart = (book: any) => {
    const cart = JSON.parse(localStorage.getItem("Cart") || "[]");

    cart.push({
      id: book.id,
      name: book.name,
      type: book.type,
      price: book.price || 0,
      available: book.available
    });

    localStorage.setItem("Cart", JSON.stringify(cart));
    setCartCount(cart.length);
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
        <nav>
          <div className="flex justify-between w-full px-3 md:px-8 py-4">
            <div className="flex items-center gap-x-7">
              <a className="text-purple-950 font-bold text-[30px]" href="/">T-Books</a>
              <a className="hidden md:inline cursor-pointer text-[16px] text-purple-950" href="/">About</a>
              <a className="hidden md:inline cursor-pointer text-[16px] text-purple-950" href="/">Contact</a>
              <a className="hidden md:inline cursor-pointer text-[16px] text-purple-950" href="/">Pricing</a>
            </div>

            <div className="flex items-center gap-x-5">
              <a
                href="/orders"
                className="hidden sm:flex items-center gap-1 text-purple-950 hover:text-purple-700 transition"
                title="View Orders"
              >
                <span className="text-xl">📦</span>
                <span className="text-sm font-medium">Orders</span>
              </a>

              <a href="/cart" className="relative">
                <span className="text-2xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>

              <button
                className="bg-blue-600 text-white px-4 h-8 rounded-full text-sm hover:bg-blue-700 transition"
                onClick={signForm}>Sign-up</button>

              <button className="md:hidden text-black" onClick={toggleMenu}>
                {isOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden absolute top-20 inset-x-0 z-30`}>
        <div className="flex flex-col h-auto w-[90vw] mx-auto bg-white rounded-xl p-5 shadow-lg">
          <a className="py-3 text-[18px] text-purple-950 border-b" href="/">About</a>
          <a className="py-3 text-[18px] text-purple-950 border-b" href="/">Contact</a>
          <a className="py-3 text-[18px] text-purple-950 border-b" href="/">Pricing</a>
          <a className="py-3 text-[18px] text-purple-950" href="/orders">📦 Orders</a>
          <a className="py-3 text-[18px] text-purple-950" href="/cart">🛒 Cart ({cartCount})</a>
        </div>
      </div>

      <main className={`${isSign ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center bg-black/50 backdrop-blur-sm p-4`}>
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
          <h2 className="text-purple-950 text-[28px] font-bold text-center">Create Account</h2>

          <input
            type="email"
            placeholder="Enter Email"
            className="rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-purple-500"
            value={Temail}
            onChange={(e) => setTEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Name"
            className="rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-purple-500"
            value={Tname}
            onChange={(e) => setTName(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-purple-950 p-3 text-white font-semibold hover:bg-purple-800 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => setIsSign(false)}
            className="text-gray-500 text-sm hover:text-gray-700"
          >
            Cancel
          </button>
        </form>
      </main>

      <main className="p-5">
        <h1 className="text-3xl font-bold text-purple-950 mb-6 text-center">📚 Our Books</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white flex flex-col">
              <div className="h-48 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                {book.image ? (
                  <img src={book.image} alt={book.name} className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <span className="text-gray-400 text-4xl">📖</span>
                )}
              </div>

              <h2 className="text-xl text-purple-950 font-bold">{book.name}</h2>
              <p className="text-gray-600 mt-1">Type: {book.type}</p>
              <p className="text-gray-600">Price: ${book.price || 0}</p>
              <p className={`text-sm font-medium mt-1 ${book.available ? 'text-green-600' : 'text-red-600'}`}>
                {book.available ? "✓ In Stock" : "✗ Out of Stock"}
              </p>

              <button
                onClick={() => addToCart(book)}
                disabled={!book.available}
                className="mt-4 bg-purple-950 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <p className="text-center text-gray-500 py-10">Loading books...</p>
        )}
      </main>
    </div>
  );
}
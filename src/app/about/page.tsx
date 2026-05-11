"use client";
import { useState } from "react";
import { Inter, EB_Garamond } from 'next/font/google';
const inter = Inter({
    subsets: ['latin'],
});
const ebGaramond = EB_Garamond({
    subsets: ['latin'],
});
export default function Header() {
    const [isOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body>
                <div className="w-full bg-white shadow-sm border-b border-gray-100 font-sans">
                    <div className="hidden md:block w-full border-b border-gray-100 bg-[#F9F7F4]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between text-xs text-gray-500">
                            <div className="flex gap-6">
                                <span className="flex items-center gap-1.5">
                                    <i className="fa-solid fa-phone"></i>
                                    Call (805) 922-4109
                                </span>
                                <span>937 E Main St Ste 105, Santa Maria, CA</span>
                            </div>
                            <div>
                                <a href="" className="hover:text-gray-800 transition-colors">Get Directions</a>
                            </div>
                        </div>
                    </div>
                    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">

                            <div className="flex items-center gap-3 cursor-pointer">
                                <img className="h-15 w-30" src="img2.svg" alt="Kitto Dental Logo" />
                            </div>

                            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                                <a href="" className="hover:text-gray-900 transition-colors">Home</a>
                                <a href="" className="hover:text-gray-900 transition-colors">About</a>
                                <a href="" className="hover:text-gray-900 transition-colors">Team</a>
                                <a href="" className="hover:text-gray-900 transition-colors">Services</a>
                                <a href="" className="hover:text-gray-900 transition-colors">Contact</a>
                            </nav>
                            <div className="flex items-center gap-4 md:gap-6">
                                <a href="" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 ">
                                    <i className="fa-solid fa-phone"></i>
                                    (805) 922-4109
                                </a>

                                <button className="bg-[#d9675b] hover:bg-[#c45b50] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-md text-xs md:text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
                                    Schedule Online
                                </button>

                                <div className="md:hidden flex items-center">
                                    <button
                                        onClick={() => setIsMobileMenuOpen(!isOpen)}
                                        className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                                    >
                                        {isOpen ? (
                                            <span className="text-2xl font-light">✕</span>
                                        ) : (
                                            <span className="text-2xl">≡</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {isOpen && (
                            <div className="md:hidden border-t border-gray-100 py-4 pb-6 ">
                                <nav className="flex flex-col space-y-4 text-center text-sm font-medium text-gray-600">
                                    <a href="#" className="hover:text-gray-900">Home</a>
                                    <a href="#" className="hover:text-gray-900">About</a>
                                    <a href="#" className="hover:text-gray-900">Team</a>
                                    <a href="#" className="hover:text-gray-900">Services</a>
                                    <a href="#" className="hover:text-gray-900">Contact</a>
                                    <a href="tel:8059224109" className="pt-2 text-[#d9675b] font-bold no-underline "><i className="fa-solid fa-phone "></i> (805) 922-4109</a>
                                </nav>
                            </div>
                        )}
                    </header>
                    <div >
                        <section className="bg-[#F9F7F4] border border-gray-100 p-6 md:p-12 lg:p-16">
                            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

                                <div className="space-y-6 lg:space-y-8 font-serif text-black">
                                    <h1 className={`${ebGaramond.className} text-3xl  lg:text-4xl font-normal leading-tight lg:leading-snug`}>
                                        Santa Maria's <span className="text-gray-500"> gentle, trust-
                                            <br className="hidden lg:inline" />
                                            first family </span> <span className="italic">dentist.</span>
                                    </h1>

                                    <div className="space-y-4 text-black/90 font-sans font-normal text-[12px] md:text-[14px]">
                                        <p>Trusted for decades. Ready for whatever your smile needs next.</p>
                                        <p>At Kitto Dental, the goal is simple: help you feel confident in the chair and confident in the plan. We take our time, explain things clearly, and keep treatment honest and conservative.</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4  font-sans">
                                        <button className="bg-[#da6b5b] text-black h-10 w-35 rounded-md text-[14px] font-semibold">
                                            Schedule Online
                                        </button>
                                        <button className={` ${inter.className}  bg-white border text-black border-[#da6b5b] h-10 w-35   rounded-md text-[12px] font-semibold`}>
                                            Call (805) 922-4109
                                        </button>
                                        <a href="#" className="flex items-center text-[12px] h-10 w-30 font-semibold text-black sm:pl-4 ">
                                            New Patient Info
                                        </a>
                                    </div>
                                </div>

                                <div className=" rounded-3xl w-full h-full overflow-hidden border-white flex">
                                    <img className="w-full h-full object-cover block" src="img1.svg" alt="" />
                                </div>
                            </div>
                        </section>
                    </div>
                    <section className="bg-white py-16 px-4">
                        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                            <h2 className={` ${ebGaramond.className} font-serif text-3xl md:text-4xl text-gray-500 mb-4`}>
                                Meet <span className="italic text-black">your doctors</span> at Kitto Dental.
                            </h2>
                            <p className="font-sans text-gray-600 max-w-2xl mb-12 text-sm md:text-base leading-relaxed">
                                You'll always know what's going on and why. Our doctors share the same approach:
                                explain things clearly, keep recommendations conservative, and make sure you feel
                                comfortable every step of the way.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6 w-full mb-12">




                                <div className="flex flex-col bg-white border border-gray-200 rounded-lg w-63 shadow-sm">
                                    <div className="bg-[#F9F7F4] w-full h-75 rounded-lg mb-4"></div>
                                    <div className="text-left pl-3 h-38 pr-3">
                                        <h3 className="font-serif text-lg font-medium text-black">Dr. Robert Kitto</h3>
                                        <p className="font-sans text-xs font-bold text-gray-500 mb-2">DDS</p>
                                        <p className="font-sans text-sm text-gray-600">Founder. The standard we hold ourselves to.</p>
                                    </div>
                                </div>





                                <div className="flex flex-col bg-white border border-gray-200 rounded-lg w-63 shadow-sm">
                                    <div className="bg-[#F9F7F4] w-full h-75 rounded-lg mb-4"></div>
                                    <div className="text-left pl-3 pr-3 h-38">
                                        <h3 className="font-serif text-lg font-medium text-black">Dr. Ashley Kitto Channer</h3>
                                        <p className="font-sans text-xs font-bold text-gray-500 mb-2">DDS</p>
                                        <p className="font-sans text-sm text-gray-600">Modern, attentive care with a calm, personal approach.</p>
                                    </div>
                                </div>





                                <div className="flex flex-col bg-white border border-gray-200 rounded-lg w-63 shadow-sm">
                                    <div className="bg-[#F9F7F4] w-full h-75 rounded-lg mb-4"></div>
                                    <div className="text-left pl-3 pr-3 h-38">
                                        <h3 className="font-serif text-lg font-medium text-black">Dr. Alanna Huth</h3>
                                        <p className="font-sans text-xs font-bold text-gray-500 mb-2">DDS</p>
                                        <p className="font-sans text-sm text-gray-600">Gentle, thorough, and focused on long-term oral health.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col bg-white border border-gray-200 rounded-lg w-63 shadow-sm">
                                    <div className="bg-[#F9F7F4] w-full h-75 rounded-lg mb-4"></div>
                                    <div className="text-left pl-3 pr-3 h-38">
                                        <h3 className="font-serif text-lg font-medium text-black">Dr. Jonathan Pak</h3>
                                        <p className="font-sans text-xs font-bold text-gray-500 mb-2">DDS</p>
                                        <p className="font-sans text-sm text-gray-600 pb-4">Steady-handed, detail-driven, and clear in every recommendation.</p>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-col items-center space-y-6">
                                <p className="font-sans font-bold text-sm text-black">Same values. Same team. Care you can feel good about.</p>
                                <div className="flex flex-row gap-4">
                                    <button className="border border-black px-6 py-2 rounded-md font-sans text-sm font-bold text-black">
                                        Meet the Team
                                    </button>
                                    <button className="bg-[#da6b5b] text-black px-6 py-2 rounded-md font-sans text-sm font-bold hover:bg-[#bf5a4d] transition-all">
                                        Schedule Online
                                    </button>
                                </div>
                            </div>

                        </div>
                    </section>
                    <section className="bg-[#F9F7F4] py-16 px-6 p-6 md:p-12 lg:p-16">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

                            <div className="flex-1 space-y-6">
                                <h2 className="font-serif text-3xl md:text-4xl pb-3 text-black leading-tight">
                                    Honest dentistry. Gentle hands. No pressure.
                                </h2>

                                <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed">
                                    For more than 40 years, patients have come here because they want a dentist who listens and tells the truth. We’ll show you what we see, answer your questions, and recommend the simplest path that protects your long-term health.
                                </p>

                                <ul className="space-y-4 font-sans text-sm text-gray-700">
                                    <li className="flex items-center gap-3">
                                        <span className="text-[#da6b5b]"><i className="fa-solid fa-shield"></i></span> Conservative, patient-first recommendations
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-[#da6b5b]"><i className="fa-regular fa-camera-retro"></i></span> Clear explanations with photos and visuals when helpful
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-[#da6b5b]"><i className="fa-regular fa-heart"></i></span> Comfort-focused care for anxious patients
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-[#da6b5b]"><i className="fa-solid fa-user-group"></i></span> A familiar team that knows this community
                                    </li>
                                </ul>

                                <button className="bg-[#da6b5b] text-black px-8 py-3 rounded-md font-sans font-bold text-sm hover:bg-[#c35a4d] transition-colors">
                                    Request an Appointment
                                </button>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="rounded-4xl overflow-hidden ">
                                    <img src="img3.svg" alt="Happy family" className="w-full h-full object-cover" />
                                </div>
                            </div>

                        </div>
                    </section>

                    <section className="bg-[#f3f3f1] py-20 px-6 font-sans">
                        <div className="max-w-6xl mx-auto flex flex-col items-center">

                            <div className="text-center mb-16">
                                <h2 className={` ${ebGaramond.className} font-serif text-2xl md:text-3xl text-gray-800 leading-tight`}>
                                    <span className="text-gray-500">Everything from</span><span className="italic"> cleanings to crowns</span>, plus more<br />
                                    <span className=" italic">advanced options</span><span className="text-gray-500"> when you need them.</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 w-full mb-12">

                                <a href="" className="bg-[#e9e9e7] p-8 rounded-2xl w-full sm:w-88 lg:w-85 flex flex-col items-center text-center">
                                    <img className="h-10 w-10" src="s1.svg" alt="s1" />
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Preventive care</h3>
                                    <p className="text-gray-600 text-sm">Exams, cleanings, digital imaging</p>
                                </a>

                                <a href="" className="bg-[#e9e9e7] p-8 rounded-2xl w-full sm:w-88 lg:w-85 flex flex-col items-center text-center">
                                    <img className="h-10 w-10" src="s2.svg" alt="s2" />
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Restorative care</h3>
                                    <p className="text-gray-600 text-sm">Fillings, crowns, bridges</p>
                                </a>

                                <a href="" className="bg-[#e9e9e7] p-8 rounded-2xl w-full sm:w-88 lg:w-85 flex flex-col items-center text-center">
                                    <img className="h-10 w-10" src="s3.svg" alt="s3" />
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Cosmetic care</h3>
                                    <p className="text-gray-600 text-sm">Whitening, bonding, smile makeovers</p>
                                </a>

                                <a href="" className="bg-[#e9e9e7] p-8 rounded-2xl w-full sm:w-88 lg:w-85 flex flex-col items-center text-center">
                                    <img className="h-10 w-10" src="s4.svg" alt="s4" />
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Advanced options</h3>
                                    <p className="text-gray-600 text-sm">Dental implants, orthodontic options, sedation options</p>
                                </a>

                                <a href="" className="bg-[#e9e9e7] p-8 rounded-2xl w-full sm:w-88 lg:w-85 flex flex-col items-center text-center">
                                    <div className="relative mb-4">
                                        <img className="h-10 w-10" src="s5.svg" alt="s5" />
                                        <i className="fa-solid fa-circle-exclamation text-red-600 text-xl absolute -right-2 -bottom-1"></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Emergency visits</h3>
                                    <p className="text-gray-600 text-sm">Help when pain shows up uninvited</p>
                                </a>

                            </div>

                            <button className="border border-gray-800 px-10 py-3 rounded-xl font-bold text-sm text-black">
                                View All Services
                            </button>

                        </div>
                    </section>
                    <section className="bg-[#8b7e6d] py-16 px-6">
                        <div className="max-w-7xl mx-auto text-center text-white mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif mb-4">A first visit that feels simple.</h2>
                            <p className="max-w-3xl mx-auto text-white/80 text-sm md:text-base leading-relaxed">
                                We'll start with your goals, review your history, take any needed images, and walk you through what we find in plain language. You'll leave with clarity, options, and a plan that makes sense.
                            </p>
                        </div>

                        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">

                            <div className="flex-1 max-w-63 bg-white/10 border border-white/20 p-8 rounded-3xl flex flex-col items-start text-left text-white">
                                <div className="w-10 h-10 bg-[#fa8167] rounded-full flex items-center justify-center font-bold mb-6">1</div>
                                <h3 className="text-xl font-serif mb-2">Your Goals</h3>
                                <p className="text-white/70 text-sm">We start by listening to what matters to you</p>
                            </div>

                            <div className="flex-1 max-w-63 bg-white/10 border border-white/20 p-8 rounded-3xl flex flex-col items-start text-left text-white">
                                <div className="w-10 h-10 bg-[#fa8167] rounded-full flex items-center justify-center font-bold mb-6">2</div>
                                <h3 className="text-xl font-serif mb-2">Digital Imaging</h3>
                                <p className="text-white/70 text-sm">Clear visuals to show you what we see</p>
                            </div>

                            <div className="flex-1 max-w-63 bg-white/10 border border-white/20 p-8 rounded-3xl flex flex-col items-start text-left text-white">
                                <div className="w-10 h-10 bg-[#fa8167] rounded-full flex items-center justify-center font-bold mb-6">3</div>
                                <h3 className="text-xl font-serif mb-2">Clear Plan</h3>
                                <p className="text-white/70 text-sm">Options explained in plain language</p>
                            </div>

                        </div>

                        <div className="mt-12 text-center">
                            <button className="bg-[#fa8167] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e0725a] transition-colors">
                                Book Your First Visit
                            </button>
                        </div>
                    </section>
                    <section className="bg-[#f5f5f5] py-16 px-10  p-8 md:p-16 lg:p-20">
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-8">

                            <div className="flex-1 bg-white p-8 md:p-12  rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-serif text-gray-800 mb-8">Visit Us in Santa Maria</h2>

                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="text-[#da6b5b] text-xl mt-1">
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Address</h3>
                                            <p className="text-gray-600">937 E Main St Ste 105</p>
                                            <p className="text-gray-600">Santa Maria, CA 93454</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="text-[#da6b5b] text-xl mt-1">
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Phone</h3>
                                            <p className="text-gray-600">(805) 922-4109</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="text-[#da6b5b] text-xl mt-1">
                                            <i className="fa-solid fa-clock"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Hours</h3>
                                            <p className="text-gray-600">Monday: 8:00 AM - 6:00 PM</p>
                                            <p className="text-gray-600">Tuesday - Friday: 7:30 AM - 5:00 PM</p>
                                            <p className="text-gray-600">Saturday - Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 flex flex-wrap gap-3  ">
                                    <button className="flex-1 min-w-35 border border-gray-900 text-black font-bold py-3 rounded-xl  text-sm">
                                        Get Directions
                                    </button>
                                    <button className="flex-1 min-w-35 border border-[#da6b5b] text-black font-bold py-3 rounded-xl  text-sm">
                                        Call Now
                                    </button>
                                    <button className="flex-1 min-w-35 bg-[#da6b5b]  font-bold text-black py-3 rounded-xl  text-sm ">
                                        Schedule Online
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1  rounded-3xl overflow-hidden ">
                                <img src="map.svg" alt="Location Map" className="w-full h-full object-cover" />
                            </div>

                        </div>
                    </section>
                    <footer className="bg-[#2d2922] text-white/80 py-12 px-10  p-8 md:p-16 lg:px-20 font-sans">
                        <div className="max-w-7xl mx-auto">

                            <div className="flex flex-col md:flex-row flex-wrap justify-between gap-10 mb-12">

                                <div className="max-w-xs space-y-4">
                                    <img src="aa.svg" alt="Kitto Dental Logo" className="h-10 w-auto text-white " />
                                    <p className="text-sm text-[#C9B899] leading-relaxed">
                                        Santa Maria's gentle, trust-first family dentist. Trusted for decades.
                                    </p>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-phone text-xs"></i>
                                        <span>(805) 922-4109</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <i className="fa-solid fa-location-dot text-xs mt-1"></i>
                                        <span>937 E Main St Ste 105<br />Santa Maria, CA 93454</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 text-sm">
                                    <i className="fa-solid fa-clock text-xs mt-1"></i>
                                    <div className="text-[#C9B899]">
                                        <p>Mon: 8:00 AM - 6:00 PM</p>
                                        <p>Tue-Fri: 7:30 AM - 5:00 PM</p>
                                        <p>Sat-Sun: Closed</p>
                                    </div>
                                </div>

                                <nav className="flex flex-col gap-3 text-sm">
                                    <a href="/" className="hover:text-white transition-colors">Home</a>
                                    <a href="/about" className="hover:text-white transition-colors">About Us</a>
                                    <a href="/team" className="hover:text-white transition-colors">Meet the Team</a>
                                    <a href="/services" className="hover:text-white transition-colors">Services</a>
                                    <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                                </nav>
                            </div>

                            <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40">
                                <p>© 2026 Kitto Dental. All rights reserved.</p>
                            </div>

                        </div>
                    </footer>
                </div>

            </body>
        </html>

    );
}
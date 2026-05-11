



export default function Contact() {
    return (
        <div className=" text-black bg-white" >
            <header className="py-10 flex justify-between ">
                <div className="flex justify-evenly gap-6 ml-7 lg:gap-8 lg:ml-8 xl:gap-10 xl:ml-9">
                    <a href="">
                        <img className="cursor-pointer border-none focus:outline-none lg:mr-6" src="logo.svg" alt="logo" />
                    </a>
                    <a className="cursor-pointer pt-2 text-gray-600 xl:ml-2" href="">Features</a>
                    <a className="cursor-pointer pt-2 text-gray-600 xl:ml-2" href="">Testimonials</a>
                    <a className="cursor-pointer pt-2 text-gray-600 xl:ml-2" href="">Pricing</a>
                </div>
                <div className="mr-7 lg:mr-8 xl:mr-9">
                    <a className="cursor-pointer text-gray-600" href="">Sign in</a>
                    <button className="bg-blue-700 h-10 w-28 rounded-full text-white font-bold ml-10 lg:ml-12 xl:ml-15 cursor-pointer lg:w-42 "><span className="hidden lg:inline">Get Started today</span><span className="lg:hidden">Get Started</span></button>
                </div>
            </header>
            <div className="max-w-4xl mx-auto mt-30 px-8  text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">Accounting {" "}
                    <span className="relative inline-block">
                        <span className="relative whitespace-nowrap  z-10 text-blue-700">
                            made simple
                        </span>
                        <img className="absolute left-0 w-full z-0 -bottom-2" src="line.svg" alt="" />
                    </span>
                    {" "}  for small businesses.
                </h1>
                <p className="text-gray-600 px-auto mt-10 md:text-[16px] lg:text-[18px]">Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don't get audited.</p>
                <div className="mt-10 flex gap-7 justify-center">
                    <button className="h-10 w-37 text-sm bg-black text-white px-1 rounded-full"><a href="">Get 6 months free</a></button>
                    <button className="h-10 w-37 border border-solid border-gray-600 rounded-full px-1 text-sm"><a href="">Watch Video</a></button>
                </div>
                <p className="mt-40 mb-15">Trusted by these six companies so far</p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 xl:flex-nowrap  ">
                    <img className="w-auto" src="Transistor.svg" alt="" />
                    <img className="w-auto" src="Tuple.svg" alt="" />
                    <img className="w-auto" src="StaticKit.svg" alt="" />
                    <img className="w-auto" src="Mirage.svg" alt="" />
                    <img className="w-auto" src="Laravel.svg" alt="" />
                    <img className="w-auto" src="Statamic.svg" alt="" />
                </div>
            </div>

            <div className="bg-blue-600 pb-30">
                <div className="mt-20 mx-auto mb-20 text-white md:text-center w-[60vw] ">
                    <h2 className="pt-20 sm:text-3xl md:text-4xl lg:text-5xl mb-10  ">Everything you need to run your books.</h2>
                    <p className="md:text-[18px] xl:text-[20px] ">Well everything you need if you aren't that picky about minor details like tax compliance.</p>
                </div>
                <div className="bg-blue-400 mx-5 rounded-xl pt-10">
                    <div className=" mx-10  flex justify-center gao-x-12 ">
                        <button className="h-10 w-20 text-sm lg:text-[18px] lg:w-30 text-blue-600 bg-white px-1 rounded-full"><a href="">Payroll</a></button>
                        <button className="h-10 w-30 text-white lg:text-[18px] ml-8 mr-6 lg:w-36 rounded-full px-1 text-sm"><a href="">Claim expenses</a></button>
                        <button className="h-10 w-30 text-white lg:text-[18px] lg:w-34 rounded-full px-1 text-sm"><a href="">VAT handling</a></button>
                        <button className="h-10 w-30 text-white lg:text-[18px] lg:w-34 rounded-full px-1 text-sm"><a href="">Reporting</a></button>
                    </div>
                    <div className="w-full flex justify-center mb-5 mt-10">
                        <p className="md:text-[18px] w-[50vw] xl:text-[20px] text-center text-white ">Keep track of everyone's salaries and whether or not they've been paid. Diresct deposit not supportedd.</p>
                    </div>
                    <div className="">
                        <img className="rounded-2xl" src="payroll.webp" alt="payroll-webp" />
                    </div>
                </div>
            </div>
            <div className="mb-30">
                <div className="mt-20 mx-auto mb-20  md:text-center w-[60vw] ">
                    <h2 className="pt-20 sm:text-3xl md:text-4xl lg:text-5xl mb-10  ">Simplify everyday business tasks.</h2>
                    <p className="md:text-[18px] xl:text-[20px] ">Because you'd probably be a little confused if we suggested you complicate your everyday business tasks instead.</p>
                </div>
                <div className="mx-6 flex gap-x-6 flex-wrap">
                    <div className="w-[45vw] xl:w-[30vw] mb-10" >
                        <button className="bg-blue-600 rounded-lg mb-8" >
                            <img className="" src="short-logo4.svg" alt="" />
                        </button>
                        <h4 className="text-blue-600 mb-3" >Reporting</h4>
                        <h3 className="text-[18px] lg:text-[22px] font-bold mb-4" >Stay on top of things with always up-to-date reporting features.</h3>
                        <p className="text-gray-500" >We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.</p>
                    </div>
                    <div className="w-[45vw] xl:w-[30vw] mb-10" >
                        <button className="bg-gray-600 rounded-lg mb-8" >
                            <img className="" src="short-logo2.svg" alt="" />
                        </button>
                        <h4 className="text-gray-600 mb-3" >Inventory</h4>
                        <h3 className="text-[18px] lg:text-[22px] font-bold text-gray-600 mb-4" >Never lose track of what's in stock with accurate inventory tracking.</h3>
                        <p className="text-gray-500" >We don't offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.</p>
                    </div>
                    <div className="w-[45vw] xl:w-[30vw] mb-10" >
                        <button className="bg-gray-600 rounded-lg mb-8" >
                            <img className="" src="short-logo3.svg" alt="" />
                        </button>
                        <h4 className="text-gray-600 mb-3" >Contacts</h4>
                        <h3 className="text-[18px] lg:text-[22px] font-bold text-gray-600 mb-4" >Organize all of your contacts, service providers, and invoices in oneontacts place.</h3>
                        <p className="text-gray-500" >This also isn't actually a feature, it's just some friendly advice. We definitely recommend that you do this, you'll feel really organized and professional.</p>
                    </div>
                </div>
                <div className="mx-7 p-15 bg-gray-300 rounded-4xl">
                    <img className="rounded-2xl" src="profit-loss.webp" alt="" />
                </div>
            </div>
            <div className="bg-[#1e96fc]  pb-8">
                <div className="mt-20 mx-auto mb-20 text-white md:text-center w-[60vw] pt-10 ">
                    <h2 className="pt-20 sm:text-3xl md:text-4xl lg:text-5xl mb-10  ">Get started today</h2>
                    <p className="md:text-[15px] xl:text-[16px] ">It's time to take control of your books. Buy our software so you can feel like you're doing something productive.</p>
                    <button className="h-10 w-37 text-sm bg-white text-blue-950 font-bold mt-10 px-1 rounded-full"><a href="">Get 6 months free</a></button>
                </div>
            </div>
            <div className="bg-gray-50 ">
                <div className="mt-20 mx-auto mb-20  md:text-center w-[60vw] pt-10 ">
                    <h2 className="pt-20 sm:text-3xl md:text-4xl lg:text-5xl mb-10  ">Loved by businesses worldwide.</h2>
                    <p className="md:text-[15px] xl:text-[16px] ">Our software is so simple that people can't help but fall in love with it. Simplicity is easy when you just skip tons of mission-critical features.</p>
                </div>
                <div className="flex flex-wrap  lg:gap-x-6 lg:ml-7  pb-25">



                    <div className="w-full flex justify-center  lg:w-[30vw]  ">
                        <div className="w-[80vw] bg-white p-8 rounded-2xl mt-10">
                            <p className="md:text-[17px] mb-6">TaxPal is so easy to use I can't help but wonder if it's really doing the things the government expects me to do.</p>
                            <hr />
                            <div className="flex justify-between mt-6">
                                <div>
                                    <h4>Sheryl Berge</h4>
                                    <p className="md:text-[15px] xl:text-[16px] text-gray-600 mt-2">CEO at Lynch LLC</p>
                                </div>
                                <img className="rounded-full h-9 w-9" src="avatar-1.webp" alt="" />
                            </div>
                        </div>
                    </div>



                    <div className="w-full flex justify-center  lg:w-[30vw]  ">
                        <div className="w-[80vw] bg-white p-8 rounded-2xl mt-10">
                            <p className="md:text-[17px] mb-6 ">I'm trying to get a hold of someone in support, I'm in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.</p>
                            <hr />
                            <div className="flex justify-between mt-6">
                                <div>
                                    <h4>Amy Hahn</h4>
                                    <p className="md:text-[15px] xl:text-[16px] text-gray-600 mt-2">Director at Velocity Industries</p>
                                </div>
                                <img className="rounded-full h-9 w-9" src="avatar-2.webp" alt="" />
                            </div>
                        </div>
                    </div>






                    <div className="w-full flex justify-center  lg:w-[30vw]  ">
                        <div className="w-[80vw] bg-white p-8 rounded-2xl mt-10">
                            <p className="md:text-[17px] mb-6">There are so many things I had to do with my old software that I just don't do at all with TaxPal. Suspicious but I can't say I don't love it.</p>
                            <hr />
                            <div className="flex justify-between mt-6">
                                <div>
                                    <h4>Erin Powlowski</h4>
                                    <p className="md:text-[15px] xl:text-[16px] text-gray-600 mt-2">COO at Armstrong Inc</p>
                                </div>
                                <img className="rounded-full h-9 w-9" src="avatar-4.webp" alt="" />
                            </div>
                        </div>
                    </div>



                    <div className="w-full flex justify-center  lg:w-[30vw]   ">
                        <div className="w-[80vw] bg-white p-8 rounded-2xl mt-10">
                            <p className="md:text-[17px] mb-6">The best part about TaxPal is every time I pay my employees, my bank balance doesn't go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.</p>
                            <hr />
                            <div className="flex justify-between mt-6">
                                <div>
                                    <h4>Leland Kiehn</h4>
                                    <p className="md:text-[15px] xl:text-[16px] text-gray-600 mt-2">Founder of Kiehn and Sons</p>
                                </div>
                                <img className="rounded-full h-9 w-9" src="avatar-3.webp" alt="" />
                            </div>
                        </div>
                    </div>



                    <div className="w-full flex justify-center lg:w-[30vw] ">
                        <div className="w-[80vw] bg-white p-8 rounded-2xl mt-10">
                            <p className="md:text-[17px] mb-6">I used to have to remit tax to the EU and with TaxPal I somehow don't have to do that anymore. Nervous to travel there now though.</p>
                            <hr />
                            <div className="flex justify-between mt-6">
                                <div>
                                    <h4>Peter Renolds</h4>
                                    <p className="md:text-[15px] xl:text-[16px] text-gray-600 mt-2">Founder of West Inc</p>
                                </div>
                                <img className="rounded-full h-9 w-9" src="avatar-5.webp" alt="" />
                            </div>
                        </div>
                    </div>



                    <div className="w-full flex justify-center lg:w-[30vw] ">
                        <div className="w-[80vw] bg-white p-8 rounded-2xl mt-10">
                            <p className="md:text-[17px] mb-6">This is the fourth email I've sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.</p>
                            <hr />
                            <div className="flex justify-between mt-6">
                                <div>
                                    <h4>Amy Hahn</h4>
                                    <p className="md:text-[15px] xl:text-[16px] text-gray-600 mt-2">Director at Velocity Industries</p>
                                </div>
                                <img className="rounded-full h-9 w-9" src="avatar-2.webp" alt="" />
                            </div>
                        </div>
                    </div>



                </div>
                <div className="bg-blue-950 ">
                    <div className="pt-30 text-center pb-20">
                        <h2 className="text-4xl text-white md:text-5xl  tracking-tight leading-[1.1]">
                            <span className="relative inline-block">
                                <span className="relative whitespace-nowrap  z-10 text-white">
                                    Simple pricing
                                </span>
                                <img className="absolute left-0 w-full z-0 -bottom-2" src="line-2.svg" alt="" />
                            </span>
                            {" "}  for everyone.
                        </h2>
                        <p className="text-gray-400 px-auto mt-10 md:text-[16px] lg:text-[18px]">It doesn't matter what size your business is, our software won't work well for you.</p>
                    </div>
                    <div>
                        <div className="w-[70vw]">
                            <p className="text-5xl md:text-6xl text-white">$9</p>
                            <h3 className="text-[18px] text-white mt-8">Starter</h3>
                            <p className="text-gray-400 px-auto mt-5 md:text-[16px] lg:text-[18px]">Good for anyone who is self-employed and just getting started.</p>
                            <button className="h-10 w-50 mt-5 text-sm bg-blue-950 border border-solid border-gray-400 text-white px-1 rounded-full"><a href="">Get 6 months free</a></button>
                            <i className="fa-regular fa-circle-check"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}







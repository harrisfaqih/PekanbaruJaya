import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePayNow = async () => {
    console.log("Tombol Pay Now diklik"); // Log untuk memastikan fungsi dipanggil
    console.log("Order ID:", orderId); // Log untuk memeriksa orderId
    if (!orderId) {
      console.error("Order ID tidak ditemukan!");
      return; // Hentikan eksekusi jika orderId tidak ada
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/order/confirm/${orderId}`
      );
      console.log("Response dari API:", response.data); // Log respons dari API
      if (response.status === 200) {
        // Tambahkan logika untuk menampilkan notifikasi sukses jika perlu
        alert("Pembayaran berhasil diproses!"); // Contoh notifikasi
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memproses pembayaran:", error); // Log error
    }
  };

  return (
    <div>
      <Header />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 ">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "cod" ? "bg-white" : "bg-slate-100"
                    } `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/cod.jpg"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-600">COD</span>
                  </div>
                </div>

                {paymentMethod === "cod" && (
                  <div className="w-full px-4 py-8 bg-white shadow-sm">
                    <button
                      onClick={handlePayNow}
                      className="px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-blue-500 text-white"
                    >
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2 className="font-bold text-lg">Order Summary </h2>
                  <div className="flex justify-between items-center">
                    <span>{items} Items and Shipping Fee Included </span>
                    <span>${price} </span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount </span>
                    <span className="text-lg text-green-600">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;

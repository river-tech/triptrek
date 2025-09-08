"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Travel() {
  const promotions = [
    {
      id: 1,
      title: "Welcome to Quảng Bình",
      img: "/promo1.jpg",
    },
    {
      id: 2,
      title: "Hello Hong Kong",
      img: "/promo2.jpg",
    },
    {
      id: 3,
      title: "Khám phá Tây Bắc",
      img: "/promo3.jpg",
    },
  ];
  const router = useRouter();
  return (
    <section id="travel" className="py-16 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-sky-500 mb-2">DU LỊCH</h2>
        <p className="text-gray-600 mb-8">
          Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn
        </p>

        {/* Grid Promotions */}
        <div className="grid md:grid-cols-3 gap-8">
          {promotions.map((item) => (
            <div
            onClick={()=>router.push(`/dashboard/tourDetail/${item.title}`)}
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={250}
                className="w-full h-[200px] object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <Link
            href="/dashboard/travel"
            className="relative overflow-hidden px-6 py-3 rounded-full font-medium text-white 
               bg-sky-400 transition-all duration-500 ease-out
               hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600"
          >
            <span className="relative z-10">Khám phá hành trình mơ ước của bạn →</span>
            {/* Overlay chạy hiệu ứng sáng */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

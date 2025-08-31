"use client";
import Image from "next/image";
import Link from "next/link";

export default function Food() {
  const foods = [
    {
      id: 1,
      title: "Bún chả Hàng Quạt",
      img: "/food1.jpg",
    },
    {
      id: 2,
      title: "Bánh xèo miền Trung",
      img: "/food2.jpg",
    },
    {
      id: 3,
      title: "Phở Hà Nội",
      img: "/food3.jpg",
    },
  ];

  return (
    <section id="food" className="py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-sky-500 mb-2">
          ẨM THỰC
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Những món ngon đặc sản không thể bỏ qua khi đi du lịch
        </p>

        {/* Grid layout */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* Ảnh lớn bên trái */}
          <div className="md:col-span-2 relative  transition transform hover:-translate-y-2">
            <Image
              src={foods[0].img}
              alt={foods[0].title}
              width={800}
              height={500}
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />
            <p className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-md">
              {foods[0].title}
            </p>
          </div>

          {/* Hai ảnh nhỏ bên phải */}
          <div className="flex flex-col gap-6">
            {foods.slice(1).map((item) => (
              <div key={item.id} className="relative  transition transform hover:-translate-y-2">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="w-full h-[190px] object-cover rounded-2xl shadow-lg"
                />
                <p className="absolute bottom-3 left-3 text-white font-medium drop-shadow-md">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        {/* Button */}
        
      </div>
    </section>
  );
}

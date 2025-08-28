"use client";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
// import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start ">
        {/* Left: Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            GIỚI THIỆU <span className="text-sky-500">TripTrek</span>
          </h2>
          <p className="mb-6 leading-relaxed">
            Cung cấp các tour chất lượng 4-5 sao, ấn tượng với nhiều điểm đến
            trong & ngoài nước. Mang đến cho bạn trải nghiệm tuyệt vời. Ngoài ra
            chúng tôi còn cung cấp các hình thức du lịch cho công ty, doanh
            nghiệp, khách đoàn như: Tour theo chủ đề sự kiện, hội nghị, hội
            thảo, lễ hội, văn hóa, nghỉ dưỡng, du lịch sinh thái, tour
            trekking...
          </p>

          <div className="border-t-4 border-black w-20 mb-6"></div>

          <h3 className="text-xl font-bold mb-4">
            VÌ SAO NÊN CHỌN <span className="text-sky-500">TripTrek</span>
          </h3>

          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-sky-500 w-5 h-5"
              />
              <span>Trải nghiệm du lịch toàn diện</span>
            </li>
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-sky-500 w-5 h-5"
              />
              <span>Tiết kiệm thời gian và chi phí</span>
            </li>
            <li className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-sky-500 w-5 h-5"
              />
              <span>Kết nối với các tour du lịch chất lượng</span>
            </li>
          </ul>
        </div>

        {/* Right: Hình ảnh */}
        <div className="relative ml-20 flex justify-center items-center">
          {/* Stack ảnh */}
          <div className="absolute top-0 left-10 rotate-[-6deg]">
            <Image
              src="/About1.jpg"
              alt="Mountain"
              width={220}
              height={150}
              className="w-[220px] h-[150px] rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="absolute top-20 left-50 rotate-3">
            <Image
              src="/About2.jpg"
              alt="Beach"
              width={220}
              height={150}
              className="w-[220px] h-[150px] rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="absolute top-36 left-20 rotate-[-2deg]">
            <Image
              src="/About3.jpg"
              alt="City"
              width={220}
              height={150}
              className="w-[220px] h-[150px] rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

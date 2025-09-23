import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { IFamousDestination } from "@/model/destination";
import { useRouter } from "next/navigation";

const FamousDestination = ({items}: {items: IFamousDestination[]}) => {
    const router = useRouter();
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-[36px] sm:text-[42px] font-extrabold text-sky-500 mb-8">
        Các địa điểm thu hút nhất Việt Nam
        </h2>

        <div className="relative">
          <button aria-label="Trước" className="dest-prev hover:scale-105 cursor-pointer hover:bg-sky-500/20 hover:text-white absolute -left-20 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow ring-1 ring-black/5 flex items-center justify-center">
            <FontAwesomeIcon className='text-sky-500 hover:text-white' icon={faChevronLeft} />
          </button>
          <button aria-label="Sau" className="dest-next hover:scale-105 cursor-pointer hover:bg-sky-500/20 hover:text-white absolute -right-20 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow ring-1 ring-black/5 flex items-center justify-center">
            <FontAwesomeIcon className='text-sky-500 hover:text-white' icon={faChevronRight} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: '.dest-prev', nextEl: '.dest-next' }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 24 }
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div onClick={() => router.push(`/destination/${item.id}`)} className="flex flex-col items-center m-4 hover:scale-105 transition-all duration-300">
                  <div className="relative w-full aspect-square max-w-[260px] rounded-2xl overflow-hidden shadow-lg mx-auto">
                    <Image
                      src={item.imageURL}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 80vw, 260px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 text-xl font-semibold text-gray-800">{item.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </section>     
    )
}

export default FamousDestination
             
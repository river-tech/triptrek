"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faTicket } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";

export default function Navbar() {
  const { getToken } = useAuth();
  const { getProfile } = useProfile();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navItems = [
    { name: "Trang chủ", href: "#home" },
    { name: "Giới thiệu", href: "#about" },
    { name: "Du lịch", href: "#travel" },
    { name: "Ẩm thực", href: "#food" },
    { name: "Liên hệ", href: "#footer" },
  ];

  const [state, updateState] = useImmer({
    activeItem: navItems[0].href,
    isVisible: true,
    lastScrollY: 0
  });
  const [token, setToken] = useState<string | null>(null);

  const pathname = usePathname();
  const isNotHome = pathname !== "/";

  // Lắng nghe sự kiện popstate để refresh lại navbar khi back/forward
  useEffect(() => {
    const handlePopState = () => {
      // Refresh lại token và profile khi back/forward
      setToken(getToken());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line
  }, [getToken]);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setAvatar(profile?.avatar);
      setUsername(profile?.username);
    };
    fetchProfile();
  }, [token, getProfile]);

  useEffect(() => {
    setToken(getToken());
  }, [getToken, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Ẩn navbar khi cuộn xuống, hiện khi cuộn lên
      if (currentScrollY > state.lastScrollY && currentScrollY > 100) {
        updateState(draft => {
          draft.isVisible = false;
        });
      } else {
        updateState(draft => {
          draft.isVisible = true;
        });
      }
      updateState(draft => {
        draft.lastScrollY = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [state.lastScrollY, updateState]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateState(draft => {
              draft.activeItem = `#${entry.target.id}`;
            });
          }
        });
      },
      { threshold: 0.6 } // 60% section visible mới active
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [updateState]);

  return (
        <nav 
          className={`fixed ${isNotHome && 'hidden'} top-0 left-0 w-full bg-[#33333380] backdrop-blur-sm text-white shadow-md z-50 transition-transform duration-300 ease-in-out ${
            state.isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex flex-col items-center justify-center w-[100px] h-16">
                <div className="w-full h-0.5 bg-white"></div>
                <span className="text-xl py-1 font-extrabold">TripTrek</span>
                <div className="w-full h-0.5 bg-white"></div>
              </div>
    
              {/* Menu items */}
              <div className="hidden md:flex space-x-8 text-lg font-medium">
                {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`hover:text-sky-400 transition-colors duration-200 ${
                        state.activeItem === item.href ? "text-sky-400" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                ))}
              </div>
    
              {/* User profile */}
              <div className="flex items-center space-x-3 hidden md:flex">
                <Link className="flex items-center space-x-2 hover:text-sky-400 transition-colors duration-200" href="/dashboard/tourStore">
                  <FontAwesomeIcon icon={faTicket} />
                  <span className="hidden md:block">Đơn hàng</span>
                </Link>
                <Link className="flex items-center space-x-2 hover:text-sky-400 transition-colors duration-200" href="/dashboard/tourSelling">
                  <FontAwesomeIcon icon={faBuilding} />
                  <span className="hidden md:block">Doanh nghiệp</span>
                </Link>
                </div>
                
                <div className="flex items-center space-x-3">
                {
                  !token ? (
                   <div className="flex items-center space-x-3">
                  <Link href="/authen/signIn" className="px-4 hover:bg-sky-400 cursor-pointer py-2 text-white border border-sky-400 rounded-lg hover:bg-sky-400 hover:text-white transition-all duration-200">
                    <span>Đăng nhập</span>
                  </Link>
                  <Link href="/authen/signUp" className="px-4 hover:bg-sky-400 cursor-pointer py-2 text-white border border-sky-400 rounded-lg hover:bg-sky-400 hover:text-white transition-all duration-200">
                    <span>Đăng ký</span>
                  </Link>
                  </div>
                  ): (
                  <>
                   <Link href="/profile" className="flex items-center space-x-2">
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-sky-400 flex items-center justify-center bg-white"
                    >
                      <Image
                        src={avatar || "/defaultAvatar.jpg"}
                        alt=""
                        width={40}
                        height={40}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <span className="font-semibold">{username}</span>
                  </Link>
                  </>
                  )
                }
              </div>
            </div>
          </div>
        </nav>
  );
}
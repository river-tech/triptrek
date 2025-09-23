"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IUserAdmin } from "@/model/user";
import useAdmin from "@/hooks/useAdmin";



export default function AdminUserPage() {
  const { getallUsers } = useAdmin();
  const [users, setUsers] = useState<IUserAdmin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  // Mock data
 

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getallUsers();
    console.log(res);
    setUsers(res as unknown as IUserAdmin[]);
    setLoading(false);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mt-20 mx-auto px-6 py-10">
      {/* Title */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Quản lý người dùng
        </h1>
        <div className="w-24 h-1 bg-sky-500 mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-200 mt-3">
          Quản lý và theo dõi các tour du lịch trong hệ thống
        </p>
      </div>
      
      <div className="relative max-w-lg w-fulls mx-auto mb-8">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
        />
        <input
          type="text"
          placeholder="Tìm kiếm người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      {/* Users list */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          Tất cả người dùng
        </h2>
      </div>
      <div className="max-h-96 overflow-y-auto space-y-4 p-4 bg-white shadow-lg rounded-xl border border-gray-200">
        {users
          .map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 border-b last:border-none hover:bg-sky-50 transition rounded-lg"
            >
              {/* Avatar */}
              <img
                src={user.avatar}
                alt={user.username}
                className="w-14 h-14 rounded-full object-cover border shadow-sm"
              />

              {/* Info */}
              <div className="flex-1">
                <h1 className="font-semibold text-gray-800">{user.username}</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Date */}
             
            </div>
          ))}
      </div>
    </div>
  );
}
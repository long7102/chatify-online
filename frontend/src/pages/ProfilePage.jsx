import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale"; // Thêm locale để hiển thị tiếng Việt
import toast from "react-hot-toast";

const ProfilePage = () => {
  const {
    authUser,
    isUpdatingProfile,
    isDeleteProfile,
    updateProfile,
    deleteProfile,
  } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile();
      toast.success("Xóa tài khoản thành công!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra!");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-full pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Trang cá nhân</h1>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "../avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Đang tải..."
                : "Thay đổi avatar bằng cách nhấn vào nút camera"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Tên đăng nhập
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Địa chỉ email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Thông tin tài khoản</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Là thành viên từ</span>
                {authUser?.createdAt && (
                  <span>
                    {format(new Date(authUser.createdAt), "dd-MM-yyyy", {
                      locale: vi,
                    })} ({" "}
                    {formatDistanceToNow(new Date(authUser.createdAt), {
                      addSuffix: true,
                      locale: vi,
                    })})
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between py-2">
                <span>Trạng thái hoạt động</span>
                <span className="text-green-500">Trực tuyến</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span>Quản lý</span>
                <span
                  className="text-red-500 cursor-pointer"
                  onClick={handleOpenDeleteModal}
                >
                  Xóa tài khoản
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal xác nhận xóa tài khoản */}
      {isModalOpen && (
        <div className="modal modal-open flex items-center justify-center">
          <div className="modal-box rounded-lg shadow-lg border">
            <h3 className="font-bold text-xl text-center text-red-600">
              Xác nhận xóa tài khoản
            </h3>
            <p className="py-4 text-center">
              Bạn có chắc chắn muốn xóa tài khoản? <br />
              <span className="font-medium text-red-500">
                Hành động này không thể hoàn tác!
              </span>
            </p>
            <div className="modal-action flex justify-center gap-4">
              <button
                className="btn btn-error bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
                onClick={handleDeleteProfile}
                disabled={isDeleteProfile}
              >
                {isDeleteProfile ? (
                  <div className="flex items-center gap-2">
                    <span className="spinner-border spinner-border-sm"></span>
                    Đang xóa...
                  </div>
                ) : (
                  "Xóa"
                )}
              </button>
              <button
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition duration-300"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default ProfilePage;

 
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigninUp: false,
  isLogin: false,
  isUpdatingProfile: false,
  isDeleteProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/kiem-tra");
      set({ authUser: res.data });
      get().connectSocket()

    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/dang-ky", data);
      set({ authUser: res.data });
      toast.success("Đăng ký tài khoản mới thành công");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/dang-xuat");
      set({ authUser: null });
      toast.success("Đăng xuất thành công");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/dang-nhap", data);
      set({ authUser: res.data });
      toast.success("Đăng nhập thành công");

      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/cap-nhat-profile", data);
      set({ authUser: res.data });
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  deleteProfile: async () => {
    set({ isDeleteProfile: true });
    try {
      await axiosInstance.delete("/auth/xoa-profile");
      set({ authUser: null });
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isDeleteProfile: false });
    }
  },
  connectSocket: () => {
    const {authUser} = get()
    if(!authUser || get().socket?.connected) return

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      }
    })
    socket.connect()

    set({socket: socket})

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds})
    })
  },
  disconnectSocket:() => {
    if(get().socket?.connected) get().socket.disconnect()
      set({socket: null})
  }
}));

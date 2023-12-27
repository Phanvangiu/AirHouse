import React from "react";
import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const createUser = async (data) => {
  let response = await axiosClient.post("/signup", data);
  return response.data;
};

export const getUser = async () => {
  let response = await axiosClient.get("/user");
  return response.data;
};

export const onLogin = async (data) => {
  let response = await axiosClient.post("/login", data);
  return response.data;
};

export const onLogout = async () => {
  let response = await axiosClient.post("/logout");
};

export const getAdmin = async () => {
  let response = await axiosClient.get("admin");
  return response.data;
};

export const createAdmin = async (payload) => {
  let response = await axiosClient.post("admin/signup", payload);
  return response.data;
};

// react-query
export const UserQuery = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
  });

  return userQuery;
};

export const LoginUserMutation = (payload) => {
  const queryClient = useQueryClient();

  const userMutation = useMutation({
    mutationFn: onLogin,
    onSuccess: (data) => {
      localStorage.setItem("ACCESS_TOKEN", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return userMutation;
};

export const LoginAdminMutation = (payload) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userMutation = useMutation({
    mutationFn: onLogin,
    onSuccess: (data) => {
      if (data.user.user_type == 0) {
        localStorage.setItem("ACCESS_TOKEN", data.token);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate("/admin");
      }
    },
  });

  return userMutation;
};

export const LogoutUserMutation = () => {
  const queryClient = useQueryClient();

  const userMutation = useMutation({
    mutationFn: onLogout,
    onSuccess: () => {
      localStorage.removeItem("ACCESS_TOKEN");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return userMutation;
};

export const CreateUserMutation = (payload) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      localStorage.setItem("ACCESS_TOKEN", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return addMutation;
};

export const CreateAdminMutation = (payload) => {
  const userMutation = useMutation({
    mutationFn: (payload) => {
      return axiosClient.post("/admin/signup", payload);
    },
  });

  return userMutation;
};

const getUserById = async (query) => {
  const id = query.queryKey[1];
  const response = await axiosClient.get("/user/" + id);

  return response.data;
};

export const UserIdQuery = (id) => {
  const userQuery = useQuery({
    queryKey: ["user", id],
    queryFn: getUserById,
  });

  return userQuery;
};

const checkEmailUnique = async (email) => {
  const response = await axiosClient.get("check-email-unique", { params: { email: email } });
  return response.data;
};

export const CheckEmailMutation = () => {
  const checkMutation = useMutation({
    mutationFn: checkEmailUnique,
  });

  return checkMutation;
};

const signupGoogle = async (payload) => {
  const response = await axiosClient.post("google-signup", payload);
  return response.data;
};

export const SignUpGoogleMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signupGoogle,
    onSuccess: (data) => {
      localStorage.setItem("ACCESS_TOKEN", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return mutation;
};

const updateUser = async (payload) => {
  let response = await axiosClient.post("updateUser", payload);
  return response.data;
};

export const UpdateUserMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return mutation;
};

const updateImage = async (payload) => {
  let response = await axiosClient.post("uploadImageUser", payload);
  return response.data;
};

export const UpdateImageMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return mutation;
};

const onRegisterAdmin = async (payload) => {
  const response = await axiosClient.post("admin/signup", payload);
  return response.data;
};

export const RegisterAdminMutation = () => {
  const mutation = useMutation({
    mutationFn: onRegisterAdmin,
  });

  return mutation;
};

export const UserDashboardQuery = () => {
  const queryClient = useQueryClient();
};

const getFullInfoUserById = async (query) => {
  const id = query.queryKey[1];
  const response = await axiosClient.get("/profile/dashboard/" + id);

  return response.data;
};

export const DefaultViewUserQuery = (id) => {
  const userQuery = useQuery({
    queryKey: ["user", id],
    queryFn: getFullInfoUserById,
  });

  return userQuery;
};

const selfDashboardGetUser = async () => {
  let response = await axiosClient.get("user/profile/your-dashboard");
  return response.data;
};

export const GuestViewUserQuery = () => {
  const userQuery = useQuery({
    queryKey: ["selfDashboard"],
    queryFn: selfDashboardGetUser,
  });

  return userQuery;
};

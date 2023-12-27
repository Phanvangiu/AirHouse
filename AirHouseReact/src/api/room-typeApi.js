import React from "react";
import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const readRoomTypeFn = async () => {
  const response = await axiosClient.get("retrieveRoomType");
  return response.data;
};

const createRoomTypeFn = async (payload) => {
  const response = await axiosClient.post("createRoomType", payload);
  return response.data;
};

const deleteRoomType = async (id) => {
  const response = await axiosClient.post("deleteRoomType", id);
  return response.data;
};

const filterById = async (query) => {
  const id = query.queryKey[1];
  const response = await axiosClient.get("filterByIdRoomType?id=" + id);
  return response.data;
};

const updateRoomType = async (payload) => {
  const response = await axiosClient.post("updateRoomType", payload);
  return response.data;
};

const readCurrentPage = async (query) => {
  const currentPage = query.queryKey[2];
  const response = await axiosClient.get("readRoomType/" + currentPage);
  return response.data;
};

export const RoomTypeQueryPage = (currentPage) => {
  const roomTypeQuery = useQuery({
    queryKey: ["roomtype", "page", currentPage],
    queryFn: readCurrentPage,
    keepPreviousData: true,
    retry: 0,
  });

  return roomTypeQuery;
};

export const UpdateRoomTypeMutation = () => {
  const queryClient = useQueryClient();

  const roomTypeMutation = useMutation({
    mutationFn: updateRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomtype"] });
    },
  });

  return roomTypeMutation;
};

export const RoomTypeQueryId = (id) => {
  const roomTypeQuery = useQuery({
    queryKey: ["roomType", id],
    queryFn: filterById,
  });

  return roomTypeQuery;
};

export const RoomTypeQuery = () => {
  const roomTypeQuery = useQuery({
    queryKey: ["roomtype"],
    queryFn: readRoomTypeFn,
  });

  return roomTypeQuery;
};

export const CreateRoomTypeMutation = () => {
  const queryClient = useQueryClient();

  const roomTypeMutation = useMutation({
    mutationFn: createRoomTypeFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomtype"] });
    },
  });

  return roomTypeMutation;
};

export const DeleteRoomTypeMutation = () => {
  const queryClient = useQueryClient();

  const roomTypeMutation = useMutation({
    mutationFn: deleteRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomtype"] });
    },
  });

  return roomTypeMutation;
};

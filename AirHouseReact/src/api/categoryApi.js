import React from "react";
import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const readCategoryFn = async () => {
  const response = await axiosClient.get("readCategory");
  return response.data;
};

const createCategoryFn = async (payload) => {
  const response = await axiosClient.post("createCategory", payload);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axiosClient.post("deleteCategory", id);
  return response.data;
};

const filterById = async (query) => {
  const id = query.queryKey[1];
  const response = await axiosClient.get("filterByIdCategory?id=" + id);
  return response.data;
};

const updateCategory = async (payload) => {
  const response = await axiosClient.post("updateCategory", payload);
  return response.data;
};

const readCurrentPage = async (query) => {
  const currentPage = query.queryKey[2];
  const response = await axiosClient.get("readCategory/" + currentPage);
  return response.data;
};

export const CategoryQueryPage = (currentPage) => {
  const categoryQuery = useQuery({
    queryKey: ["category", "page", currentPage],
    queryFn: readCurrentPage,
    keepPreviousData: true,
    retry: 0,
  });

  return categoryQuery;
};

export const UpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  return categoryMutation;
};

export const CategoryQueryId = (id) => {
  const categoryQuery = useQuery({
    queryKey: ["category", id],
    queryFn: filterById,
  });

  return categoryQuery;
};

export const CategoryQuery = () => {
  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: readCategoryFn,
  });

  return categoryQuery;
};

export const CreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: createCategoryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  return categoryMutation;
};

export const DeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  return categoryMutation;
};

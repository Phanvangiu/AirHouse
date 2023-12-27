import React from "react";
import axiosClient from "./axiosClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const createBlogCategoryFn = async (payload) => {
  const response = await axiosClient.post("createBlogCategory", payload);
  return response.data;
};

//để show cái Category List
const readBlogCategoryFn = async (query) => {
  const currentPage = query.queryKey[1];
  const response = await axiosClient.get("readCateCurrentPage", {
    params: { page: currentPage },
  });
  return response.data;
};
const readCateValueFn = async () => {
  const response = await axiosClient.get("readBlogCategory");
  return response.data;
};

const updateBlogCategory = async (payload) => {
  const response = await axiosClient.post("updateBlogCategory", payload);
  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axiosClient.get("deleteBlogCategory/" + id);
  return response.data;
};

const filterById = async (query) => {
  const id = query.queryKey[1];
  const response = await axiosClient.get("filterByIdBlogCategory?id=" + id);
  return response.data;
};

// const readCurrentPage = async (query) => {
//   const currentPage = query.queryKey[2];
//   const response = await axiosClient.get("readBlogCategory/" + currentPage);
//   return response.data;
// };

// export const CategoryQueryPage = (currentPage) => {
//   const categoryQuery = useQuery({
//     queryKey: ["Blogcategory", "page", currentPage],
//     queryFn: readCurrentPage,
//     keepPreviousData: true,
//     retry: 0,
//   });

//   return categoryQuery;
// };

export const BlogCategoryQueryId = (id) => {
  const categoryQuery = useQuery({
    queryKey: ["category", id],
    queryFn: filterById,
  });

  return categoryQuery;
};

export const CreateBlogCategoryMutation = () => {
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: createBlogCategoryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogCategory"] });
    },
  });

  return categoryMutation;
};

export const UpdateBlogCategoryMutation = () => {
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: updateBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogCategory"] });
    },
  });

  return categoryMutation;
};

export const DeleteBlogCategoryMutation = () => {
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn: deleteBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BlogCategory"] });
    },
  });

  return categoryMutation;
};

export const BlogCategoryQuery = (page) => {
  const blogCategoryQuery = useQuery({
    queryKey: ["BlogCategory", page],
    queryFn: readBlogCategoryFn,
  });

  return blogCategoryQuery;
};
export const CategoryValueQuery = () => {
  const categoryValueQuery = useQuery({
    queryKey: ["BlogCategory"],
    queryFn: readCateValueFn,
  });

  return categoryValueQuery;
};
import React from "react";
import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const readPropertyTypeFn = async () => {
  const response = await axiosClient.get("readPropertyType");
  return response.data;
};

const createPropertyTypeFn = async (payload) => {
  const response = await axiosClient.post("createPropertyType", payload);
  return response.data;
};

const deletePropertyType = async (id) => {
  const response = await axiosClient.post("deletePropertyType", id);
  return response.data;
};

const filterById = async (query) => {
  const id = query.queryKey[1];
  const response = await axiosClient.get("filterByIdPropertyType?id=" + id);
  return response.data;
};

const updatePropertyType = async (payload) => {
  const response = await axiosClient.post("updatePropertyType", payload);
  return response.data;
};

const readCurrentPage = async (query) => {
  const currentPage = query.queryKey[2];
  const response = await axiosClient.get("readPropertyType/" + currentPage);
  return response.data;
};

export const PropertyTypeQueryPage = (currentPage) => {
  const propertyTypeQuery = useQuery({
    queryKey: ["propertyType", "page", currentPage],
    queryFn: readCurrentPage,
    keepPreviousData: true,
    retry: 0,
  });

  return propertyTypeQuery;
};

export const UpdatePropertyTypeMutation = () => {
  const queryClient = useQueryClient();

  const propertyTypeMutation = useMutation({
    mutationFn: updatePropertyType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyType"] });
    },
  });

  return propertyTypeMutation;
};

export const PropertyTypeQueryId = (id) => {
  const propertyTypeQuery = useQuery({
    queryKey: ["propertyType", id],
    queryFn: filterById,
  });

  return propertyTypeQuery;
};

export const PropertyTypeQuery = () => {
  const propertyTypeQuery = useQuery({
    queryKey: ["propertyType"],
    queryFn: readPropertyTypeFn,
  });

  return propertyTypeQuery;
};

export const CreatePropertyTypeMutation = () => {
  const queryClient = useQueryClient();

  const typeMutation = useMutation({
    mutationFn: createPropertyTypeFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["propertyType"] });
    },
  });

  return typeMutation;
};

export const DeletePropertyTypeMutation = () => {
  const queryClient = useQueryClient();

  const typeMutation = useMutation({
    mutationFn: deletePropertyType,
  });

  return typeMutation;
};

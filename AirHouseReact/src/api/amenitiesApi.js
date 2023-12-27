import React from "react";
import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const readAmenitiesFn = async () => {
  const response = await axiosClient.get("readAmenity");
  return response.data;
};

const createAmenitiesFn = async (payload) => {
  const response = await axiosClient.post("createAmenity", payload);
  return response.data;
};

const deleteAmenity = async (id) => {
  const response = await axiosClient.post("deleteAmenity", id);
  return response.data;
};

const filterById = async (query) => {
  const id = query.queryKey[1];
  const response = await axiosClient.get("filterByIdAmenity?id=" + id);
  return response.data;
};

const updateAmenity = async (payload) => {
  const response = await axiosClient.post("updateAmenity", payload);
  return response.data;
};

const readCurrentPage = async (query) => {
  const currentPage = query.queryKey[2];
  const response = await axiosClient.get("readAmenity/" + currentPage);
  return response.data;
};

export const AmenitiesQueryPage = (currentPage) => {
  const amenityQuery = useQuery({
    queryKey: ["amenity", "page", currentPage],
    queryFn: readCurrentPage,
    keepPreviousData: true,
    retry: 0,
  });

  return amenityQuery;
};

export const UpdateAmenityMutation = () => {
  const queryClient = useQueryClient();

  const amenityMutation = useMutation({
    mutationFn: updateAmenity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });

  return amenityMutation;
};

export const AmenitiesQueryId = (id) => {
  const amenityQuery = useQuery({
    queryKey: ["amenity", id],
    queryFn: filterById,
  });

  return amenityQuery;
};

export const AmenitiesQuery = () => {
  const amenitiesQuery = useQuery({
    queryKey: ["amenities"],
    queryFn: readAmenitiesFn,
  });

  return amenitiesQuery;
};

export const CreateAmenitiesMutation = () => {
  const queryClient = useQueryClient();

  const amenitiesMutation = useMutation({
    mutationFn: createAmenitiesFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });

  return amenitiesMutation;
};

export const DeleteAmenitiesMutation = () => {
  const queryClient = useQueryClient();

  const amenitiesMutation = useMutation({
    mutationFn: deleteAmenity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });

  return amenitiesMutation;
};

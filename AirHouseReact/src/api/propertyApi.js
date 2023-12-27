import axiosClient from "./axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const filterById = async (query) => {
  const id = query.queryKey[1];
  const response = await axiosClient.get("/showUserPropertyById?id=" + id);
  return response.data;
};

export const PropertyQueryId = (id) => {
  const propertyQuery = useQuery({
    queryKey: ["property", id],
    queryFn: filterById,
    retry: 1,
  });

  return propertyQuery;
};

const listingProperty = async (query) => {
  const status = query.queryKey[1];
  const page = query.queryKey[2];

  const response = await axiosClient.get("property-list", { params: { status: status, page: page } });
  return response.data;
};

export const ListingPropertyQuery = (status, page) => {
  const listingQuery = useQuery({
    queryKey: ["listing", status, page],
    queryFn: listingProperty,
    retry: 0,
  });

  return listingQuery;
};

const readPropertyToUpdate = async (query) => {
  const id = query.queryKey[2];

  const response = await axiosClient.get("read-property-to-update", { params: { id: id } });
  return response.data;
};

export const ReadPropertyUpdateQuery = (id) => {
  const propertyQuery = useQuery({
    queryKey: ["property", "update", id],
    queryFn: readPropertyToUpdate,
    retry: 0,
  });

  return propertyQuery;
};

const updateProperty = async (payload) => {
  const response = await axiosClient.post("update-property", payload);
  return response.data;
};

export const UpdatePropertyMutation = () => {
  const updateMutation = useMutation({
    mutationFn: updateProperty,
  });

  return updateMutation;
};

const propertyQuery = async (query) => {
  const id = query.queryKey[2];

  const response = await axiosClient("read-property-to-view-booking", { params: { id: id } });
  return response.data;
};

export const PropertyQuery = (id) => {
  const query = useQuery({
    queryKey: ["property", "booking", id],
    queryFn: propertyQuery,
    retry:1,
  });

  return query;
};

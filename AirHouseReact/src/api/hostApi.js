import axiosClient from "./axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const createProperty = async (payload) => {
  const response = await axiosClient.post("create-property", payload);
  return response.data;
};

export const CreatePropertyMutation = () => {
  const propertyMutation = useMutation({
    mutationFn: createProperty,
  });

  return propertyMutation;
};

const readCurrentPage = async (query) => {
  const status = query.queryKey[1];
  const currentPage = query.queryKey[2];
  const stateArr = query.queryKey[3];

  const response = await axiosClient.get("read-properties-status", {
    params: {
      status: status,
      page: currentPage,
      search: stateArr[0],
      category: stateArr[1],
      roomtype: stateArr[2],
      propertytype: stateArr[3],
      accomodates: stateArr[4],
      bedroom: stateArr[5],
      bookingtype: stateArr[6],
      property_status: stateArr[7],
    },
  });
  return response.data;
};

export const PropertiesCurrentPageQuery = (
  status,
  page,
  search,
  category,
  roomtype,
  propertytype,
  accomodates,
  bedroom,
  bookingType,
  property_status
) => {
  const propertiesQuery = useQuery({
    queryKey: ["properties", status, page, [search, category, roomtype, propertytype, accomodates, bedroom, bookingType, property_status]],
    queryFn: readCurrentPage,
    keepPreviousData: true,
    retry: 0,
  });

  return propertiesQuery;
};

const readPropertyById = async (query) => {
  const id = query.queryKey[1];

  const response = await axiosClient.get("read-property/" + id);
  return response.data;
};

export const PropertyIdQuery = (id) => {
  const propertyQuery = useQuery({
    queryKey: ["property", id],
    queryFn: readPropertyById,
  });

  return propertyQuery;
};

const acceptProperty = async (payload) => {
  const response = await axiosClient.post("property/accept", payload);
  return response.data;
};

export const AcceptPropertyMutation = () => {
  const propertyMutation = useMutation({
    mutationFn: acceptProperty,
  });

  return propertyMutation;
};

const denyProperty = async (payload) => {
  const response = await axiosClient.post("property/deny", payload);
  return response.data;
};

export const DenyPropertyMutation = () => {
  const propertyMutation = useMutation({
    mutationFn: denyProperty,
  });

  return propertyMutation;
};

const readPropertyIndex = async (query) => {
  const category = query.queryKey[1];

  const filterObj = query.queryKey[2];
  const province = filterObj.province;
  const checkIn = filterObj.checkIn;
  const checkOut = filterObj.checkOut;
  const accommodate = filterObj.guest_count;

  const secondFilterObj = query.queryKey[3];
  const roomType = secondFilterObj.roomType;
  const bed = secondFilterObj.bed;
  const bath = secondFilterObj.bath;
  const propertyType = secondFilterObj.propertyType;
  const amenities = secondFilterObj.amenities;

  const response = await axiosClient.get("show-property-index", {
    params: {
      category: category,
      province: province,
      checkInFilter: checkIn,
      checkOutFilter: checkOut,
      guest_count: accommodate,
      roomType: roomType,
      bedRoom: bed,
      bathRoom: bath,
      propertyType: propertyType,
      amenities: amenities,
    },
  });
  return response.data;
};

export const PropertyIndexQuery = (category, firstFilterObj, secondFilterObj) => {
  const propertyQuery = useQuery({
    queryKey: ["property-index", category, firstFilterObj, secondFilterObj],
    queryFn: readPropertyIndex,
  });

  return propertyQuery;
};

const previewFilter = async (query) => {
  const category = query.queryKey[1];

  const firstFilterObj = query.queryKey[2];
  const province = firstFilterObj.province;
  const checkIn = firstFilterObj.checkIn;
  const checkOut = firstFilterObj.checkOut;
  const accommodate = firstFilterObj.guest_count;

  const secondFilterObj = query.queryKey[3];
  const roomType = secondFilterObj.roomType;
  const bed = secondFilterObj.bed;
  const bath = secondFilterObj.bath;
  const propertyType = secondFilterObj.propertyType;
  const amenities = secondFilterObj.amenities;

  const response = await axiosClient.get("filter-preview", {
    params: {
      category: category,
      province: province,
      checkInFilter: checkIn,
      checkOutFilter: checkOut,
      guest_count: accommodate,
      roomType: roomType,
      bedRoom: bed,
      bathRoom: bath,
      propertyType: propertyType,
      amenities: amenities,
    },
  });

  return response.data;
};

export const FilterPreviewQuery = (category, firstFilterObj, secondFilterObj) => {
  const query = useQuery({
    queryKey: ["property-filter-preview", category, firstFilterObj, secondFilterObj],
    queryFn: previewFilter,
    keepPreviousData: true,
  });

  return query;
};

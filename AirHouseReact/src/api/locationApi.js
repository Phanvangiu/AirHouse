import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";

const getProvince = async () => {
  const response = await axiosClient.get("getProvinces");
  return response.data;
};

const getDistrict = async (query) => {
  let provinceId = query.queryKey[1];
  
  const response = await axiosClient.get("getDistrict/province/" + provinceId);
  return response.data;
};

export const ProvinceQuery = () => {
  const provinceQuery = useQuery({
    queryKey: ["province"],
    queryFn: getProvince,
  });

  return provinceQuery;
};

export const DistrictQuery = (provinceId) => {
  const districtQuery = useQuery({
    queryKey: ["district", provinceId],
    queryFn: getDistrict,
  });

  return districtQuery;
};

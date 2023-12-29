import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const getTotalCategoryBasedOnProvince = async () => {
  const response = await axiosClient.get("get-province-property");
  return response.data;
};

export const TotalCategoryBasedOnProvinceQuery = () => {
  const query = useQuery({
    queryKey: ["category-total-based-province"],
    queryFn: getTotalCategoryBasedOnProvince,
  });

  return query;
};

const getTotalProvinceBasedOnCategory = async () => {
  const response = await axiosClient.get("get-category-province");
  return response.data;
};

export const TotalProvinceBasedOnCategoryQuery = () => {
  const query = useQuery({
    queryKey: ["province-total-based-category"],
    queryFn: getTotalProvinceBasedOnCategory,
  });

  return query;
};

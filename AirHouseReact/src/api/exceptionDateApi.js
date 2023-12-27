import axiosClient from "./axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const createExceptionDate = (payload) => {
  const response = axiosClient.post("add-exception-date", payload);
  return response.data;
};

export const CreateExceptionDateMutation = () => {
  const mutation = useMutation({
    mutationFn: createExceptionDate,
  });

  return mutation;
};




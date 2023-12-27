import axiosClient from "./axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const createTransaction = async (payload) => {
  const response = await axiosClient.post("create-transaction", payload);
  return createTransaction;
};

export const CreateTransactionMutation = () => {
  const createMutation = useMutation({
    mutationFn: createTransaction,
  });

  return CreateTransactionMutation;
};

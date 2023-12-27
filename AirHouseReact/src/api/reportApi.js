import axiosClient from "./axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const readReportCount = async (query) => {
  const year = query.queryKey[1];

  const response = await axiosClient.get("get-transaction-count-report", { params: { year: year } });
  return response.data;
};

export const ReportCountQuery = (year) => {
  const query = useQuery({
    queryKey: ["report", year],
    queryFn: readReportCount,
  });

  return query;
};

const readFeeReport = async (query) => {
  const year = query.queryKey[1];

  const response = await axiosClient.get("get-fee-transaction", { params: { year: year } });
  return response.data;
};

export const ReportFeeQuery = (year) => {
  const query = useQuery({
    queryKey: ["fees", year],
    queryFn: readFeeReport,
  });

  return query;
};

const readTodayReport = async () => {
  const response = await axiosClient.get("get-to-day-transaction");
  return response.data;
};

export const TodayReportQuery = () => {
  const query = useQuery({
    queryKey: ["today-report"],
    queryFn: readTodayReport,
  });

  return query;
};

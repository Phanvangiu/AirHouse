import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { TotalCategoryBasedOnProvinceQuery } from "api/provinceApi";
import { CategoryQuery } from "api/categoryApi";
import { ProvinceQuery } from "api/locationApi";
import BarChart from "views/dashboard/BarChart";
import LineChart from "views/dashboard/LineChart";
import { TotalProvinceBasedOnCategoryQuery } from "api/provinceApi";

const StyledContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export default function PropertyChart() {
  const query = TotalCategoryBasedOnProvinceQuery();
  const categoryBasedQuery = TotalProvinceBasedOnCategoryQuery();
  const provinceQuery = ProvinceQuery();
  const categoryQuery = CategoryQuery();

  const [data9, setData9] = useState({
    labels: null,
    datasets: [],
  });

  const [data10, setData10] = useState({
    labels: null,
    datasets: [],
  });

  const [data11, setData11] = useState({
    labels: null,
    datasets: [],
  });

  const [data12, setData12] = useState({
    labels: null,
    datasets: [],
  });

  const [data1, setData1] = useState({
    labels: null,
    datasets: [],
  });

  const [data2, setData2] = useState({
    labels: null,
    datasets: [],
  });

  const [data3, setData3] = useState({
    labels: null,
    datasets: [],
  });

  const [data4, setData4] = useState({
    labels: null,
    datasets: [],
  });

  const [data5, setData5] = useState({
    labels: null,
    datasets: [],
  });

  const [data6, setData6] = useState({
    labels: null,
    datasets: [],
  });

  const [data7, setData7] = useState({
    labels: null,
    datasets: [],
  });

  const [data8, setData8] = useState({
    labels: null,
    datasets: [],
  });

  useEffect(() => {
    if (categoryBasedQuery.isSuccess) {
      const datasets9 = provinceQuery.data.map((item) => {
        return {
          label: item.full_name,
          data: categoryQuery.data.map((category_item) => {
            let count = 0;
            categoryBasedQuery.data.forEach((queryItem) => {
              if (
                queryItem.category_id == category_item.id &&
                queryItem.code == item.code
              ) {
                count = count + queryItem.count;
              }
            });

            return count;
          }),
        };
      });

      setData9({
        labels: categoryQuery.data
          .filter((item, index) => {
            return true;
          })
          .map((item) => item.name),
        datasets: datasets9,
      });

      const datasets10 = provinceQuery.data.map((item) => {
        return {
          label: item.full_name,
          data: categoryQuery.data
            .filter((item, index) => {
              return index < 7;
            })
            .map((category_item) => {
              let count = 0;
              categoryBasedQuery.data.forEach((queryItem) => {
                if (
                  queryItem.category_id == category_item.id &&
                  queryItem.code == item.code
                ) {
                  count = count + queryItem.count;
                }
              });

              return count;
            }),
        };
      });

      setData10({
        labels: categoryQuery.data
          .filter((item, index) => {
            return index < 7;
          })
          .map((item) => item.name),
        datasets: datasets10,
      });

      const datasets11 = provinceQuery.data.map((item) => {
        return {
          label: item.full_name,
          data: categoryQuery.data
            .filter((item, index) => {
              return index >= 7 && index < 14;
            })
            .map((category_item) => {
              let count = 0;
              categoryBasedQuery.data.forEach((queryItem) => {
                if (
                  queryItem.category_id == category_item.id &&
                  queryItem.code == item.code
                ) {
                  count = count + queryItem.count;
                }
              });

              return count;
            }),
        };
      });

      setData11({
        labels: categoryQuery.data
          .filter((item, index) => {
            return index >= 7 && index < 14;
          })
          .map((item) => item.name),
        datasets: datasets11,
      });
    }
  }, [categoryBasedQuery.status]);

  useEffect(() => {
    if (query.isSuccess) {
      const datasets8 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index < 32;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData8({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index < 32;
          })
          .map((item) => item.full_name),
        datasets: datasets8,
      });

      const datasets12 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index >= 32 && index < 63;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData12({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index >= 32 && index < 63;
          })
          .map((item) => item.full_name),
        datasets: datasets12,
      });

      const datasets1 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index < 10;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData1({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index < 10;
          })
          .map((item) => item.full_name),
        datasets: datasets1,
      });

      const datasets2 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index >= 10 && index < 20;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData2({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index >= 10 && index < 20;
          })
          .map((item) => item.full_name),
        datasets: datasets2,
      });

      const datasets3 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index >= 20 && index < 30;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData3({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index >= 20 && index < 30;
          })
          .map((item) => item.full_name),
        datasets: datasets3,
      });

      const datasets4 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index >= 30 && index < 40;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData4({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index >= 30 && index < 40;
          })
          .map((item) => item.full_name),
        datasets: datasets4,
      });

      const datasets5 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index >= 40 && index < 50;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData5({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index >= 40 && index < 50;
          })
          .map((item) => item.full_name),
        datasets: datasets5,
      });

      const datasets6 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index >= 50 && index < 60;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData6({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index >= 50 && index < 60;
          })
          .map((item) => item.full_name),
        datasets: datasets6,
      });

      const datasets7 = categoryQuery.data.map((item) => {
        return {
          label: item.name,
          data: provinceQuery.data
            .filter((item, index) => {
              return index >= 60 && index < 64;
            })
            .map((province_item) => {
              let count = 0;
              query.data.forEach((queryItem) => {
                if (
                  queryItem.code == province_item.code &&
                  queryItem.category_id == item.id
                ) {
                  count = count + queryItem.total;
                }
              });

              return count;
            }),
        };
      });
      setData7({
        labels: provinceQuery.data
          .filter((item, index) => {
            return index >= 60 && index < 64;
          })
          .map((item) => item.full_name),
        datasets: datasets7,
      });
    }
  }, [query.status]);

  return (
    <StyledContainer>
      <BarChart chartData={data8} />
      <BarChart chartData={data12} />
      <BarChart chartData={data1} />
      <BarChart chartData={data2} />
      <BarChart chartData={data3} />
      <BarChart chartData={data4} />
      <BarChart chartData={data5} />
      <BarChart chartData={data6} />
      <BarChart chartData={data7} />
      <BarChart chartData={data9} />
      <BarChart chartData={data10} />
      <BarChart chartData={data11} />
    </StyledContainer>
  );
}

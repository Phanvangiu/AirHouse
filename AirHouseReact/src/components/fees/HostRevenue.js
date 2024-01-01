import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { HostFeesQuery } from "api/userBookingApi";
import Loading from "components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  min-height: 40rem;
`;

const StyledTable = styled.table`
  border: 1px solid black;
  width: 100%;

  thead {
    background-color: rgba(0, 0, 0);
    color: white;
    font-weight: 600;
  }

  td,
  th {
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
    padding: 0.8rem;
  }

  tr {
  }

  td {
    font-size: 14px;
  }

  & .user-avatar {
    cursor: pointer;
  }

  & .user-avatar:hover {
    text-decoration: underline;
  }
`;

function convertToLocalDatetime(datetimeString) {
  let date = new Date(datetimeString);
  return date.toLocaleString();
}

export default function HostRevenue() {
  const hostFeesQuery = HostFeesQuery();

  if (hostFeesQuery.isLoading) {
    return <Loading />;
  }

  return (
    <StyledContainer>
      <StyledTable>
        <thead>
          <th>ID</th>
          <th>Amount</th>
          <th>Transaction date</th>
          <th>Property</th>
          <th>Check-in</th>
          <th>Check-out</th>
          <th>Guest</th>
        </thead>
        <tbody>
          {hostFeesQuery.data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  <FontAwesomeIcon icon={faDollarSign} />
                  {(
                    Number(item.price_for_stay) -
                    Number(item.price_for_stay) * 0.14
                  ).toFixed(2)}
                </td>
                <td>{convertToLocalDatetime(item.updated_at)}</td>
                <td
                  className="user-avatar"
                  onClick={() =>
                    window.open(`/property?id=${item.property.id}`, "_blank")
                  }
                >
                  {item.property.name}
                </td>
                <td>{item.check_in_date}</td>
                <td>{item.check_out_date}</td>
                <td
                  className="user-avatar"
                  onClick={() =>
                    window.open(`/profile/dashboard/${item.user.id}`, "_blank")
                  }
                >
                  {item.user.first_name} {item.user.last_name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
}

import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { UserPaymentQuery } from "api/userBookingApi";
import Loading from "components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";

const StyledContainer = styled.div`
  min-height: 40rem;
`;

const StyledTable = styled.table`
  border: 1px solid black;
  width: 100%;

  overflow-x: auto;
  thead {
    background-color: black;
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

export default function UserTransaction() {
  const userPaymentQuery = UserPaymentQuery();

  if (userPaymentQuery.isLoading) {
    return <Loading />;
  }

  return (
    <StyledContainer>
      <StyledTable>
        <thead>
          <th>ID</th>
          <th>Amount</th>
          <th>Transaction date</th>
          <th>Check-in</th>
          <th>Check-out</th>
          <th>Host</th>
        </thead>
        <tbody>
          {userPaymentQuery.data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  <FontAwesomeIcon icon={faDollarSign} />
                  {Number(item.price_for_stay) + Number(item.site_fees)}
                </td>
                <td>{convertToLocalDatetime(item.updated_at)}</td>
                <td>{item.check_in_date}</td>
                <td>{item.check_out_date}</td>
                <td
                  className="user-avatar"
                  onClick={() =>
                    window.open(
                      `/profile/dashboard/${item.property.user.id}`,
                      "_blank"
                    )
                  }
                >
                  <span>
                    {item.property.user.first_name}{" "}
                    {item.property.user.last_name}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
}

import { useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "./sidebar/SideBar";
import Content from "./content/Content";

const Box = styled.div`
  & .grid-container-user-booking {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
    row-gap: 1rem;
    max-width: 1500px;
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 0 1rem;

    > p:nth-of-type(1) {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;
function UserBooking() {
  const [userTitle, setUserTitle] = useState("all");

  return (
    <Box>
      <div className="grid-container-user-booking">
        <p>My Bookings</p> <p></p>
        <SideBar setUserTitle={setUserTitle} />
        <Content UserTitle={userTitle} />
      </div>
    </Box>
  );
}
export default UserBooking;

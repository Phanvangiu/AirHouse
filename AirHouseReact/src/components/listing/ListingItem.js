import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faBath } from "@fortawesome/free-solid-svg-icons";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PopUpContainer from "ui/PopUpContainer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr;
  grid-auto-rows: 12.5rem;

  column-gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 10px;
  line-height: 20px;

  .icon {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1150px) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 14rem auto;

    & .first {
      grid-column: 1/3;
    }
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-template-rows: 14rem auto auto;

    & .first {
      grid-column: 1;
    }
  }
`;

const StyledFirst = styled.div`
  width: 100%;
  cursor: pointer;
  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  & .skeleton {
    height: 100%;
    width: 100%;
  }
`;

const StyledSecond = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 1.5rem;

  h3 {
    font-size: 16px;
    font-weight: 600;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    > p {
      font-size: 14px;

      .icon {
        margin-right: 5px;
      }
    }
  }

  .span {
    font-size: 14px;
    margin-right: 10px;

    & span {
      font-weight: 600;
    }
  }

  .to {
    font-weight: 600;
  }

  .dollar {
    font-weight: 600;
    font-size: 15px;
  }
`;

const StyledThird = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  & p {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
  }

  & button {
    cursor: pointer;
    background-color: red;
    border: none;
    color: white;
    border-radius: 5px;
  }
`;

export const ListingItemSkeleton = () => {
  return (
    <StyledContainer>
      <StyledFirst>
        <Skeleton className="skeleton" />
      </StyledFirst>
      <StyledSecond>
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        <Skeleton />
      </StyledSecond>
      <StyledThird>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </StyledThird>
    </StyledContainer>
  );
};

const StyledPopUp = styled(PopUpContainer)`
  position: fixed;
  width: 30rem;
  height: 20rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 17px;
    font-weight: 600;
  }

  & textarea {
    resize: none;
    flex-grow: 1;
    padding: 1rem;

    &:focus,
    &:hover {
      border: 1px solid red;
      outline: 1px solid red;
    }
  }
`;

const StyledDisplayNone = styled.div`
  display: none;
`;

export default function ListingItem({ data }) {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);


  const onClickShowMessage = () => {
    setShowMessage(true);
  };

  const onClickUpdate = (id) => {
    navigate({
      pathname: "/user/host-update/become-host",
      search: `?id=${id}`,
    });
  };

  const onShowBooking = () => {
    navigate({
      pathname: "/user/booking-detail",
      search: `property_id=${data.id}`,
    });
  };

  const onClickProperty = () => {
    navigate({
      pathname: "/property",
      search: `?id=${data.id}`,
    });
  }

  return (
    <>
      <StyledContainer>
        <StyledFirst onClick={onClickProperty} className="first">
          <img src={data.images[0].image} />
        </StyledFirst>
        <StyledSecond>
          <h3>
            {data.category.name} in {data.province.full_name} - {data.id}
          </h3>
          <div>
            <p>
              <FontAwesomeIcon className="icon" icon={faAddressBook} />
              {data.province.full_name}, {data.district.full_name}, {data.address}
            </p>
            <p>
              <span className="span">
                <FontAwesomeIcon className="icon" icon={faPerson} /> {data.accomodates_count} <span>guest</span>
              </span>
              <span className="span">
                <FontAwesomeIcon className="icon" icon={faBed} /> {data.bedroom_count} <span>Beds</span>
              </span>
              <span className="span">
                <FontAwesomeIcon className="icon" icon={faBath} /> {data.bathroom_count} <span>Bathrooms</span>
              </span>
            </p>
          </div>
          <div>
            <p>
              <FontAwesomeIcon className="icon" icon={faCalendar} /> From {data.start_date} <span className="to">to</span> {data.end_date}
            </p>
            <p>
              <FontAwesomeIcon className="icon" icon={faDollar} />
              <span className="dollar">{data.base_price}</span>{" "}
            </p>
          </div>
        </StyledSecond>
        <StyledThird className="third">
          <div>
            {data.acception_status == "accept" && <p>Approved</p>}
            {data.acception_status == "waiting" && <p>Awaiting for approve</p>}
            {data.acception_status == "deny" && <p>Disapprove</p>}
          </div>
          <button onClick={() => onClickUpdate(data.id)}>Edit</button>
          {data.admin_message && <button onClick={onClickShowMessage}>Show Admin Message</button>}
          <button onClick={onShowBooking}>Show Booking</button>
        </StyledThird>
      </StyledContainer>
      {showMessage ? (
        <StyledPopUp setShowPopUp={setShowMessage}>
          <h3>Admin</h3>
          <textarea value={data.admin_message}></textarea>
        </StyledPopUp>
      ) : (
        <StyledDisplayNone></StyledDisplayNone>
      )}
    </>
  );
}

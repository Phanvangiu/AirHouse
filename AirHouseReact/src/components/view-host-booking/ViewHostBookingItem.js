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
import Avatar from "react-avatar";

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

export const BookingItemSkeleton = () => {
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

export default function ViewHostBookingItem({ data }) {
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

  return (
    <>
      <StyledContainer>
        <StyledFirst className="first">
          <img src={data.property.images[0].image} />
        </StyledFirst>
        <StyledSecond>
          <h3>
            {data.property.name} - {data.user.id}
          </h3>
          <div>
            <p>
              <FontAwesomeIcon className="icon" icon={faAddressBook} />
              {data.property.address}
            </p>
            <p>
              <FontAwesomeIcon className="icon" icon={faCalendar} /> From {data.check_in_date} <span className="to">to</span>
              {data.check_out_date}
            </p>
            <p>
              <FontAwesomeIcon className="icon" icon={faDollar} />
              <span className="dollar">{data.price_for_stay}</span>{" "}
            </p>
          </div>
        </StyledSecond>
        <StyledThird className="third">
          <Avatar src={data.user.image} size="50px" textSizeRatio={3} round={true} name={data.user.first_name} />
          {data.booking_status == "waiting" && <button>Accept</button>}
          {data.booking_status == "waiting" && <button>Deny</button>}
          {(data.booking_status == "accepted" || data.booking_status == "success") && <button>Payment Detail</button>}
          <button>Send Message</button>
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

import React from "react";
import styled, { css } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import PopUpContainer from "ui/PopUpContainer";
import { PropertyIdQuery } from "api/hostApi";
import { AmenitiesQuery } from "api/amenitiesApi";
import { DenyPropertyMutation } from "api/hostApi";
import { AcceptPropertyMutation } from "api/hostApi";
import { useQueryClient } from "@tanstack/react-query";
import { CSpinner } from "@coreui/react";
import Calendar from "react-calendar";
import "./calendar.css";

const StyledCalendar = styled(Calendar)`
  background-color: white;
`;

const StyledPopUp = styled(PopUpContainer)`
  background-color: white;
  color: black;
  top: 5%;
  overflow-y: scroll;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px; */

  & input {
    height: 2rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  & input:focus,
  & input:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: 1px solid rgba(0, 0, 0, 0.3);
  }

  & textarea {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  & textarea:focus,
  & textarea:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: 1px solid rgba(0, 0, 0, 0.3);
  }

  & label {
    color: #717171;
    font-size: 15px;
    font-weight: 600;
  }
`;

const StyledBody = styled.div`
  background-color: white;
  opacity: 1;

  min-width: 55rem;
  height: 90vh;
`;

const StyledHeader = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledHeaderButton = styled.button`
  border: none;
  font-size: 18px;
  font-weight: 600;
  padding: 0.5rem 0;
  border-bottom: 3px solid rgb(240, 240, 240);

  ${(props) => {
    if (props.$active) {
      return css`
        border-bottom: 3px solid #3369ff;
      `;
    }
  }}
`;

const StyledContent = styled.div``;

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`;

const formatDate = (dateObj) => {
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
};

const listDate = (start, end) => {
  const allDatesInRange = [];

  const current = new Date(start);
  const endDate = new Date(end);

  while (formatDate(current) <= formatDate(endDate)) {
    allDatesInRange.push(formatDate(current));

    current.setDate(current.getDate() + 1);
  }

  return allDatesInRange;
};

export default function StatusPopUp({ status, currentPage, chosenId, setShowPopUp }) {
  const propertyQuery = PropertyIdQuery(chosenId);
  const [isProperty, setIsProperty] = useState(true);

  const onSetActive = (bool) => {
    setIsProperty(bool);
  };

  return (
    <StyledPopUp setShowPopUp={setShowPopUp}>
      <StyledBody>
        {propertyQuery.isLoading ? (
          <StyledSpinner>
            <CSpinner color="primary" />
          </StyledSpinner>
        ) : (
          <StyledContent>
            <StyledHeader>
              <StyledHeaderButton onClick={() => onSetActive(true)} $active={isProperty}>
                Property
              </StyledHeaderButton>
              <StyledHeaderButton onClick={() => onSetActive(false)} $active={!isProperty}>
                Host
              </StyledHeaderButton>
            </StyledHeader>
            {isProperty ? <PropertyBody status={status} currentPage={currentPage} data={propertyQuery.data} /> : <UserBody />}
          </StyledContent>
        )}
      </StyledBody>
    </StyledPopUp>
  );
}

const StyledPropertyBody = styled.div`
  padding: 2rem 1.5rem;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
  row-gap: 2rem;

  & textarea {
    grid-column: 1 / span 2;
    resize: none;
    height: 8rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  & button {
    background-color: white;
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }

  & button:hover {
    border: 2px solid rgba(0, 0, 0, 0.8);
  }
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  & textarea {
    resize: none;
    height: 6rem;
  }
`;

const StyledContentHeader = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  margin: 2rem 0;
  border-bottom: 3px solid #3369ff;
  padding-bottom: 10px;
`;

const StyledAmenitiesContainer = styled.div``;

const StyledAmenities = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
  margin-bottom: 30px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 10px;
  }
`;

const StyledItemAmenities = styled.div`
  display: flex;
  align-items: center;
  input {
    font-size: 10px;
  }
`;
const StyledInput = styled.input`
  cursor: pointer;
  zoom: 1.5;
`;

const StyledLable = styled.label`
  font-size: 16px;
  padding-left: 10px;
`;

const StyledImages = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  & div {
    height: 20rem;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function PropertyBody({ data, currentPage, status }) {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState(data.admin_message);
  const acceptMutation = AcceptPropertyMutation();
  const denyMutation = DenyPropertyMutation();
  const amenitiesQuery = AmenitiesQuery();
  const amenitiesIdArr = data.amenities.map((amenity) => {
    return amenity.id;
  });

  const onAccept = () => {
    const payload = {
      message: message,
      id: data.id,
    };

    acceptMutation.mutate(payload, {
      onSuccess: () => {
        alert("sucess");
        queryClient.invalidateQueries({ queryKey: ["property", data.id] });
        queryClient.invalidateQueries({ queryKey: ["properties", status, currentPage] });
      },
    });
  };

  const onDeny = () => {
    if (!message) {
      alert("Please leave a message to host");
      return;
    }

    const payload = {
      message: message,
      id: data.id,
    };

    denyMutation.mutate(payload, {
      onSuccess: () => {
        alert("sucess");
        queryClient.invalidateQueries({ queryKey: ["property", data.id] });
        queryClient.invalidateQueries({ queryKey: ["properties", "all", currentPage] });
      },
    });
  };

  const onExceptionDate = ({ date }) => {
    let arrExceptionDate = [];
    for (let i = 0; i < data.exception_date.length; i++) {
      arrExceptionDate = [...arrExceptionDate, ...listDate(data.exception_date[i].start_date, data.exception_date[i].end_date)];
    }

    const isDisabled = arrExceptionDate.some((bookedDate) => {
      return bookedDate == formatDate(new Date(date));
    });

    return isDisabled;
  };

  return (
    <StyledPropertyBody>
      <StyledGrid>
        <div>
          <label>Category</label>
          <input readOnly type="text" value={data.category.name} />
        </div>

        <div>
          <label>Property Type</label>
          <input readOnly type="text" value={data.property_type.name} />
        </div>

        <div>
          <label>Room Type</label>
          <input readOnly type="text" value={data.room_type.name} />
        </div>
      </StyledGrid>
      <StyledContentHeader>Basic</StyledContentHeader>
      <StyledGrid>
        <div>
          <label>Bedroom</label>
          <input readOnly type="text" value={data.bedroom_count} />
        </div>

        <div>
          <label>Bathroom</label>
          <input readOnly type="text" value={data.bathroom_count} />
        </div>

        <div>
          <label>Accommodates</label>
          <input readOnly type="text" value={data.accomodates_count} />
        </div>
      </StyledGrid>
      <StyledContentHeader>Description</StyledContentHeader>
      <StyledFlex>
        <div>
          <label>Listing Name</label>
          <input readOnly type="text" value={data.name} />
        </div>
        <div>
          <label>Description</label>
          <textarea readOnly value={data.description}></textarea>
        </div>
      </StyledFlex>
      <StyledContentHeader>Detail</StyledContentHeader>
      <StyledFlex>
        <div>
          <label>About Place</label>
          <textarea readOnly value={data.about_place}></textarea>
        </div>
        <div>
          <label>Place is great for</label>
          <textarea readOnly value={data.place_great_for}></textarea>
        </div>
        <div>
          <label>Guest Access</label>
          <textarea readOnly value={data.guest_access}></textarea>
        </div>
        <div>
          <label>Interaction with Guests</label>
          <textarea readOnly value={data.interaction_guest}></textarea>
        </div>
        <div>
          <label>Other Things to Note</label>
          <textarea readOnly value={data.thing_to_note}></textarea>
        </div>
        <div>
          <label>Overview</label>
          <textarea readOnly value={data.overview}></textarea>
        </div>
        <div>
          <label>Getting Around</label>
          <textarea readOnly value={data.getting_around}></textarea>
        </div>
      </StyledFlex>
      <StyledContentHeader>Location</StyledContentHeader>
      <StyledFlex>
        <div>
          <label>Address</label>
          <input readOnly type="text" value={`Việt Nam, ${data.province?.full_name}, ${data.district.full_name}, ${data.address}`} />
        </div>
      </StyledFlex>
      <StyledContentHeader>Amenities</StyledContentHeader>
      <StyledAmenitiesContainer>
        <label>Essentials</label>
        <StyledAmenities>
          {amenitiesQuery.isSuccess &&
            amenitiesQuery.data
              .filter((amenity) => amenity.type == "essentials")
              .map((amenity, index) => {
                return (
                  <StyledItemAmenities key={index}>
                    <StyledInput
                      readOnly
                      checked={amenitiesIdArr.includes(amenity.id)}
                      name="amenities"
                      value={amenity.id}
                      type="checkbox"
                    />
                    <StyledLable htmlFor="">{amenity.name}</StyledLable>
                  </StyledItemAmenities>
                );
              })}
        </StyledAmenities>

        <label>Features</label>
        <StyledAmenities>
          {amenitiesQuery.isSuccess &&
            amenitiesQuery.data
              .filter((amenity) => amenity.type == "features")
              .map((amenity, index) => {
                return (
                  <StyledItemAmenities key={index}>
                    <StyledInput
                      readOnly
                      checked={amenitiesIdArr.includes(amenity.id)}
                      name="amenities"
                      value={amenity.id}
                      type="checkbox"
                    />
                    <StyledLable htmlFor="">{amenity.name}</StyledLable>
                  </StyledItemAmenities>
                );
              })}
        </StyledAmenities>

        <label>Location</label>
        <StyledAmenities>
          {amenitiesQuery.isSuccess &&
            amenitiesQuery.data
              .filter((amenity) => amenity.type == "location")
              .map((amenity, index) => {
                return (
                  <StyledItemAmenities key={index}>
                    <StyledInput
                      readOnly
                      checked={amenitiesIdArr.includes(amenity.id)}
                      name="amenities"
                      value={amenity.id}
                      type="checkbox"
                    />
                    <StyledLable htmlFor="">{amenity.name}</StyledLable>
                  </StyledItemAmenities>
                );
              })}
        </StyledAmenities>
      </StyledAmenitiesContainer>
      <StyledContentHeader>Images and Video</StyledContentHeader>
      <StyledImages>
        {data.images.map((image, index) => {
          return (
            <div key={index}>
              <img src={image} />
            </div>
          );
        })}
      </StyledImages>
      <StyledContentHeader>Pricing</StyledContentHeader>
      <StyledFlex>
        <div>
          <label>Base Price</label>
          <input readOnly value={"$" + data.base_price} />
        </div>
      </StyledFlex>
      <StyledContentHeader>Booking</StyledContentHeader>
      <StyledGrid>
        <div>
          <label>Booking Type</label>
          <input readOnly value={data.booking_type} />
        </div>
      </StyledGrid>
      <StyledGrid style={{ marginTop: "2rem" }}>
        <div>
          <label>Check in after</label>
          <input readOnly value={data.check_in_after} />
        </div>

        <div>
          <label>Check out before</label>
          <input readOnly value={data.check_out_before} />
        </div>
      </StyledGrid>
      <StyledContentHeader>Calendar</StyledContentHeader>
      <StyledFlex>
        <StyledCalendar minDate={new Date(data.start_date)} maxDate={new Date(data.end_date)} tileDisabled={onExceptionDate} /> <br />
      </StyledFlex>
      <StyledGrid>
        <div>
          <label>Start Date</label>
          <input readOnly value={data.start_date} />
        </div>

        <div>
          <label>End Date</label>
          <input readOnly value={data.end_date} />
        </div>

        <div>
          <label>Minimum Stay</label>
          <input readOnly value={data.minimum_stay + " day"} />
        </div>

        <div>
          <label>Maximum Stay</label>
          <input readOnly value={data.maximum_stay + " day"} />
        </div>

        <div>
          <label>Status</label>
          <input readOnly value={data.property_status ? "Available" : "Not available"} />
        </div>
      </StyledGrid>
      <StyledContentHeader>Decision</StyledContentHeader>
      <StyledGrid>
        <textarea value={message} onChange={(ev) => setMessage(ev.target.value)}></textarea>
        <button onClick={onAccept}>Accept</button>
        <button onClick={onDeny}>Deny</button>
      </StyledGrid>
    </StyledPropertyBody>
  );
}

const UserBody = () => {
  return <div></div>;
};

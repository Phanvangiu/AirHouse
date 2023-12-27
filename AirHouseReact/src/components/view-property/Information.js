import styled from "styled-components";
import CalendarViewHost from "./CalendarViewHost";
import Avatar from "react-avatar";
import { useStateContext } from "contexts/ContextProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled.div``;
const StyledSection = styled.div`
  border-bottom: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: justify;
  padding: 1.5rem 0;
`;
const StyledSectionLast = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: justify;
  padding: 1.5rem 0;
`;
const StyledSectionTow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  line-height: 1.5;
  text-align: justify;
  padding: 1.5rem 0;
  border-bottom: 1px solid #dddddd;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
const StyledHouse = styled.div`
  margin-top: 1rem;
`;
const StyledDetailInfor = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
const StyledSpan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHost = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;

  & .avatar {
    cursor: pointer;
  }

  p {
    margin-left: 20px;
    line-height: 1.5;
  }

  & .hosted {
    font-weight: 600;
    font-size: 16px;
  }

  & .host-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
const StyledDesign = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
`;
const StyledP = styled.p`
  color: #717171;
  font-size: 14px;
`;
const StyledGroupIcon = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
`;
const StyledImageIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`;
const StyledAboutText = styled.p`
  color: #717171;
  font-size: 16px;
  line-height: 1.5;
  text-indent: 30px;
`;
const StyledAboutSeeMore = styled.p`
  overflow: auto;
  background-color: white;
  width: 700px;
  height: 600px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 2rem;
  p {
    font-size: 15px;
    color: #717171;
    margin: 1rem;
    line-height: 1.5;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  gap: 10px;
  font-size: 19px;
  font-weight: 500;
`;
const StyledAmentinies = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 10px;
`;
const StyledSeeMore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledButtonSeeMore = styled.button`
  background-color: white;
  margin: 0.5rem 0;
  border: none;
  font-size: 14px;
  padding: 0.4rem 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #dcdcdc;
    border-radius: 3px;
  }
`;
const StyledSince = styled.span`
  font-weight: 600;
`;
const StyledA = styled.a`
  display: block;
  color: black;
  font-weight: 600;
  text-decoration: none;
  /* line-height: 2rem; */
  font-size: 18px;
  margin-top: 1rem;
`;
const formatDate = (dateObj) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${month} , ${year}`;
};
const Information = ({ data, value, setValue, onHandleChange, disabledBookDate }) => {
  const navigate = useNavigate();
  const { pageWidth } = useStateContext();
  const [showSee, setShowSee] = useState(true);
  //khuc này thêm vào
  // Hàm mở popup và ngăn chặn cuộn (scroll) của body
  const openPopup = () => {
    setShowSee(false);
    document.body.style.overflow = "hidden";
  };

  // Hàm đóng popup và cho phép cuộn (scroll) của body trở lại bình thường
  const closePopup = () => {
    setShowSee(true);
    document.body.style.overflow = "";
  };

  const handleClickSeeMore = () => {
    openPopup();
  };

  const handleClickHide = () => {
    closePopup();
  };
  //toi khúc nay
  const handleDetailClick = (e) => {
    e.stopPropagation();
  };

  // useEffect để theo dõi thay đổi của trạng thái popup và khôi phục trạng thái cuộn (scroll) của body khi component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  //video them vao
  function extractVideoId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match && match[1];
  }

  //toi đây
  return (
    <StyledContainer>
      <StyledSection>
        <StyledTitle>
          <span>
            {data.category.name} in {data.province.full_name}
          </span>
        </StyledTitle>
        <StyledDetailInfor>
          <StyledSpan>
            <span>{data.accomodates_count} guests </span> <span> . </span>
          </StyledSpan>
          <StyledSpan>
            <span>{data.bedroom_count} bedrooms</span> <span> . </span>
          </StyledSpan>
          <StyledSpan>
            <span>{data.bed_count} beds</span>
            <span> . </span>
          </StyledSpan>
          <StyledSpan>
            <span>{data.bathroom_count} baths</span>
          </StyledSpan>
        </StyledDetailInfor>
      </StyledSection>
      <StyledSection>
        <StyledHost onClick={() => window.open(`/profile/dashboard/${data.user.id}`, "_blank")}>
          <div>
            <Avatar className="avatar" src={data.user.image} size="40px" textSizeRatio={2} round={true} name={data.user.first_name} />
          </div>
          <div className="host-container">
            <p className="hosted">
              Hosted by {data.user.first_name} {data.user.last_name}
            </p>
            <p>
              Since <StyledSince>{formatDate(new Date(data.user.created_at))}</StyledSince>
            </p>
          </div>
        </StyledHost>
      </StyledSection>
      <StyledSection>
        <StyledAmentinies>What this place offers</StyledAmentinies>
        <StyledDesign>
          {data.amenities.map((obamenities, index) => {
            return (
              <StyledGroupIcon>
                <StyledImageIcon src={obamenities.icon_image} alt={index} />
                <div>{obamenities.name}</div>
              </StyledGroupIcon>
            );
          })}
        </StyledDesign>
      </StyledSection>
      <StyledSection>
        <StyledTitle>Description</StyledTitle>
        <StyledAboutText>{data.description}</StyledAboutText>
        <StyledSeeMore>
          {showSee ? (
            <StyledButtonSeeMore onClick={handleClickSeeMore}>{">>"} See more</StyledButtonSeeMore>
          ) : (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
              onClick={handleClickHide}
            >
              <StyledAboutSeeMore onClick={handleDetailClick}>
                <StyledTitle>Description</StyledTitle>
                <p>{data.description}</p>
                <StyledTitle>Place great for</StyledTitle>
                <p>{data.place_great_for}</p>
                <StyledTitle>Guest access</StyledTitle>
                <p>{data.guest_access}</p>
                <StyledTitle>Interaction guest</StyledTitle>
                <p>{data.interaction_guest}</p>
                <StyledTitle>Thing to note</StyledTitle>
                <p>{data.thing_to_note}</p>
                <StyledTitle>About place</StyledTitle>
                <p>{data.about_place}</p>
                <StyledTitle>Overview</StyledTitle>
                <p>{data.overview}</p>
                <StyledTitle>Getting around</StyledTitle>
                <p>{data.getting_around}</p>
              </StyledAboutSeeMore>
            </div>
          )}
        </StyledSeeMore>
        {/* video khúc nayf */}
        {data.video && (
          <div>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${extractVideoId(data.video)}`}
              allowFullScreen
              title={data.name}
            ></iframe>
            <StyledA href={data.video} target="_blank" rel="noopener noreferrer">
              Welcome to the Extraordinary Moments at Our Property!
            </StyledA>
          </div>
        )}
        {/* tới đây  */}
      </StyledSection>
      <StyledSection>
        <h2>Location's property</h2>
        <StyledP>
          {data.province.name_en}, {data.district.name_en} {data.address}
        </StyledP>
      </StyledSection>
      {/* khúc này sửa lai */}
      <StyledHouse>
        <StyledTitle>House's rules</StyledTitle>
        <StyledSectionTow>
          <div>
            <StyledP>Check-out after: 12PM </StyledP>
            <StyledP>Check-out before: 14PM</StyledP>
          </div>
          <div>
            <StyledP>Minimum stay: {data.minimum_stay}</StyledP>
            <StyledP>Maximum stay: {data.maximum_stay}</StyledP>
          </div>
          <div>
            <StyledP>{data.accomodates_count} guests maximum</StyledP>
          </div>
        </StyledSectionTow>
      </StyledHouse>
      {/* //tới đây  */}
      {/* Lưu ý session cuối  */}
      <StyledSectionLast>
        <h2>Select check-in date</h2>
        <StyledP>Add your travel dates for exact pricing</StyledP>
        {pageWidth <= 900 || (
          <CalendarViewHost
            disabledBookDate={disabledBookDate}
            value={value}
            setValue={setValue}
            onHandleChange={onHandleChange}
            data={data}
          />
        )}
      </StyledSectionLast>
    </StyledContainer>
  );
};

export default Information;

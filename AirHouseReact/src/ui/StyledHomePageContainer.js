import styled from "styled-components";

const StyledHomePageContainer = styled.div`
  width: 90%;
  margin: auto;


  @media only screen and (max-width: 1400px) {
    & {
      width: 93%;
    }
  }

  @media only screen and (max-width: 1200px) {
    & {
      width: 95%;
    }
  }
  @media only screen and (max-width: 992px) {
    & {
      width: 95%;
    }
  }
`;

export default StyledHomePageContainer;

import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../../contexts/ContextProvider";

import StyledBoxContainer from "../../../ui/StyledBoxContainer";

const StyledFilterButton = styled(StyledBoxContainer)`
  padding: 16px 1rem;
  display: flex;
  gap: 5px;
  cursor: pointer;
  position: relative;

  ${(props) => {
    if (props.$count != 0) {
      let str = String(props.$count);
      return css`
        border: 2px solid black;
        &::after {
          content: "${str}";
          position: absolute;
          transform: translate(4rem, -1.5rem);
          background-color: white;
          font-size: 600;
          font-size: 17px;
        }
      `;
    }
  }}
`;

const StyledResizeFilterButton = styled.div`
  padding: 12px 12px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;

  ${(props) => {
    if (props.$count != 0) {
      let str = String(props.$count);
      return css`
        border: 2px solid black;
        &::after {
          content: "${str}";
          position: absolute;
          transform: translate(-10px, -1.3rem);
          background-color: white;
          font-size: 600;
          font-size: 17px;
        }
      `;
    }
  }}
`;

function FilterButton({ setClickFilter }) {
  const { pageWidth, state } = useStateContext();

  let count = 0;

  if (state.roomType != "any") {
    count++;
  }

  if (state.bathRoom != "any") {
    count++;
  }

  if (state.bedRoom != "any") {
    count++;
  }

  if (state.amenities.length != 0) {
    count++;
  }

  if (state.propertyType != "any") {
    count++;
  }

  return (
    <>
      {pageWidth >= 800 ? (
        <StyledFilterButton $count={count} onClick={() => setClickFilter(true)}>
          <FontAwesomeIcon icon={faSliders} />
          <p>Filters</p>
        </StyledFilterButton>
      ) : (
        <StyledResizeFilterButton $count={count} onClick={() => setClickFilter(true)}>
          <FontAwesomeIcon icon={faSliders} />
        </StyledResizeFilterButton>
      )}
    </>
  );
}

export default FilterButton;

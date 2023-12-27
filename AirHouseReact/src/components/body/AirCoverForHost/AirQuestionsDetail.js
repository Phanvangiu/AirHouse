import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";

const StyleQuestion = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 0 24px 0;
`;
const StyleAsk = styled.div`
  font-size: 22px;
  line-height: 26px;
`;
const StyleText = styled.div`
  color: #717171;
  font-size: 17px;
  line-height: 22px;
`;
const Stylebutton = styled.button`
  border: none;
  background-color: #f7f7f7;
  font-weight: 600;
  font-size: 16px;
`;
const StyleHr = styled.hr`
  color: #717171;
`;
const AirQuestionsDetail = (props) => {
  const [showText, setShowText] = useState(false);
  
  const [icon, setIcon] = useState(true);
  const handleClick = () => {
    setShowText((prevShowText) => !prevShowText);
    setIcon((icon) => !icon);
  };

  function click(){

  }
  return (
    <div>
      <div>
        <div>
          <StyleQuestion>
            <StyleAsk>{props.question}</StyleAsk>
            <Stylebutton onClick={handleClick}>
              {icon ? (
                <FontAwesomeIcon icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )}
            </Stylebutton>
          </StyleQuestion>
          <StyleText>{showText && <span>{props.answer}</span>}</StyleText>
          <StyleHr></StyleHr>
        </div>
      </div>
    </div>
  );
};

export default AirQuestionsDetail;

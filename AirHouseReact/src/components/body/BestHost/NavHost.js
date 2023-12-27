import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
const StyleNav = styled.div`
  margin-top: 20px;
  width: 100%;
`;
const StyleNavHost = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: center;
  justify-content: space-between;
`;
const StyleNavHostRight = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: start;
`;
const StyleA = styled.a`
  color: black;
  text-decoration: none;
  padding: 0 20px 0 20px;
  font-size: 20px;
  font-weight: 600;
`;
const StyleAa = styled.a`
  color: black;
  text-decoration: none;
  margin-right: 16px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
`;
const StyleSpan = styled.span`
  padding: 0 20px 0 0;
`;
const StyleInput = styled.input`
  border: none;
  font-size: 20px;
`;
const StyleButtonRight = styled.button`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  border-radius: 5px;
  border: 1px solid #f7f7f7;
  font-size: 20px;
  text-overflow: ellipsis;
`;
const StyleButtonTotal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleBut = styled.div`
  background-color: white;
  margin: 0 10px 0 10px;
`;

const StyleAaa = styled.a`
  text-decoration: none;
  border: none;
  background-color: white;
  color: black;
`;
const Styleimg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;
const StyleButton = styled.button`
  background-color: white;
  border: none;
  font-size: 16px;
`;
const NavHost = () => {
  return (
    <StyleNav>
      <StyleNavHost>
        <StyleNavHostRight>
          <div>
            <StyleA href="https://www.airbnb.com/">Logo</StyleA>
            <StyleAa href="https://www.airbnb.com/">Resoure Center</StyleAa>
          </div>
          <div>
            <StyleButtonRight>
              <StyleSpan>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </StyleSpan>
              <StyleInput
                type="search"
                placeholder='Try "create a great listing"'
              />
            </StyleButtonRight>
          </div>
        </StyleNavHostRight>
        <div>
          <StyleButtonTotal>
            <StyleBut>
              <StyleButton>
                <StyleAaa href="https://www.airbnb.com/">Topics</StyleAaa>
              </StyleButton>
            </StyleBut>
            <StyleBut>
              <StyleButton>
                <StyleAaa href="https://www.airbnb.com/">Learning</StyleAaa>
              </StyleButton>
            </StyleBut>
            <StyleBut>
              <StyleButton>
                <StyleAaa href="https://www.airbnb.com/">New</StyleAaa>
              </StyleButton>
            </StyleBut>
            <StyleBut>
              <StyleButton>
                <StyleAaa href="https://www.airbnb.com/">Help</StyleAaa>
              </StyleButton>
            </StyleBut>
            <StyleBut>
              <StyleButton>
                <StyleAaa href="https://www.airbnb.com/">
                  <Styleimg
                    src="https://i.pinimg.com/564x/8b/5a/91/8b5a914d027c22873d77cf03e08dd495.jpg"
                    alt="Picture"
                  />
                </StyleAaa>
              </StyleButton>
            </StyleBut>
          </StyleButtonTotal>
        </div>
      </StyleNavHost>
    </StyleNav>
  );
};

export default NavHost;

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Container = styled.button`
  font-family: "Poppins", sans-serif;
  background-color: white;
  border:0;

  border-radius: 50px;
  &:hover{
    transform: scale(110%);
    background-color: rgba(125, 125, 125, 0.1);
  }

  &:active{
    transform: scale(100%);
  }

`;

function CloseButton(){
  return <Container>
    <FontAwesomeIcon icon={faClose}/>
  </Container>
}


export default CloseButton;
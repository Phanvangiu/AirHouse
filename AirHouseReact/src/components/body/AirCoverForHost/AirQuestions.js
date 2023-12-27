import React from "react";
import AirQuestionsDetail from "./AirQuestionsDetail";
import styled from "styled-components";
const StyleBody = styled.div`
  background-color: #f7f7f7;
`;
const StyleAirQuestion = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 100px 0 100px 0;
  max-width: 1200px;
  margin: 0 auto;
`;
const StyleH2 = styled.h2`
  font-size: 70px;
  font-weight: 600;
`;
const StyleTitleDetail = styled.div`
  font-size: 26px;
  line-height: 26px;
  padding-top: 20px;
`;
const StyleA = styled.a`
  color: black;
  font-weight: 500;
`;
const AirQuestions = () => {
  return (
    <StyleBody>
      <StyleAirQuestion>
        <div>
          <StyleH2>Your questions, answered</StyleH2>
          <StyleTitleDetail>
            Can’t find what you’re looking for?{" "}
            <div>
              Visit our
              <StyleA href="https://www.airbnb.com/"> Help Center.</StyleA>
            </div>
          </StyleTitleDetail>
        </div>
        <div>
          <AirQuestionsDetail
            question={"What is AirCover for Hosts?"}
            answer={
              "AirCover for Hosts is top-to-bottom protection for Hosts. It includes guest identity verification, reservation screening, $3M Host damage protection, $1M Host liability insurance, $1M Experiences liability insurance, and a 24-hour safety line."
            }
          ></AirQuestionsDetail>
          <AirQuestionsDetail
            question={"What is AirCover for Hosts?"}
            answer={
              "AirCover for Hosts is top-to-bottom protection for Hosts. It includes guest identity verification, reservation screening, $3M Host damage protection, $1M Host liability insurance, $1M Experiences liability insurance, and a 24-hour safety line."
            }
          ></AirQuestionsDetail>
          <AirQuestionsDetail
            question={"Is AirCover for Hosts free?"}
            answer={
              "Yes, AirCover for Hosts is included for free every time you host."
            }
          ></AirQuestionsDetail>
          <AirQuestionsDetail
            question={"Where is AirCover for Hosts available?"}
            answer={
              "AirCover for Hosts’ damage protection and liability insurance are available in every country with Airbnbs, except which has its own protection program."
            }
          ></AirQuestionsDetail>
          <AirQuestionsDetail
            question={
              "What’s the difference between damage protection and liability insurance?"
            }
            answer={
              "AirCover for Hosts includes both damage protection and liability insurance. Host damage protection will reimburse you if your place or belongings ever get damaged by a guest during an Airbnb stay. Host damage protection isn’t an insurance policy. Host liability insurance is provided by third party insurance carriers and applies in the rare event that a guest gets hurt during an Airbnb stay or Experience."
            }
          ></AirQuestionsDetail>
          <AirQuestionsDetail
            question={
              "How does AirCover for Hosts work with my personal insurance?"
            }
            answer={
              "While AirCover for Hosts protects you while you’re hosting an Airbnb stay or Experience, it is not a substitute for personal insurance. You may also be required by law to maintain certain auto insurance, which would not be satisfied by AirCover for Hosts. Since everyone’s situation is different you should talk to your insurer to see how, or if, your policy overlaps with AirCover for Hosts."
            }
          ></AirQuestionsDetail>
          <AirQuestionsDetail
            question={"Are there damages that aren’t covered?"}
            answer={
              "Host Damage Protection does not cover loss of currency. Normal wear and tear or losses incurred due to acts of nature (like earthquakes and hurricanes) are also not covered. Auto and boat protection applies to parked vehicles and vessels. Review the complete list of what’s covered."
            }
          ></AirQuestionsDetail>
          <AirQuestionsDetail
            question={
              "How do I get reimbursed for damage? How long does it take?"
            }
            answer={
              "If a guest has damaged your place or belongings, visit our Resolution Center to submit a reimbursement request. Your request will first be sent to the guest, and if the guest does not respond or pay within 24 hours, you’ll be able to involve Airbnb to request reimbursement.Reimbursement requests are resolved as quickly as possible. It typically takes two weeks from the time you file a request with Airbnb for your payment to be issued. If you’re a Superhost, with listings outside of Washington state, you get access to a dedicated support line and priority routing for reimbursement requests."
            }
          ></AirQuestionsDetail>
          <AirQuestionsDetail
            question={"Do guests get AirCover too?"}
            answer={
              "Yes. It comes with every booking. If there is a serious issue with the Airbnb that can’t be resolved by the Host, we'll help guests find a similar place or give them a refund."
            }
          ></AirQuestionsDetail>
        </div>
      </StyleAirQuestion>
    </StyleBody>
  );
};

export default AirQuestions;

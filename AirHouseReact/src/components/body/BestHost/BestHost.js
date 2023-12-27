import React from "react";
import NavHost from "./NavHost";
import Alsolike from "./Alsolike";
import Learning from "./Learning";
import Topics from "./Topics";
import News from "./News";
import Givefeedback from "./Givefeedback";
import MoreTips from "./MoreTips";
import HostCarousel from "./HostCarousel";
const BestHost = () => {
  return (
    <div>
      <NavHost></NavHost>
      <HostCarousel></HostCarousel>
      <Alsolike></Alsolike>
      <Learning></Learning>
      <Topics></Topics>
      <News></News>
      <Givefeedback></Givefeedback>
      <MoreTips></MoreTips>
    </div>
  );
};

export default BestHost;

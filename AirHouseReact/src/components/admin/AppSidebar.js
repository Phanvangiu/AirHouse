import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "assets/brand/logo-negative";
import icon from "assets/AIR house.svg";
import { sygnet } from "assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../../_nav";

const StyledImg = styled.img`
  width: 50%;
  height: 50%;
`;

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <StyledImg src={icon} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => dispatch({ type: "set", sidebarUnfoldable: !unfoldable })} />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);

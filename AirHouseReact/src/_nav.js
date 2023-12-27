import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilRoom,
  cilHouse,
  cilMenu,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavTitle,
    name: "Admin",
  },
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/admin",
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Type",
    to: "admin/type",
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Category",
        to: "type/category",
      },
      {
        component: CNavItem,
        name: "Room Type",
        to: "type/room_type",
      },
      {
        component: CNavItem,
        name: "Amenities",
        to: "type/amenities",
      },
      {
        component: CNavItem,
        name: "Property Type",
        to: "type/property_type",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Properties Status",
    to: "properties_status",
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Blog",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Blog List",
        to: "blog/blog-list",
      },
      {
        component: CNavItem,
        name: "Blog Category List",
        to: "blog/blog-category-list",
      },
    ],
  },
];

export default _nav;

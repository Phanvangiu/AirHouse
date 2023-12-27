import React from "react";

const Dashboard = React.lazy(() => import("./dashboard/Dashboard"));
const Colors = React.lazy(() => import("./theme/colors/Colors"));
const Typography = React.lazy(() => import("./theme/typography/Typography"));

// Base
const Accordion = React.lazy(() => import("./base/accordion/Accordion"));
const Breadcrumbs = React.lazy(() => import("./base/breadcrumbs/Breadcrumbs"));
const Cards = React.lazy(() => import("./base/cards/Cards"));
const Carousels = React.lazy(() => import("./base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./base/collapses/Collapses"));
const ListGroups = React.lazy(() => import("./base/list-groups/ListGroups"));
const Navs = React.lazy(() => import("./base/navs/Navs"));
const Paginations = React.lazy(() => import("./base/paginations/Paginations"));
const Placeholders = React.lazy(() => import("./base/placeholders/Placeholders"));
const Popovers = React.lazy(() => import("./base/popovers/Popovers"));
const Progress = React.lazy(() => import("./base/progress/Progress"));
const Spinners = React.lazy(() => import("./base/spinners/Spinners"));
const Tables = React.lazy(() => import("./base/tables/Tables"));
const Tooltips = React.lazy(() => import("./base/tooltips/Tooltips"));

// Buttons
const Buttons = React.lazy(() => import("./buttons/buttons/Buttons"));
const ButtonGroups = React.lazy(() => import("./buttons/button-groups/ButtonGroups"));
const Dropdowns = React.lazy(() => import("./buttons/dropdowns/Dropdowns"));

//Forms
const ChecksRadios = React.lazy(() => import("./forms/checks-radios/ChecksRadios"));
const FloatingLabels = React.lazy(() => import("./forms/floating-labels/FloatingLabels"));
const FormControl = React.lazy(() => import("./forms/form-control/FormControl"));
const InputGroup = React.lazy(() => import("./forms/input-group/InputGroup"));
const Layout = React.lazy(() => import("./forms/layout/Layout"));
const Range = React.lazy(() => import("./forms/range/Range"));
const Select = React.lazy(() => import("./forms/select/Select"));
const Validation = React.lazy(() => import("./forms/validation/Validation"));

const Charts = React.lazy(() => import("./charts/Charts"));

// Icons
const CoreUIIcons = React.lazy(() => import("./icons/coreui-icons/CoreUIIcons"));
const Flags = React.lazy(() => import("./icons/flags/Flags"));
const Brands = React.lazy(() => import("./icons/brands/Brands"));

// Notifications
const Alerts = React.lazy(() => import("./notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./notifications/badges/Badges"));
const Modals = React.lazy(() => import("./notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./notifications/toasts/Toasts"));

const Widgets = React.lazy(() => import("./widgets/Widgets"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
  { path: "/base", name: "Base", element: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", element: Accordion },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", element: Breadcrumbs },
  { path: "/base/cards", name: "Cards", element: Cards },
  { path: "/base/carousels", name: "Carousel", element: Carousels },
  { path: "/base/collapses", name: "Collapse", element: Collapses },
  { path: "/base/list-groups", name: "List Groups", element: ListGroups },
  { path: "/base/navs", name: "Navs", element: Navs },
  { path: "/base/paginations", name: "Paginations", element: Paginations },
  { path: "/base/placeholders", name: "Placeholders", element: Placeholders },
  { path: "/base/popovers", name: "Popovers", element: Popovers },
  { path: "/base/progress", name: "Progress", element: Progress },
  { path: "/base/spinners", name: "Spinners", element: Spinners },
  { path: "/base/tables", name: "Tables", element: Tables },
  { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
  { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", element: Buttons },
  { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
  { path: "/buttons/button-groups", name: "Button Groups", element: ButtonGroups },
  { path: "/charts", name: "Charts", element: Charts },
  { path: "/forms", name: "Forms", element: FormControl, exact: true },
  { path: "/forms/form-control", name: "Form Control", element: FormControl },
  { path: "/forms/select", name: "Select", element: Select },
  { path: "/forms/checks-radios", name: "Checks & Radios", element: ChecksRadios },
  { path: "/forms/range", name: "Range", element: Range },
  { path: "/forms/input-group", name: "Input Group", element: InputGroup },
  { path: "/forms/floating-labels", name: "Floating Labels", element: FloatingLabels },
  { path: "/forms/layout", name: "Layout", element: Layout },
  { path: "/forms/validation", name: "Validation", element: Validation },
  { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", element: Flags },
  { path: "/icons/brands", name: "Brands", element: Brands },
  { path: "/notifications", name: "Notifications", element: Alerts, exact: true },
  { path: "/notifications/alerts", name: "Alerts", element: Alerts },
  { path: "/notifications/badges", name: "Badges", element: Badges },
  { path: "/notifications/modals", name: "Modals", element: Modals },
  { path: "/notifications/toasts", name: "Toasts", element: Toasts },
  { path: "/widgets", name: "Widgets", element: Widgets },
];

export default routes;

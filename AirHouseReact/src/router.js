import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const DefaultLayout = lazy(() => import("./layouts/DefaultLayout"));
const AircoverForHosts = lazy(() => import("./components/body/AirCoverForHost/AircoverForHosts"));
const BestHost = lazy(() => import("./components/body/BestHost/BestHost"));

const AdminLayout = lazy(() => import("layouts/AdminLayout"));
const Dashboard = lazy(() => import("./views/dashboard/Dashboard"));

const AdminLogin = lazy(() => import("views/pages/login/Login"));
const AdminRegister = lazy(() => import("views/pages/register/Register"));

// admin custom import
const Amenities = lazy(() => import("views/type/amenities/Amenities"));
const PropertyType = lazy(() => import("views/type/property_type/PropertyType"));
const Category = lazy(() => import("views/type/category/Category"));
const RoomType = lazy(() => import("views/type/room_type/RoomType"));

// guest

const GuestLayout = lazy(() => import("layouts/GuestLayout"));
const HostCreationIndex = lazy(() => import("components/host-creation/HostCreationIndex"));
const HostUpdateIndex = lazy(() => import("components/host-creation/HostUpdateIndex"));
const BecomeHost = lazy(() => import("components/host-creation/BecomeHost"));
const Basic = lazy(() => import("components/host-creation/Basic"));
const Description = lazy(() => import("components/host-creation/Description"));
const HostCreationContent = lazy(() => import("components/host-creation/HostCreationContent"));
const Detail = lazy(() => import("components/host-creation/Details"));
const Amenitiess = lazy(() => import("components/host-creation/Amenities"));
const Photos = lazy(() => import("components/host-creation/Photos"));
const Pricing = lazy(() => import("components/host-creation/Pricing"));
const Location = lazy(() => import("components/host-creation/Location"));
const Calendar = lazy(() => import("components/host-creation/Calendar"));
const Booking = lazy(() => import("components/host-creation/Booking"));

// chat

// const ChatComponent = lazy(() => import("components/chat/ChatLayout"));

// profile

const ProfileLayout = lazy(() => import("components/Profile/UserLayout"));
const EditProfile = lazy(() => import("components/Profile/EditProfile/EditProflie"));
const ProfilePhoto = lazy(() => import("components/Profile/ProfilePhoto/ProfilePhoto"));

// properties_status
const Status = lazy(() => import("views/status/Status"));

// view property
const ViewProperty = lazy(() => import("components/view-property/ViewProperty"));

// blog
const CreateBlog = lazy(() => import("views/blog/CreateBlog"));
const UpdateBlog = lazy(() => import("views/blog/UpdateBlog"));
const BlogList = lazy(() => import("views/blog/BlogList"));
const BlogCategoryList = lazy(() => import("views/blog/BlogCategoryList"));

const Blog = lazy(() => import("components/blog/Blog"));

const BookingList = lazy(() => import("components/user-booking/UserBooking"));

const Listing = lazy(() => import("components/listing/ListingIndex"));

// payment

const PaymentBooking = lazy(() => import("components/payment/PaymentBooking"));
const PaymentSuccess = lazy(() => import("components/payment/PaymentSuccess"));
const PaymentNotFound = lazy(() => import("components/payment/PaymentNotFound"));

const BlogPage = lazy(() => import("components/blog/BlogPage"));
const BlogSearch = lazy(() => import("components/blog/BlogSearch"));

const BookingDetail = lazy(() => import("components/property-booking-detail/BookingDetail"));
const Chat = lazy(() => import("components/chat/Chat"));

const ViewHostAllBooking = lazy(() => import("components/view-host-booking/ViewHostBooking"));

const DefaultViewDashboard = lazy(() => import("components/inforDashboard/DefaultViewDashBoard"));
const HostViewDashBoard = lazy(() => import("components/inforDashboard/HostViewDashboard"));

const router = createBrowserRouter([
  {
    path: "/user",
    element: <GuestLayout />,
    exact: true,
    children: [
      {
        path: "your-dashboard",
        element: <HostViewDashBoard />,
        exact: true,
      },
      {
        path: "chat",
        element: <Chat />,
        exact: true,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        exact: true,
        children: [
          {
            path: "detail",
            element: <EditProfile />,
            exact: true,
          },
          {
            path: "media",
            element: <ProfilePhoto />,
            exact: true,
          },
        ],
      },
      {
        path: "/user/host-creation",
        element: <HostCreationIndex />,
        exact: true,
        children: [
          { path: "become-host", element: <BecomeHost />, exact: true },
          {
            path: "content",
            element: <HostCreationContent />,
            exact: true,
            children: [
              { path: "basic", element: <Basic />, exact: true },
              { path: "description", element: <Description />, exact: true },
              { path: "details", element: <Detail />, exact: true },
              { path: "amenities", element: <Amenitiess />, exact: true },
              { path: "photo", element: <Photos />, exact: true },
              { path: "pricing", element: <Pricing />, exact: true },
              { path: "location", element: <Location />, exact: true },
              { path: "calendar", element: <Calendar />, exact: true },
              { path: "booking", element: <Booking />, exact: true },
            ],
          },
        ],
      },
      {
        path: "/user/host-update",
        element: <HostUpdateIndex />,
        exact: true,
        children: [
          { path: "become-host", element: <BecomeHost />, exact: true },
          {
            path: "content",
            element: <HostCreationContent />,
            exact: true,
            children: [
              { path: "basic", element: <Basic />, exact: true },
              { path: "description", element: <Description />, exact: true },
              { path: "details", element: <Detail />, exact: true },
              { path: "amenities", element: <Amenitiess />, exact: true },
              { path: "photo", element: <Photos />, exact: true },
              { path: "pricing", element: <Pricing />, exact: true },
              { path: "location", element: <Location />, exact: true },
              { path: "calendar", element: <Calendar />, exact: true },
              { path: "booking", element: <Booking />, exact: true },
            ],
          },
        ],
      },
      {
        path: "booking-list",
        element: <BookingList />,
        exact: true,
      },
      {
        path: "listing",
        element: <Listing />,
        exact: true,
      },
      {
        path: "/user/payment",
        element: <PaymentBooking />,
        exact: true,
      },
      {
        path: "/user/paymentError",
        element: <PaymentNotFound />,
        exact: true,
      },
      {
        path: "/user/sucsessPayment",
        element: <PaymentSuccess />,
        exact: true,
      },
      {
        path: "/user/booking-detail",
        element: <BookingDetail />,
        exact: true,
      },
      {
        path: "/user/view-all-host-bookings",
        element: <ViewHostAllBooking />,
        exact: true,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    exact: true,
    children: [
      {
        path: "/profile/dashboard/:id",
        element: <DefaultViewDashboard />,
        exact: true,
      },
      {
        path: "/",
        element: <Home />,
        exact: true,
      },
      {
        path: "/aircover-for-hosts",
        element: <AircoverForHosts />,
        exact: true,
      },
      {
        path: "/best-host",
        element: <BestHost />,
        exact: true,
      },
      {
        path: "/property",
        element: <ViewProperty />,
        exact: true,
      },
      {
        path: "/blog",
        element: <Blog />,
        exact: true,
      },
      {
        path: "/blog/:id",
        element: <BlogPage />,
        exact: true,
      },
      {
        path: "/blog/search-page",
        element: <BlogSearch />,
        exact: true,
      },
    ],
  },
  {
    path: "/admin_login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin", name: "Dashboard", element: <Dashboard /> },
      { path: "/admin/register", name: "AdminRegister", element: <AdminRegister /> },
      { path: "/admin/type/amenities", name: "Amenities", element: <Amenities />, exact: true },
      { path: "/admin/type/property_type", name: "Property Type", element: <PropertyType />, exact: true },
      { path: "/admin/type/category", name: "Category", element: <Category />, exact: true },
      { path: "/admin/type/room_type", name: "Room Type", element: <RoomType />, exact: true },
      { path: "/admin/properties_status", name: "status", element: <Status /> },
      { path: "/admin/blog/create-blog", name: "create blog", element: <CreateBlog />, exact: true },
      { path: "/admin/blog/blog-list", name: "create blog", element: <BlogList />, exact: true },
      {
        path: "/admin/blog/create-blog",
        name: "CreateBlog",
        element: <CreateBlog />,
        exact: true,
      },
      {
        path: "/admin/blog/update-blog",
        name: "CreateBlog",
        element: <UpdateBlog />,
        exact: true,
      },
      {
        path: "/admin/blog/blog-list",
        name: "BlogList",
        element: <BlogList />,
        exact: true,
      },
      {
        path: "/admin/blog/blog-category-list",
        name: "BlogCategoryList",
        element: <BlogCategoryList />,
        exact: true,
      },
    ],
  },
  {
    path: "*",
    name: "rrst",
    element: <Chat />,
  },
]);

export default router;

import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "@components/ProtectedRoute";
import { Layout } from "@components/Layout";
import { ProtectedRegistrationLayout } from "@pages/Registration/components/ProtectedRegistrationLayout";
import {
  Home,
  Spaces,
  Artists,
  Proposals,
  Announcements,
  Mypage,
  Start,
} from "@pages";
import { KakaoVerify } from "@pages/Registration/components/KakaoVerify";
import { StepGuard } from "@guards/StepGuard";
import { ARTIST_STEP, SPACE_STEP } from "@pages/Registration/types/steps";
import RegisterIndexRedirect from "@pages/Registration/components/RegisterIndexRedirect";
import {
  ArtistBasicForm,
  ArtistRegionForm,
  ArtistPortfolioForm,
  ArtistPayForm,
} from "@pages/Registration/components/artist";
import { SpaceBusinessForm } from "@pages/Registration/components/space";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Start /> },
      { path: "register/verify", element: <KakaoVerify /> },
      {
        path: "register",
        element: <ProtectedRegistrationLayout />,
        children: [
          { index: true, element: <RegisterIndexRedirect /> },

          // Artist
          {
            path: "artist/basic",
            element: (
              <StepGuard role="artist" step={ARTIST_STEP.Basic}>
                <ArtistBasicForm />
              </StepGuard>
            ),
          },
          {
            path: "artist/region",
            element: (
              <StepGuard role="artist" step={ARTIST_STEP.RegionCategory}>
                <ArtistRegionForm />
              </StepGuard>
            ),
          },
          {
            path: "artist/portfolio",
            element: (
              <StepGuard role="artist" step={ARTIST_STEP.Portfolio}>
                <ArtistPortfolioForm />
              </StepGuard>
            ),
          },
          {
            path: "artist/pay",
            element: (
              <StepGuard role="artist" step={ARTIST_STEP.Pay}>
                <ArtistPayForm />
              </StepGuard>
            ),
          },

          // Space
          {
            path: "space/business",
            element: (
              <StepGuard role="space" step={SPACE_STEP.Business}>
                <SpaceBusinessForm />
              </StepGuard>
            ),
          },
          // {
          //   path: "space/address",
          //   element: (
          //     <StepGuard role="space" step={SPACE_STEP.AddressCapacity}>
          //       <SpaceAddressForm />
          //     </StepGuard>
          //   ),
          // },
          // {
          //   path: "space/venue",
          //   element: (
          //     <StepGuard role="space" step={SPACE_STEP.VenueBasic}>
          //       <SpaceVenueForm />
          //     </StepGuard>
          //   ),
          // },
          // {
          //   path: "space/category",
          //   element: (
          //     <StepGuard role="space" step={SPACE_STEP.Category}>
          //       <SpaceCategoryForm />
          //     </StepGuard>
          //   ),
          // },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "home", element: <Home /> },
          { path: "spaces", element: <Spaces /> },
          { path: "artists", element: <Artists /> },
          { path: "proposals", element: <Proposals /> },
          { path: "announcements", element: <Announcements /> },
          { path: "mypage", element: <Mypage /> },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

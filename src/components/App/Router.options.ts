import * as Page from "components/pages"

export default [
  { protected: false, exact: true, path: "/", component: Page.Map },
  { protected: false, exact: true, path: "/profile", component: Page.ProfileForm },
  { protected: false, exact: false, path: "/locations/:entity/:id", component: Page.Location },
  { protected: false, exact: true, path: "/login", component: Page.Login },
  { protected: false, exact: true, path: "/register", component: Page.Register },
  { protected: true, exact: true, path: "/events", component: Page.Events },
  { protected: true, exact: true, path: "/event", component: Page.EventForm },
  { protected: true, exact: false, path: "/event/:id", component: Page.EventForm },
  { protected: true, exact: true, path: "/parkings", component: Page.Parkings },
  { protected: true, exact: true, path: "/parking", component: Page.ParkingForm },
  { protected: true, exact: false, path: "/parking/:id", component: Page.ParkingForm },
  { protected: true, exact: true, path: "/services", component: Page.Services },
  { protected: true, exact: true, path: "/service", component: Page.ServiceForm },
  { protected: true, exact: false, path: "/service/:id", component: Page.ServiceForm },
  { protected: true, exact: true, path: "/shops", component: Page.Shops },
  { protected: true, exact: true, path: "/shop", component: Page.ShopForm },
  { protected: true, exact: false, path: "/shop/:id", component: Page.ShopForm },
]

import Layout from "@/components/layout";
import Root from "../pages/index";

import { createBrowserRouter } from "react-router-dom";

export const reactRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Root />
      </Layout>
    ),
  },
]);

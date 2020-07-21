import React from "react";
import { Route, Switch } from "react-router-dom";

const Routes = [
  {
    path: "/user/table",
    class: "user-link-buttons",
    key: "Participants",
  },
  {
    path: "/meetings/table",
    class: "user-link-buttons",
    key: "Meetings",
  },
  {
    path: "/events/table",
    class: "user-link-buttons",
    key: "Events",
  },
  {
    path: "/comments/table",
    class: "user-link-buttons",
    key: "Comments",
  },
  {
    path: "/evals/table",
    class: "user-link-buttons",
    key: "Evaluations",
  },
];

export default Routes;

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

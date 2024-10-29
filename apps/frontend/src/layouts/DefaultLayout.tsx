import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router";
import { getCurrentSessionProfile } from "../api/fetch";
import { reactQueryKeys } from "../api/react-query-keys";

export function DefaultLayout() {
  const { data: currentSessionProfile, isLoading } = useQuery({
    queryKey: [reactQueryKeys.session],
    queryFn: getCurrentSessionProfile
  });

  if (isLoading) {
    return <div></div>;
  }
  if (!currentSessionProfile) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <header>
        <h1>Teams Helper</h1>
        <p>YOU = {currentSessionProfile.email}</p>
      </header>
      <Outlet />
    </>
  );
}

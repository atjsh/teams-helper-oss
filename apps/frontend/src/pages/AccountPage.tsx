import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "../api/fetch";

export function AccountPage() {
  const navigate = useNavigate();

  const mutateLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => navigate("/login")
  });

  function handleLogout() {
    mutateLogout.mutate();
  }

  return (
    <div>
      <h1>Account</h1>
      <button onClick={handleLogout} disabled={mutateLogout.isPending}>
        Logout
      </button>
    </div>
  );
}

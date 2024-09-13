import { useAuthActions } from "@convex-dev/auth/react";

export default function Auth() {
  const { signIn } = useAuthActions();

  return (
    <div>
      <h1>Sign In</h1>
      <button
        onClick={() => {
          signIn("github");
        }}
      >
        Sign In with Github
      </button>
    </div>
  );
}

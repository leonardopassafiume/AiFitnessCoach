import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession, signInWithPassword, signOut, signUpWithPassword } from "./api";

export function useSession() {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: getSession,
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => signInWithPassword(email, password),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => signUpWithPassword(email, password),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
    },
  });
}

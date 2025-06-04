import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const useJoin = () => {
    const queryClient = useQueryClient();
    const joinMutation = ...
    mutationFn: async (params: JoinParams) => {
    const [error] = await ...(requestJoin(params));
    if (isAxiosError(error) && error.response?.status === 409) {
    return { result: "conflict" as const };
    }
    if (error) {
    throw error;
    }
    return { result: "success" as const };
    },
    onSuccess: async () => {

    },
  })
  return { join: joinMutation.mutateAsync }
}
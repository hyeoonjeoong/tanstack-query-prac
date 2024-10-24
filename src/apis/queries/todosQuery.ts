import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const QUERY_KEY = ['todos'];

export const useTodosQuery = () => {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: async () => {
            const response = await axios.get('/todos');
            return response.data;
        },
    });
};

export const useTodosMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (contents: string) => axios.post('/todos', { contents }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });
};

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import axios, {AxiosPromise} from "axios";

export const useGetUserListQuery = () => {
    return useQuery({
        queryKey: ['userList'],
        queryFn: async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
            return response.data.slice(0, 10);
        },
        staleTime: 1000 * 5 // 5초 후 stale
    });
};

// export const useUpdatePostMutation = () => {
//     return useMutation({
//         mutationFn: async (postId, updatedData) => {
//             const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedData, {
//                 headers: {
//                     'Content-Type': 'application/json; charset=UTF-8',
//                 },
//             });
//             return response.data;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: QUERY_KEY });
//         },
//     });
// };
//

const getCommentDetail = async (id: string) => {
    return await axios.get('https://jsonplaceholder.typicode.com/comments');
}
const useGetCommentsQuery = () => {
    return useQuery({
        queryKey: ['commentList'],
        queryFn: ()=> getCommentDetail('id')
    })
}


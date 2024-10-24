'use client'

import { useGetUserListQuery } from "@/apis/queries/testQuery";
import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface TComments {
    postId: number;
    id: number;
    name: string
    email: string
    body: string
}

const PracticePage = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, error, isStale } = useGetUserListQuery();

    const mutation = useMutation({
        mutationFn: async ({ postId, title }: { postId: number; title: string }) => {
            const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                title: title,
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userList'] });
        },
    });

    console.log(data, 'data')
    console.log(mutation,'mutation')

    const handleUpdate = (postId: number) => {
        mutation.mutate({ postId, title: 'foo' });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }

    return (
        <>
            <h4>TanStack Query</h4>
            <div>데이터가 {isStale ? 'stale 한 상태. 시간이 지난 기존 데이터' : 'fresh 한 상태. 최신 데이터'}</div>
            <div>
                {data && data.map((comment: TComments) => (
                    <div key={comment.id}>{comment.name}</div>
                ))}
            </div>

            <button onClick={() => handleUpdate(1)}>post 요청하기</button>
            {/*{mutation.isLoading && <p>Updating...</p>}*/}
            {mutation.isError && <p>isError: {mutation.error.message}</p>}
            {mutation.isSuccess && <p>post 성공</p>}
        </>
    );
}

export default PracticePage;

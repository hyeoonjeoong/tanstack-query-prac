'use client'

import {useMutation, useQueries, useQuery, useQueryClient} from "@tanstack/react-query";
import {useTodosMutation, useTodosQuery} from "@/apis/queries/todosQuery";
import axios, {AxiosResponse} from "axios";

export interface TData {
    full_name: string,
    description: string,
    subscribers_count: number,
    stargazers_count: number,
    forks_count: number,
    isFetching: string
}

export interface Todo {
    id: Date;
    title: string;
}

const QuickStartPage = ()=>{
  const queryClient = useQueryClient();

  // const {data} = useTodosQuery()
  // const {mutate} = useTodosMutation()

    // const { isPending, error, data, isFetching } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: async () => {
    //         const response = await fetch(
    //             'https://api.github.com/repos/TanStack/query',
    //         )
    //         return await response.json()
    //     },
    // })

    const getData = async (): Promise<TData> => {
        const response = await axios.get('https://api.github.com/repos/TanStack/query')
        return response.data
    }

    const {data, isLoading, isPending, error, isFetching} = useQuery({
        queryKey: ['repoData'],
        queryFn: getData
    })

    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    console.log(data,'data')

    // const mutation = useMutation<Todo, Error, Todo>({
    //     mutationFn: (newTodo) => {
    //         return axios.post('/todos', newTodo)
    //     },
    // })
    //
    // if (!mutation) {
    //     return <div>Loading...</div>;
    // }

    return(
        <>
            <div>
                <div>
                    <h3>{data.full_name}</h3>
                    <p>{data.description}</p>
                    <div>{data.subscribers_count}</div>
                    {' '}
                    <div>{data.stargazers_count}</div>
                    {' '}
                    <div>{data.forks_count}</div>
                    <div>{isFetching ? 'Updating...' : ''}</div>
                </div>
            </div>
            {/*<div>*/}
            {/*    {mutation.isPending ? (*/}
            {/*        'Adding todo...'*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            {mutation.isError ? (*/}
            {/*                <div>An error occurred: {mutation.error.message}</div>*/}
            {/*            ) : null}*/}

            {/*            {mutation.isSuccess ? <div>Todo added!</div> : null}*/}

            {/*            <button*/}
            {/*                onClick={() => {*/}
            {/*                    mutation.mutate({id: new Date(), title: 'Do Laundry'})*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                Create Todo*/}
            {/*            </button>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    )
}
export default QuickStartPage;
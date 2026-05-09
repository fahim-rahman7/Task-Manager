import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const apiService = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        credentials: "include",
    }),
    endpoints: (build) => ({
        registration: build.mutation({
            query: (registerData) => ({
                url: "/auth/registration",
                method: "POST",
                body: registerData
            }),
        }),
        
        login: build.mutation({
            query: (loginData) => ({
                url: "/auth/login",
                method: "POST",
                body: loginData
            }),
        }),

        getProfile: build.query({
            query: () => "/auth/profile",
        }),

        getProjectList: build.query({
            query: () => "/project/list",
        }),
        getProjectDetails: build.query({
            query: (slug) => `/project/details/${slug}`,
        }),

        createProject: build.mutation({
            query: (projectData) => ({
                url: "/project/create",
                method: "POST",
                body: projectData,
            }),
        }),
        addNewTaskToProject: build.mutation({
            query: (taskData) => ({
                url: "/project/addtask",
                method: "POST",
                body: taskData,
            }),
        }),
        updateTaskStatus: build.mutation({
            query: (data) => ({
                url: "/project/taskStatus",
                method: "PATCH",
                body: data
            }),
        }),
    }),
})

export const {
    useRegistrationMutation,
    useLoginMutation,
    useGetProfileQuery,
    useGetProjectListQuery,
    useGetProjectDetailsQuery,
    useCreateProjectMutation,
    useAddNewTaskToProjectMutation,
    useUpdateTaskStatusMutation,
} = apiService
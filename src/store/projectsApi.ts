import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project } from '@/app/(user)/projects/page';

export const projectsApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({baseUrl: "/api/"}),
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects"
    })
  })
})

export const {useGetProjectsQuery} = projectsApi
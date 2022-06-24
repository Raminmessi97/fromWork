import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const servicesApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        addService: builder.mutation({
            query(body) {
              return {
                url: `/services`,
                method: 'POST',
                body
              }
            },
            // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
            // that newly created post could show up in any lists.
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
          }),
    }),
  })
  
  export const {
    useAddServiceMutation
  } = servicesApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const stayeasyApi = createApi({
  reducerPath: 'stayeasyApi',
  baseQuery,
  tagTypes: ['Room', 'User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    getRooms: builder.query<any, { page: number; size: number }>({
        query: ({ page = 0, size = 10 }) => `/rooms?page=${page}&size=${size}`,
        providesTags: (result) =>
          result
            ? [
                ...result.content.map(({ id } : {id: string}) => ({ type: 'Room' as const, id })),
                { type: 'Room', id: 'LIST' },
              ]
            : [{ type: 'Room', id: 'LIST' }],
      }),
    searchRooms: builder.query<any, void>({
        query: () => '/rooms/search',
        providesTags: (result) =>
            result
            ? [
                ...result.map(({ id } : {id: string}) => ({ type: 'Room' as const, id })),
                { type: 'Room', id: 'LIST' },
                ]
            : [{ type: 'Room', id: 'LIST' }],
    }),
    getRoomById: builder.query({
      query: (id) => `/rooms/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Room', id }],
    }),
    createRoom: builder.mutation({
      query: (newRoom) => ({
        url: '/rooms',
        method: 'POST',
        body: newRoom,
      }),
      invalidatesTags: [{ type: 'Room', id: 'LIST' }],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Room', id }, { type: 'Room', id: 'LIST' }],
    }),
    bookRoom: builder.mutation({
      query: (booking) => ({
        url: '/booking/book',
        method: 'PUT',
        body: booking,
      }),
      invalidatesTags: (_result, _error, { roomId }) => [{ type: 'Room', id: roomId }],
    }),
    cancelBooking: builder.mutation({
        query: (booking) => ({
            url: '/booking/cancel',
            method: 'PUT',
            body: booking
        }),
        invalidatesTags: (_result, _error, { roomId }) => [{ type: 'Room', id: roomId }],
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useBookRoomMutation,
  useSearchRoomsQuery,
  useCancelBookingMutation,
} = stayeasyApi;

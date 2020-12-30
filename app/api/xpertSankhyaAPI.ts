/* eslint-disable max-classes-per-file */
import { QueryBuilder } from 'odata-query-builder'
import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://34.67.100.80'

export interface UserType {
    _id: string
    uid: string
    name: string
    lastname: string
    username: string
    email: string
    birthDate: Date
    profilePic?: {
        path?: string
        url?: string
    }
    originalProfilePicPath?: string
    description: string
    comments: string[]
    joinDate: Date
}

export interface PostType {
    _id: string
    likes: { creatorID: string }[]
    creatorUid: string
    content: { type: 'video' | 'image'; payload: string }
    createdAt: Date
}

export interface CommentType {
    _id: string
    creatorUid: string
    content: { type: string; payload: string }
    createdAt: Date
}

export type PaginationResult<T> = {
    docs: T[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    paginingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
}

export interface basicAPI<T> {
    getOne(id: string): Promise<AxiosResponse<T>>
    getPage(
        query?: QueryBuilder,
        options?: { page?: number; limit?: number }
    ): Promise<AxiosResponse<PaginationResult<T>>>
    deleteOne(id: string): Promise<AxiosResponse<T>>
    updateOne(
        id: string,
        updateData: Partial<Omit<T, '_id'>>
    ): Promise<AxiosResponse<T>>
    createOne(
        data: Omit<T, '_id'>,
        onUploadProgress?: (progressEvent: ProgressEvent<EventTarget>) => void
    ): Promise<AxiosResponse<T>>
}

export const setAuthToken = (authToken: string) => {
    console.log(authToken)
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`
}

export const UserAPI: basicAPI<UserType> = class UserAPI {
    static async getOne(userID: string) {
        return await axios.get<UserType>(`/users/${userID}`)
    }

    static async getPage(
        query?: QueryBuilder,
        options: { page?: number; limit?: number } = { page: 1, limit: 10 }
    ) {
        let queryString: string
        if (query?.filter) {
            queryString = `${query?.toQuery().substring(1)}&`
        }

        return axios.get<PaginationResult<UserType>>(
            `/users?${queryString}page=${options.page}&limit=${options.limit}`
        )
    }

    static async createOne(
        userData: UserType,
        onUploadProgress?: (progressEvent: ProgressEvent<EventTarget>) => void
    ) {
        return axios.post<UserType>(`/users`, userData, {
            withCredentials: true,
            onUploadProgress,
        })
    }

    static async updateOne(userID: string, updateData: UserType) {
        return axios.put<UserType>(`/users/${userID}`, updateData, {
            withCredentials: true,
        })
    }

    static async deleteOne(userID: string) {
        return axios.delete<UserType>(`/users/${userID}`, {
            withCredentials: true,
        })
    }
}

export const PostAPI: basicAPI<PostType> = class PostAPI {
    static async getOne(postID: string) {
        return await axios.get<PostType>(`/posts/${postID}`)
    }

    static async getPage(
        query?: QueryBuilder,
        options: { page?: number; limit?: number } = { page: 1, limit: 10 }
    ) {
        let queryString: string
        if (query?.filter) {
            queryString = `${query?.toQuery().substring(1)}&`
        }

        return axios.get<PaginationResult<PostType>>(
            `/posts?${queryString}page=${options.page}&limit=${options.limit}`
        )
    }

    static async createOne(
        postData: PostType,
        onUploadProgress?: (progressEvent: ProgressEvent<EventTarget>) => void
    ) {
        return axios.post<PostType>(`/posts`, postData, {
            withCredentials: true,
            onUploadProgress,
        })
    }

    static async updateOne(postID: string, updateData: PostType) {
        return axios.put<PostType>(`/posts/${postID}`, updateData, {
            withCredentials: true,
        })
    }

    static async deleteOne(postID: string) {
        return axios.delete<PostType>(`/posts/${postID}`, {
            withCredentials: true,
        })
    }
}

export const CommentAPI: basicAPI<CommentType> = class CommentAPI {
    static async getOne(commentID: string) {
        return await axios.get<CommentType>(`/comments/${commentID}`)
    }

    static async getPage(
        query?: QueryBuilder,
        options: { page?: number; limit?: number } = { page: 1, limit: 10 }
    ) {
        let queryString: string
        if (query?.filter) {
            queryString = `${query?.toQuery().substring(1)}&`
        }

        return axios.get<PaginationResult<CommentType>>(
            `/comments?${queryString}page=${options.page}&limit=${options.limit}`
        )
    }

    static async createOne(
        commentData: CommentType,
        onUploadProgress?: (progressEvent: ProgressEvent<EventTarget>) => void
    ) {
        return axios.post<CommentType>(`/comments`, commentData, {
            withCredentials: true,
            onUploadProgress,
        })
    }

    static async updateOne(commentID: string, updateData: CommentType) {
        return axios.put<CommentType>(`/comments/${commentID}`, updateData, {
            withCredentials: true,
        })
    }

    static async deleteOne(commentID: string) {
        return axios.delete<CommentType>(`/comments/${commentID}`, {
            withCredentials: true,
        })
    }
}

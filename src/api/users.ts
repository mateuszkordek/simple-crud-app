import axiosApi from '@lib/axiosApi'
import { User, ApiUser } from '@types-interfaces/user.ts'
import { FormUser } from '@types-interfaces/userForm.ts'

type RequiredApiUserFields = Pick<
    ApiUser,
    'first_name' | 'last_name' | 'avatar'
>

const _mapApiUserToUser = (apiUser: ApiUser): User => ({
    id: typeof apiUser.id === 'string' ? parseInt(apiUser.id) : apiUser.id,
    firstName: apiUser.first_name || '',
    lastName: apiUser.last_name || '',
    email: apiUser.email || '',
    avatar: apiUser.avatar || '',
})
const _mapFormUserToPartialApiUser = (
    formUser: FormUser
): RequiredApiUserFields => ({
    first_name: formUser.firstName,
    last_name: formUser.lastName,
    avatar: formUser.avatar,
})

const _mapPartialApiUserToPartialUser = (
    apiUser: Partial<ApiUser>
): Partial<User> => ({
    ...('id' in apiUser
        ? {
              id:
                  typeof apiUser.id === 'string'
                      ? parseInt(apiUser.id)
                      : apiUser.id,
          }
        : {}),
    ...('first_name' in apiUser ? { firstName: apiUser.first_name } : {}),
    ...('last_name' in apiUser ? { lastName: apiUser.last_name } : {}),
    ...('email' in apiUser ? { email: apiUser.email } : {}),
    ...('avatar' in apiUser ? { avatar: apiUser.avatar } : {}),
})

export const fetchAllUsers = async (): Promise<User[]> => {
    const users: ApiUser[] = []

    const {
        data: { data: firstPageUsers, total_pages: totalPages },
    } = await axiosApi.get('/users')

    users.push(...firstPageUsers)

    for (let page = 2; page <= totalPages; page++) {
        const {
            data: { data: fetchedUsers },
        } = await axiosApi.get(`/users?page=${page}`)
        users.push(...fetchedUsers)
    }

    return users.map(_mapApiUserToUser)
}

export const postUser = async (user: FormUser): Promise<User> => {
    const { data } = await axiosApi.post(
        '/users',
        _mapFormUserToPartialApiUser(user)
    )

    return _mapApiUserToUser(data)
}

export const deleteUser = async (userId: number): Promise<void> => {
    await axiosApi.delete(`/users/${userId}`)
}

export const updateUser = async (
    userId: number,
    user: FormUser
): Promise<Partial<User>> => {
    const { data } = await axiosApi.patch(
        `/users/${userId}`,
        _mapFormUserToPartialApiUser(user)
    )

    return _mapPartialApiUserToPartialUser(data)
}

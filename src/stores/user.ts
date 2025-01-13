import { defineStore } from 'pinia'
import { User } from '@types-interfaces/user'
import { deleteUser, fetchAllUsers, postUser, updateUser } from '@api/users'
import { FormUser } from '@types-interfaces/userForm.ts'
import { useToast } from 'primevue/usetoast'
import {
    ADDING_USER_ERROR_TOAST,
    DELETING_USER_ERROR_TOAST,
    FETCHING_USERS_ERROR_TOAST,
    UPDATING_USER_ERROR_TOAST,
} from '@types-interfaces/toasts.ts'

export const useUserStore = defineStore('user', () => {
    const toast = useToast()

    const isLoading = ref(false)

    const isInitialized = ref(false)

    const users = ref<User[]>([])

    const setUsers = (newUsers: User[]) => {
        users.value = newUsers
    }

    const fetchUsers = async () => {
        isLoading.value = true

        try {
            const users = await fetchAllUsers()
            setUsers(users)

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            toast.add(FETCHING_USERS_ERROR_TOAST)
        }

        isInitialized.value = true
        isLoading.value = false
    }

    const addNewUser = async (user: FormUser) => {
        isLoading.value = true

        try {
            const addedUser = await postUser(user)
            setUsers([addedUser, ...users.value])

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            toast.add(ADDING_USER_ERROR_TOAST)
        }

        isLoading.value = false
    }

    const deleteUserById = async (userId: number) => {
        isLoading.value = true

        try {
            await deleteUser(userId)
            users.value = users.value.filter(({ id }) => id !== userId)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            toast.add(DELETING_USER_ERROR_TOAST)
        }

        isLoading.value = false
    }

    const updateUserById = async (userId: number, user: FormUser) => {
        isLoading.value = true

        try {
            const updatedFields = await updateUser(userId, user)
            users.value = users.value.map((currentUser) =>
                currentUser.id === userId
                    ? { ...currentUser, ...updatedFields }
                    : currentUser
            )
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            toast.add(UPDATING_USER_ERROR_TOAST)
        }

        isLoading.value = false
    }

    const getUserById = (userId: number) =>
        users.value.find(({ id }) => id === userId)

    return {
        isLoading,
        isInitialized,
        users,
        fetchUsers,
        addNewUser,
        deleteUserById,
        updateUserById,
        getUserById,
    }
})

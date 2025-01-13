import { ToastMessageOptions } from 'primevue'

export const USER_ADDED_TOAST: ToastMessageOptions = {
    severity: 'success',
    summary: 'User successfully added',
    detail: 'The new user has been successfully added to the system.',
    life: 3000,
}
export const USER_UPDATED_TOAST: ToastMessageOptions = {
    severity: 'success',
    summary: 'User successfully updated',
    detail: 'The user data has been successfully updated.',
    life: 3000,
}
export const USER_DELETED_TOAST: ToastMessageOptions = {
    severity: 'success',
    summary: 'User successfully deleted',
    detail: 'The selected user has been successfully removed from the system. If this was done in error, please contact the administrator to restore the data.',
    life: 5000,
}

export const FETCHING_USERS_ERROR_TOAST: ToastMessageOptions = {
    severity: 'error',
    summary: 'Error',
    detail: 'An error occurred while fetching users.',
    life: 5000,
}
export const ADDING_USER_ERROR_TOAST: ToastMessageOptions = {
    severity: 'error',
    summary: 'Error',
    detail: 'An error occurred while adding a new user.',
    life: 5000,
}

export const DELETING_USER_ERROR_TOAST: ToastMessageOptions = {
    severity: 'error',
    summary: 'Error',
    detail: 'An error occurred while deleting the user.',
    life: 5000,
}

export const UPDATING_USER_ERROR_TOAST: ToastMessageOptions = {
    severity: 'error',
    summary: 'Error',
    detail: 'An error occurred while updating the user.',
    life: 5000,
}

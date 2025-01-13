import { User } from '@types-interfaces/user.ts'

export const getFullName = (user: Pick<User, 'firstName' | 'lastName'>) => {
    return `${user.firstName} ${user.lastName}`
}

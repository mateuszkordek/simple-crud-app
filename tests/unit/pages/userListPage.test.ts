import { describe, it, vi } from 'vitest'
import { useUserStore } from '@stores/user'
vi.mock('primevue/usetoast')

describe('UserListPage.vue', () => {
    it('should display users from the store', () => {
        const userStore = useUserStore()
        console.log(userStore.users)
    })
})

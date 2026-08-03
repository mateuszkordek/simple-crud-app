import { describe, it, vi } from 'vitest'
import { useUserStore } from '@stores/user'
import UserTable from '@components/UserTable.vue'
import { mount } from '@vue/test-utils'
vi.mock('primevue/usetoast')

describe('UserTable.vue', () => {
    it('should render list of users', () => {
        const userStore = useUserStore()
        console.log(userStore.users)
        const wrapper = mount(UserTable)
        console.log(wrapper.html())
    })
})

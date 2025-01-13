<script lang="ts" setup>
import UserForm from '@components/UserForm.vue'
import { FormUser } from '@types-interfaces/userForm.ts'
import { useUserStore } from '@stores/user.ts'
import { useRouter } from 'vue-router'
import { PREVIOUS_ACTION } from '@types-interfaces/router.ts'

const router = useRouter()

const { addNewUser } = useUserStore()

const onSubmit = async (user: FormUser) => {
    await addNewUser(user)
    await router.push({
        name: 'user-list',
        query: { prevAction: PREVIOUS_ACTION.USER_ADDED },
    })
}

const navigateToUserListPage = () => {
    router.push({ name: 'user-list' })
}
</script>

<template>
    <div class="w-full">
        <h1>Add user</h1>
        <div>
            <UserForm @formSubmit="onSubmit" />
            <Button
                @click="navigateToUserListPage"
                label="Back to the list"
                text
                icon="pi pi-arrow-left"
                severity="secondary"
                class="mt-3"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import UserForm from '@components/UserForm.vue'
import { FormUser } from '@types-interfaces/userForm.ts'
import { useUserStore } from '@stores/user.ts'
import { useRouter } from 'vue-router'
import UserDeleteModal from '@components/DeleteUserModal.vue'
import { PREVIOUS_ACTION } from '@types-interfaces/router.ts'

const router = useRouter()

const userStore = useUserStore()

const props = defineProps<{
    id: string
}>()

const userIdAsNumber = computed(() => Number(props.id))

const onSubmit = async (user: FormUser) => {
    await userStore.updateUserById(userIdAsNumber.value, user)
    await router.push({
        name: 'user-list',
        query: { prevAction: PREVIOUS_ACTION.USER_UPDATED },
    })
}

const currentUser = computed<FormUser | null>(() => {
    const user = userStore.getUserById(userIdAsNumber.value)

    if (!user) {
        return null
    }

    return {
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
    }
})

const deleteDialog = ref(false)

const onUserDelete = () => {
    deleteDialog.value = true
}

const onCloseDeleteUserModal = () => {
    deleteDialog.value = false
}

const onDeleteUser = async () => {
    await userStore.deleteUserById(userIdAsNumber.value)
    deleteDialog.value = false
    await router.push({
        name: 'user-list',
        query: { prevAction: PREVIOUS_ACTION.USER_DELETED },
    })
}

const navigateToUserListPage = () => {
    router.push({ name: 'user-list' })
}
</script>

<template>
    <div class="w-full">
        <UserDeleteModal
            v-if="currentUser"
            v-model="deleteDialog"
            :user-to-delete="currentUser"
            @close="onCloseDeleteUserModal"
            @delete="onDeleteUser"
        />
        <h1>Edit user</h1>
        <div v-if="!userStore.isLoading">
            <UserForm
                v-if="currentUser"
                @formSubmit="onSubmit"
                @userDelete="onUserDelete"
                :user="currentUser"
            />
            <Panel v-else>
                <div
                    class="h-[400px] flex flex-col justify-center items-center p-4"
                >
                    <img
                        src="@/assets/404.jpg"
                        class="rounded-full w-[70%] max-w-[300px] object-cover object-center"
                        alt="404"
                    />
                    <h3>This user could not be found.</h3>
                </div>
            </Panel>
        </div>
        <Button
            @click="navigateToUserListPage"
            label="Back to the list"
            text
            icon="pi pi-arrow-left"
            severity="secondary"
            class="mt-3"
        />
    </div>
</template>

<script lang="ts" setup>
import { User } from '@types-interfaces/user.ts'
import { useRouter } from 'vue-router'
import { FilterMatchMode } from '@primevue/core/api'
import { getAvatarPlaceholderPath } from '@utils/avatar'
import { useMediaQuery } from '@composables/useMediaQuery.ts'
import UserDeleteModal from '@components/DeleteUserModal.vue'
import { getFullName } from '@utils/formatting.ts'
import { useUserStore } from '@stores/user.ts'

const ROWS = 5

const emit = defineEmits<{
    (event: 'userDeleted'): void
}>()

defineProps<{
    users: User[]
}>()

const router = useRouter()

const userStore = useUserStore()

const navigateToEditUserPage = (userId: User['id']) => {
    router.push({ name: 'edit-user', params: { id: userId } })
}

const navigateToAddUserPage = () => {
    router.push({ name: 'add-user' })
}

const deleteDialog = ref(false)
const userToDelete = ref<User | null>(null)

const onRowDeleteButtonClick = (user: User) => {
    deleteDialog.value = true
    userToDelete.value = user
}

const onCloseDeleteUserModal = () => {
    deleteDialog.value = false
    userToDelete.value = null
}

const onDeleteUser = async () => {
    if (userToDelete.value)
        await userStore.deleteUserById(userToDelete.value.id)
    onCloseDeleteUserModal()
    emit('userDeleted')
}

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const isSmallScreen = useMediaQuery('(max-width: 639px)')
</script>

<template>
    <UserDeleteModal
        v-model="deleteDialog"
        :user-to-delete="userToDelete"
        @close="onCloseDeleteUserModal"
        @delete="onDeleteUser"
    />
    <DataTable
        :value="users"
        selectionMode="single"
        paginator
        :rows="ROWS"
        dataKey="id"
        :globalFilterFields="['firstName', 'lastName']"
        v-model:filters="filters"
        stripedRows
        scrollable
        @row-click="navigateToEditUserPage($event.data.id)"
    >
        <template #header>
            <div class="flex justify-between mb-7">
                <IconField class="w-full sm:max-w-[300px] md:max-w-[400px]">
                    <InputText
                        v-model="filters['global'].value"
                        placeholder="Search for users..."
                        variant="filled"
                        class="w-full"
                    />
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                </IconField>
                <span class="sm:block hidden">
                    <Button
                        rounded
                        @click="navigateToAddUserPage"
                        icon="pi pi-plus"
                        label="Add User"
                        class="w-36"
                    />
                </span>
            </div>
        </template>

        <template #empty>
            <div class="text-center w-full py-4">No users found.</div>
        </template>

        <Column class="sm:w-26">
            <template #body="slotProps">
                <Image
                    :src="slotProps.data.avatar || getAvatarPlaceholderPath()"
                    imageClass="rounded-full w-12 h-12 object-cover object-center"
                />
            </template>
        </Column>
        <Column header="Full Name">
            <template #body="slotProps">
                <span>{{ getFullName(slotProps.data) }}</span>
            </template>
        </Column>
        <Column
            header="Action"
            class="w-22 sm:w-36"
            :frozen="isSmallScreen"
            align-frozen="right"
        >
            <template #body="slotProps">
                <div class="-ml-2 flex flex-col items-center sm:flex-row">
                    <Button
                        @click="navigateToEditUserPage(slotProps.data.id)"
                        icon="pi pi-pen-to-square"
                        variant="text"
                        severity="secondary"
                        :size="isSmallScreen ? 'large' : 'small'"
                    />
                    <Button
                        @click="onRowDeleteButtonClick(slotProps.data)"
                        icon="pi pi-trash"
                        variant="text"
                        severity="secondary"
                        :size="isSmallScreen ? 'large' : 'small'"
                    />
                </div>
            </template>
        </Column>
    </DataTable>
    <Button
        v-if="isSmallScreen"
        @click="navigateToAddUserPage"
        icon="pi pi-plus"
        class="floating-add-button"
        rounded
        raised
    />
</template>

<style>
.floating-add-button {
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    width: 56px !important;
    height: 56px !important;
}
</style>

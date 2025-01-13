<script lang="ts" setup>
import { User } from '@types-interfaces/user.ts'
import { getAvatarPlaceholderPath } from '@utils/avatar.ts'
import { getFullName } from '@utils/formatting.ts'

defineProps<{
    userToDelete: Pick<User, 'firstName' | 'lastName' | 'avatar'> | null
}>()

const model = defineModel<boolean>()

const emit = defineEmits<{
    (event: 'close'): void
    (event: 'delete'): void
}>()

const onCancelButtonClick = () => {
    emit('close')
}
const onClose = () => {
    emit('close')
}
const onDeleteButtonClick = () => {
    emit('delete')
}
</script>

<template>
    <Dialog
        v-model:visible="model"
        modal
        header="Delete user"
        class="w-[500px]"
        :breakpoints="{ '768px': '75vw', '575px': '90vw' }"
        @close="onClose"
    >
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <Image
                    :src="userToDelete?.avatar || getAvatarPlaceholderPath()"
                    imageClass="rounded-full w-8 h-8 object-cover object-center"
                />
                <span class="font-bold whitespace-nowrap mt-1">
                    {{ userToDelete ? getFullName(userToDelete) : '' }}
                </span>
            </div>
        </template>
        <div class="mb-3">Are you sure you want to delete this user?</div>
        <div>
            This action cannot be undone, and all data associated with the user
            will be permanently removed.
        </div>
        <template #footer>
            <Button
                @click="onCancelButtonClick"
                severity="secondary"
                label="Cancel"
            />

            <Button
                @click="onDeleteButtonClick"
                severity="danger"
                label="Delete"
            />
        </template>
    </Dialog>
</template>

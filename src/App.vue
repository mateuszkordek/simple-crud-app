<script setup lang="ts">
import { useUserStore } from '@stores/user'

const userStore = useUserStore()

onMounted(async () => {
    if (!userStore.isInitialized) await userStore.fetchUsers()
})
</script>

<template>
    <div
        class="min-h-[100vh] max-w-full px-2 sm:px-4 py-8 sm:max-w-[640px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1280px] mx-auto"
    >
        <Dialog v-model:visible="userStore.isLoading" modal :closable="false">
            <template #header>
                <i
                    class="pi pi-spin pi-spinner mx-auto"
                    style="font-size: 1.5rem"
                />
            </template>
            <div>Please wait...</div>
        </Dialog>
        <RouterView />
    </div>
</template>

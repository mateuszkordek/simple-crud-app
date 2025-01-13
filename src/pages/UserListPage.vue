<script setup lang="ts">
import UserTable from '@components/UserTable.vue'

import { useUserStore } from '@stores/user'
import { useToast } from 'primevue/usetoast'
import { useRoute, useRouter } from 'vue-router'
import {
    USER_ADDED_TOAST,
    USER_DELETED_TOAST,
    USER_UPDATED_TOAST,
} from '@types-interfaces/toasts.ts'
import { PREVIOUS_ACTION } from '@types-interfaces/router.ts'

const userStore = useUserStore()

const toast = useToast()

const route = useRoute()
const router = useRouter()

const resetRouteQuery = () => {
    router.push({
        query: {},
    })
}

onMounted(() => {
    const { prevAction } = route.query

    if (prevAction === PREVIOUS_ACTION.USER_ADDED) {
        toast.add(USER_ADDED_TOAST)
    } else if (prevAction === PREVIOUS_ACTION.USER_UPDATED) {
        toast.add(USER_UPDATED_TOAST)
    } else if (prevAction === PREVIOUS_ACTION.USER_DELETED) {
        toast.add(USER_DELETED_TOAST)
    }

    resetRouteQuery()
})

const onUserDeleted = () => {
    toast.add(USER_DELETED_TOAST)
}
</script>
<template>
    <div class="w-full">
        <Toast />
        <h1>User list</h1>
        <Panel>
            <UserTable :users="userStore.users" @userDeleted="onUserDeleted" />
        </Panel>
    </div>
</template>

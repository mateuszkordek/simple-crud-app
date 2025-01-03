<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
    <div>
        <Button @click="router.push('/emergency')">Rozpocznij pomoc</Button>
    </div>
</template>

<script setup lang="ts">
const THEME_MODE_LOCAL_STORAGE_KEY = 'themeMode'

const initThemeMode = () => {
    const prevThemeMode =
        localStorage.getItem(THEME_MODE_LOCAL_STORAGE_KEY) || 'dark'
    if (prevThemeMode === 'dark') {
        document.documentElement.classList.add('app--dark')
    }
}

initThemeMode()

const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('app--dark')) {
        document.documentElement.classList.remove('app--dark')
        localStorage.setItem(THEME_MODE_LOCAL_STORAGE_KEY, 'light')
    } else {
        document.documentElement.classList.add('app--dark')
        localStorage.setItem(THEME_MODE_LOCAL_STORAGE_KEY, 'dark')
    }
}
</script>

<!--todo i18n-->
<template>
    <div>
        <Button label="Toggle Dark Mode" @click="toggleDarkMode" />
    </div>
    <RouterView></RouterView>
</template>

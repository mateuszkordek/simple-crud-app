export const useMediaQuery = (query: string) => {
    const matches = ref(false)

    const updateMatches = () => {
        matches.value = window.matchMedia(query).matches
    }

    onMounted(() => {
        const mediaQueryList = window.matchMedia(query)
        updateMatches()
        mediaQueryList.addEventListener('change', updateMatches)
    })

    onUnmounted(() => {
        const mediaQueryList = window.matchMedia(query)
        mediaQueryList.removeEventListener('change', updateMatches)
    })

    return matches
}

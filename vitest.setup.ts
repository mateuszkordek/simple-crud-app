import { vi, beforeAll, beforeEach } from 'vitest'
import {
    VueRouterMock,
    createRouterMock,
    injectRouterMock,
} from 'vue-router-mock'
import { config } from '@vue/test-utils'
import PrimeVue from 'primevue/config'

import { createTestingPinia } from '@pinia/testing'

const router = createRouterMock()
beforeEach(() => {
    router.reset()
    injectRouterMock(router)
})

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    })
})

beforeEach(() => {
    config.global.plugins = [
        PrimeVue,
        createTestingPinia({
            initialState: {
                user: {
                    users: [
                        {
                            firstName: 'Jane',
                            lastName: 'Smith',
                            id: 2,
                            avatar: '',
                        },
                        {
                            firstName: 'John',
                            lastName: 'Doe',
                            id: 3,
                            avatar: '',
                        },
                        {
                            firstName: 'Alice',
                            lastName: 'Johnson',
                            id: 4,
                            avatar: '',
                        },
                        {
                            firstName: 'Bob',
                            lastName: 'Brown',
                            id: 5,
                            avatar: '',
                        },
                    ],
                },
            },
        }),
    ]
})

config.plugins.VueWrapper.install(VueRouterMock)

import { describe, it, expect } from 'vitest'
import axiosApi from '@lib/axiosApi'

describe('axiosApi', () => {
    it('attaches the reqres x-api-key header to every request', async () => {
        const { config } = await axiosApi.get('/users', {
            adapter: async (requestConfig) => ({
                data: {},
                status: 200,
                statusText: 'OK',
                headers: {},
                config: requestConfig,
            }),
        })

        expect(config.headers['x-api-key']).toBeTruthy()
    })
})

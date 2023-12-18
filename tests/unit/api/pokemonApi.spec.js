import pokemonApi from '@/api/pokemonApi'
import { describe, test, expect } from 'vitest'

describe('pokemonApi', () => {
    test('axios debe estar configurado con la url correcta', () => {
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')
    })
}) 
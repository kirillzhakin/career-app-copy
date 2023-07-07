import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useDegreesStore } from '@/stores/degrees'
import type { Mock } from 'vitest'
import { createDegree } from '../../utils/createDegree'
vi.mock('axios')
const axiosGetMock = axios.get as Mock
describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('хранит массив степеней', () => {
    const store = useDegreesStore()
    expect(store.degrees).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('FETCH_DEGREES', () => {
    it('делаем запрос на сервер и записываем данные в store', async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            degree: "Bachelor's"
          }
        ]
      })

      const store = useDegreesStore()
      await store.FETCH_DEGREES()

      expect(store.degrees).toEqual([
        {
          id: 1,
          degree: "Bachelor's"
        }
      ])
    })
  })
})

describe('getters', () => {
  it('находит уникальные степени в списке degrees', () => {
    const store = useDegreesStore()
    store.degrees = [createDegree({ degree: "Master's" }), createDegree({ degree: "Bachelor's" })]
    const result = store.UNIQUE_DEGREES
    expect(result).toEqual(["Master's", "Bachelor's"])
  })
})

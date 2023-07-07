import axios from 'axios'
import type { Mock } from 'vitest'

import getDegrees from '@/api/getDegrees'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('getDegrees', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Associate'
        }
      ]
    })
  })
  it('запрос на сервер', async () => {
    await getDegrees()

    expect(axios.get).toHaveBeenCalledWith('http://lexicon-career.ru/degrees')
  })
  it('получаем ответ от сервера', async () => {
    const degree = await getDegrees()
    expect(degree).toEqual([{ id: 1, title: 'Associate' }])
  })
})

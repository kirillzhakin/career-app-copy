import axios from 'axios'
import type { Mock } from 'vitest'

import getJobs from '@/api/getJobs'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('getJobs', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Java Script'
        }
      ]
    })
  })
  it('запрос на сервер', async () => {
    await getJobs()
    expect(axios.get).toHaveBeenCalledWith('http://lexicon-career.ru/jobs')
  })
  it('получаем ответ от сервера', async () => {
    const jobs = await getJobs()
    expect(jobs).toEqual([{ id: 1, title: 'Java Script' }])
  })
})

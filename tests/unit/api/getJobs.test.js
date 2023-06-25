import axios from 'axios'

import getJobs from '@/api/getJobs.js'

vi.mock('axios')

describe('getJobs', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
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

import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { useJobsStore } from '@/stores/jobs.js'
vi.mock('axios')

describe('store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('хранит массив вакансий', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })

  it('делаем запрос на сервер и записываем данные в store', async () => {
    axios.get.mockResolvedValue({ data: ['job 1', 'job 2'] })
    const store = useJobsStore()
    await store.FETCH_JOBS()
    expect(store.jobs).toEqual(['job 1', 'job 2'])
  })
})

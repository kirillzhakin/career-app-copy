import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { useJobsStore } from '@/stores/jobs.js'
import { useUserStore } from '@/stores/user.js'

vi.mock('axios')

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('хранит массив вакансий', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  describe('FETCH_JOBS', () => {
    it('делаем запрос на сервер и записываем данные в store', async () => {
      axios.get.mockResolvedValue({ data: ['job 1', 'job 2'] })
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['job 1', 'job 2'])
    })
  })
})
describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('находит уникальлное название организации в списке вакансий', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [
        { organization: 'Ozon' },
        { organization: 'Yandex' },
        { organization: 'Ozon' }
      ]
      const result = jobStore.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(['Ozon', 'Yandex']))
    })
  })

  describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
    it('фильтрует вакансии по выбору', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [
        { organization: 'Ozon' },
        { organization: 'Yandex' },
        { organization: 'Mail' }
      ]

      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Ozon', 'Mail']
      const result = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS
      expect(result).toEqual([{ organization: 'Ozon' }, { organization: 'Mail' }])
    })

    describe('когда пользователь не выбрал организации', () => {
      it('вернуть все вакансии', () => {
        const jobStore = useJobsStore()
        jobStore.jobs = [
          { organization: 'Ozon' },
          { organization: 'Yandex' },
          { organization: 'Mail' }
        ]

        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const result = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS
        expect(result).toEqual([
          { organization: 'Ozon' },
          { organization: 'Yandex' },
          { organization: 'Mail' }
        ])
      })
    })
  })
})

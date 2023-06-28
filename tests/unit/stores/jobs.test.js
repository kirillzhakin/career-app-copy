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

  describe('UNIQUE_JOB_TYPES', () => {
    it('находит уникальные значения формата работы в списке вакансий', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [{ jobType: 'Full-time' }, { jobType: 'Temporary' }, { jobType: 'Full-time' }]
      const result = jobStore.UNIQUE_JOB_TYPES
      expect(result).toEqual(new Set(['Full-time', 'Temporary']))
    })
  })

  describe('INCLUDE_JOB_BY_ORGANIZTION', () => {
    describe('пользователь не выбрал организацию', () => {
      it('сравнивает вакансии', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const jobStore = useJobsStore()
        const job = { organization: 'Yandex' }

        const result = jobStore.INCLUDE_JOB_BY_ORGANIZTION(job)
        expect(result).toBe(true)
      })
    })
    it('фильтрует вакансии в соответствии с выбором пользователя', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Ozon', 'Yandex']
      const jobStore = useJobsStore()
      const job = { organization: 'Yandex' }

      const result = jobStore.INCLUDE_JOB_BY_ORGANIZTION(job)
      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('пользователь не выбрал формат работы', () => {
      it('сравнивает вакансии', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []
        const jobStore = useJobsStore()
        const job = { jobType: 'Full-time' }

        const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job)
        expect(result).toBe(true)
      })
    })
    it('фильтрует вакансии в соответствии с выбором пользователя', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-time', 'Path-time']
      const jobStore = useJobsStore()
      const job = { jobType: 'Path-time' }

      const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job)
      expect(result).toBe(true)
    })
  })
})

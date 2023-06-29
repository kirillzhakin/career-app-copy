import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import type { Mock } from 'vitest'
import type { Job } from '@/api/types'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

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
      axiosGetMock.mockResolvedValue({ data: ['job 1', 'job 2'] })
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['job 1', 'job 2'])
    })
  })
})
describe('getters', () => {
  const createJob = (job: Partial<Job> = {}): Job => ({
    id: 1,
    title: 'Angular Developer',
    organization: 'Vue and Me',
    degree: "Master's",
    jobType: 'Intern',
    locations: ['Lisbon'],
    minimumQualifications: ['Mesh granular deliverables'],
    preferredQualifications: ['Mesh wireless metrics'],
    description: ['Away someone forget effect wait land.'],
    dateAdded: '2021-07-04',
    ...job
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('находит уникальлное название организации в списке вакансий', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [
        createJob({ organization: 'Ozon' }),
        createJob({ organization: 'Yandex' }),
        createJob({ organization: 'Ozon' })
      ]
      const result = jobStore.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(['Ozon', 'Yandex']))
    })
  })

  describe('UNIQUE_JOB_TYPES', () => {
    it('находит уникальные значения формата работы в списке вакансий', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Temporary' }),
        createJob({ jobType: 'Full-time' })
      ]
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
        const job = createJob({ organization: 'Yandex' })

        const result = jobStore.INCLUDE_JOB_BY_ORGANIZTION(job)
        expect(result).toBe(true)
      })
    })
    it('фильтрует вакансии в соответствии с выбором пользователя', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Ozon', 'Yandex']
      const jobStore = useJobsStore()
      const job = createJob({ organization: 'Yandex' })

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
        const job = createJob({ jobType: 'Full-time' })

        const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job)
        expect(result).toBe(true)
      })
    })
    it('фильтрует вакансии в соответствии с выбором пользователя', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-time', 'Path-time']
      const jobStore = useJobsStore()
      const job = createJob({ jobType: 'Path-time' })

      const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job)
      expect(result).toBe(true)
    })
  })
})

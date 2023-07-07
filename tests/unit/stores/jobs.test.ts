import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import type { Mock } from 'vitest'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { createJob } from 'tests/utils/createJob'

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
    it('фильтрует вакансии в соответствии с выбором пользователя формата работы', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-time', 'Path-time']
      const jobStore = useJobsStore()
      const job = createJob({ jobType: 'Path-time' })

      const result = jobStore.INCLUDE_JOB_BY_JOB_TYPE(job)
      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_Degree', () => {
    describe('пользователь не выбрал степень', () => {
      it('сравнивает вакансии', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = []
        const jobStore = useJobsStore()
        const job = createJob()

        const result = jobStore.INCLUDE_JOB_BY_DEGREE(job)
        expect(result).toBe(true)
      })
    })
    it('фильтрует вакансии в соответствии с выбором пользователя степени', () => {
      const userStore = useUserStore()
      userStore.selectedDegrees = ["Master's"]
      const jobStore = useJobsStore()
      const job = createJob({ degree: "Master's" })

      const result = jobStore.INCLUDE_JOB_BY_DEGREE(job)
      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_SKILL', () => {
    it('определяет, соответствует ли работа навыкам пользователя', () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = 'Vue'
      const store = useJobsStore()
      const job = createJob({ title: 'Vue Developer' })

      const result = store.INCLUDE_JOB_BY_SKILL(job)
      expect(result).toBe(true)
    })

    it('обрабатывает несовместимый регистр символов', () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = 'vuE'
      const store = useJobsStore()
      const job = createJob({ title: 'Vue Developer' })

      const result = store.INCLUDE_JOB_BY_SKILL(job)
      expect(result).toBe(true)
    })

    describe('когда пользователь не ввел ни одного навыка', () => {
      it('сравнивает вакансии', () => {
        const userStore = useUserStore()
        userStore.skillsSearchTerm = ''
        const store = useJobsStore()
        const job = createJob({ title: 'Vue Developer' })

        const result = store.INCLUDE_JOB_BY_SKILL(job)
        expect(result).toBe(true)
      })
    })
  })
})

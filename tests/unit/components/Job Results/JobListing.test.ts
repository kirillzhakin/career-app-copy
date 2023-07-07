import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'
import { createJob } from 'tests/utils/createJob'
import type { Job } from '@/api/types'

describe('JobListing', () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          ...job
        }
      }
    })
  }

  it('отобразить название вакансии', () => {
    const jobProps = createJob({ title: 'Vue Programmer' })
    renderJobListing(jobProps)
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument()
  })

  it('отобразить название организации', () => {
    const jobProps = createJob({ organization: 'Yandex' })
    renderJobListing(jobProps)
    expect(screen.getByText('Yandex')).toBeInTheDocument()
  })
  it('отобразить локации вакансии', () => {
    const jobProps = createJob({ locations: ['Kazan', 'Minsk'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Kazan')).toBeInTheDocument()
    expect(screen.getByText('Minsk')).toBeInTheDocument()
  })
  it('отобразить тебуемую квалификацию', () => {
    const jobProps = createJob({ minimumQualifications: ['Code', 'Develop'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('Develop')).toBeInTheDocument()
  })
})

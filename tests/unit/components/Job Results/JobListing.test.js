import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Developer',
    organization: 'Yandex',
    locations: ['Moscow'],
    minimumQualifications: ['Code'],
    ...jobProps
  })

  const renderJobListing = jobProps => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          ...jobProps
        }
      }
    })
  }

  it('отобразить название вакансии', () => {
    const jobProps = createJobProps({ title: 'Vue Programmer' })
    renderJobListing(jobProps)
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument()
  })

  it('отобразить название организации', () => {
    const jobProps = createJobProps({ organization: 'Yandex' })
    renderJobListing(jobProps)
    expect(screen.getByText('Yandex')).toBeInTheDocument()
  })
  it('отобразить локации вакансии', () => {
    const jobProps = createJobProps({ locations: ['Kazan', 'Minsk'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Kazan')).toBeInTheDocument()
    expect(screen.getByText('Minsk')).toBeInTheDocument()
  })
  it('отобразить тебуемую квалификацию', () => {
    const jobProps = createJobProps({ minimumQualifications: ['Code', 'Develop'] })
    renderJobListing(jobProps)
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('Develop')).toBeInTheDocument()
  })
})

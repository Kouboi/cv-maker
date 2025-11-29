export interface PersonalInfo {
  name: string
  email: string
  phone: string
  address: string
}

export interface Education {
  degree: string
  institute: string
  startYear: string
  endYear: string
}

export interface Experience {
  company: string
  position: string
  duration: string
  responsibilities: string
}

export interface CVData {
  personal: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: string[]
  summary: string
}

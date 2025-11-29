"use client"

import { useState } from "react"
import type { CVData } from "@/types/cv"
import PersonalForm from "./form-sections/personal-form"
import EducationForm from "./form-sections/education-form"
import ExperienceForm from "./form-sections/experience-form"
import SkillsForm from "./form-sections/skills-form"
import SummaryForm from "./form-sections/summary-form"

type FormStep = "personal" | "education" | "experience" | "skills" | "summary"

interface CVFormProps {
  cvData: CVData
  setCvData: (data: CVData) => void
}

export default function CVForm({ cvData, setCvData }: CVFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("personal")

  const steps: { id: FormStep; label: string; icon: string }[] = [
    { id: "personal", label: "Personal", icon: "👤" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "skills", label: "Skills", icon: "⭐" },
    { id: "summary", label: "Summary", icon: "📝" },
  ]

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              currentStep === step.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-foreground hover:border-primary"
            }`}
          >
            <span className="text-lg">{step.icon}</span>
            <span className="hidden sm:inline">{step.label}</span>
          </button>
        ))}
      </div>

      {/* Form Section */}
      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
        {currentStep === "personal" && <PersonalForm data={cvData} onChange={setCvData} />}
        {currentStep === "education" && <EducationForm data={cvData} onChange={setCvData} />}
        {currentStep === "experience" && <ExperienceForm data={cvData} onChange={setCvData} />}
        {currentStep === "skills" && <SkillsForm data={cvData} onChange={setCvData} />}
        {currentStep === "summary" && <SummaryForm data={cvData} onChange={setCvData} />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={() => {
            const stepIndex = steps.findIndex((s) => s.id === currentStep)
            if (stepIndex > 0) setCurrentStep(steps[stepIndex - 1].id)
          }}
          disabled={currentStep === "personal"}
          className="px-6 py-2 rounded-lg border border-border text-foreground font-medium hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => {
            const stepIndex = steps.findIndex((s) => s.id === currentStep)
            if (stepIndex < steps.length - 1) setCurrentStep(steps[stepIndex + 1].id)
          }}
          disabled={currentStep === "summary"}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

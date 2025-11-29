"use client"

import type { CVData, Experience } from "@/types/cv"
import { Trash2, Plus } from "lucide-react"

interface ExperienceFormProps {
  data: CVData
  onChange: (data: CVData) => void
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const handleAddExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { company: "", position: "", duration: "", responsibilities: "" }],
    })
  }

  const handleUpdateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...data.experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
    onChange({ ...data, experience: newExperience })
  }

  const handleRemoveExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
        <button
          onClick={handleAddExperience}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {data.experience.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No experience added yet. Click "Add Experience" to get started.
        </p>
      ) : (
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-6 border border-border rounded-lg bg-background/50 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-foreground">Experience #{index + 1}</h3>
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(index, "company", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.position}
                    onChange={(e) => handleUpdateExperience(index, "position", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g., Jan 2020 - Dec 2022"
                    value={exp.duration}
                    onChange={(e) => handleUpdateExperience(index, "duration", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Responsibilities</label>
                  <textarea
                    placeholder="Describe your key responsibilities and achievements"
                    value={exp.responsibilities}
                    onChange={(e) => handleUpdateExperience(index, "responsibilities", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

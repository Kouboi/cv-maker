"use client"

import type { CVData, Education } from "@/types/cv"
import { Trash2, Plus } from "lucide-react"

interface EducationFormProps {
  data: CVData
  onChange: (data: CVData) => void
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const handleAddEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { degree: "", institute: "", startYear: "", endYear: "" }],
    })
  }

  const handleUpdateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...data.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    onChange({ ...data, education: newEducation })
  }

  const handleRemoveEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Education</h2>
        <button
          onClick={handleAddEducation}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {data.education.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No education added yet. Click "Add Education" to get started.
        </p>
      ) : (
        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <div key={index} className="p-6 border border-border rounded-lg bg-background/50 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-foreground">Education #{index + 1}</h3>
                <button
                  onClick={() => handleRemoveEducation(index)}
                  className="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Degree</label>
                  <input
                    type="text"
                    placeholder="Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation(index, "degree", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Institute/University</label>
                  <input
                    type="text"
                    placeholder="University of Example"
                    value={edu.institute}
                    onChange={(e) => handleUpdateEducation(index, "institute", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Start Year</label>
                  <input
                    type="number"
                    placeholder="2018"
                    value={edu.startYear}
                    onChange={(e) => handleUpdateEducation(index, "startYear", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">End Year</label>
                  <input
                    type="number"
                    placeholder="2022"
                    value={edu.endYear}
                    onChange={(e) => handleUpdateEducation(index, "endYear", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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

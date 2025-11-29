"use client"

import type { CVData } from "@/types/cv"
import { Trash2, Plus } from "lucide-react"
import { useState } from "react"

interface SkillsFormProps {
  data: CVData
  onChange: (data: CVData) => void
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onChange({
        ...data,
        skills: [...data.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    onChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Skills</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g., React, Python, Project Management"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleAddSkill()
            }
          }}
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <button
          onClick={handleAddSkill}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {data.skills.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">No skills added yet. Add your first skill above.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary rounded-full"
            >
              <span className="text-foreground font-medium">{skill}</span>
              <button
                onClick={() => handleRemoveSkill(index)}
                className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import type { CVData } from "@/types/cv"

interface SummaryFormProps {
  data: CVData
  onChange: (data: CVData) => void
}

export default function SummaryForm({ data, onChange }: SummaryFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Professional Summary</h2>
        <p className="text-muted-foreground text-sm">Write a brief summary about yourself (2-4 sentences)</p>
      </div>

      <textarea
        placeholder="Write a compelling summary about your professional background, goals, and what makes you a great candidate..."
        value={data.summary}
        onChange={(e) => onChange({ ...data, summary: e.target.value })}
        rows={8}
        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
      />

      <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
        <span className="text-lg">💡</span>
        <div className="text-sm text-foreground">
          <p className="font-medium mb-1">Pro Tip:</p>
          <p className="text-muted-foreground">
            Keep your summary concise and impactful. Highlight your key strengths, years of experience, and career
            objectives.
          </p>
        </div>
      </div>
    </div>
  )
}

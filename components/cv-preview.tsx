"use client"

import type { CVData } from "@/types/cv"
import { Download } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"
import { useState } from "react"

interface CVPreviewProps {
  cvData: CVData
}

export default function CVPreview({ cvData }: CVPreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      await generatePDF(cvData)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate PDF"
      setError(message)
      console.error("[v0] PDF generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        {/* Preview Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
          <h3 className="text-xl font-bold">{cvData.personal.name || "Your Name"}</h3>
          <p className="text-sm opacity-90 mt-1">Professional CV</p>
        </div>

        {/* Preview Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {/* Contact Info */}
          {(cvData.personal.email || cvData.personal.phone || cvData.personal.address) && (
            <div className="pb-4 border-b border-border">
              <p className="text-xs text-muted-foreground space-y-1">
                {cvData.personal.email && <div>{cvData.personal.email}</div>}
                {cvData.personal.phone && <div>{cvData.personal.phone}</div>}
                {cvData.personal.address && <div>{cvData.personal.address}</div>}
              </p>
            </div>
          )}

          {/* Summary */}
          {cvData.summary && (
            <div className="pb-4 border-b border-border">
              <h4 className="text-xs font-bold text-primary uppercase mb-2">Summary</h4>
              <p className="text-xs text-foreground leading-relaxed">{cvData.summary}</p>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div className="pb-4 border-b border-border">
              <h4 className="text-xs font-bold text-primary uppercase mb-2">Education</h4>
              <div className="space-y-2">
                {cvData.education.map((edu, i) => (
                  <div key={i} className="text-xs">
                    {edu.degree && <p className="font-semibold text-foreground">{edu.degree}</p>}
                    {edu.institute && <p className="text-muted-foreground">{edu.institute}</p>}
                    {(edu.startYear || edu.endYear) && (
                      <p className="text-muted-foreground text-xs">
                        {edu.startYear} {edu.endYear && `- ${edu.endYear}`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {cvData.experience.length > 0 && (
            <div className="pb-4 border-b border-border">
              <h4 className="text-xs font-bold text-primary uppercase mb-2">Experience</h4>
              <div className="space-y-2">
                {cvData.experience.map((exp, i) => (
                  <div key={i} className="text-xs">
                    {exp.position && <p className="font-semibold text-foreground">{exp.position}</p>}
                    {exp.company && <p className="text-muted-foreground">{exp.company}</p>}
                    {exp.duration && <p className="text-muted-foreground text-xs">{exp.duration}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-primary uppercase mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {cvData.skills.map((skill, i) => (
                  <span key={i} className="inline-block px-2 py-1 bg-primary/10 text-foreground rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <Download className="w-5 h-5" />
        {isGenerating ? "Generating PDF..." : "Download PDF"}
      </button>

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center p-3 bg-secondary/10 rounded-lg">
        Your CV updates in real-time as you fill the form
      </p>
    </div>
  )
}

"use client"

import { useState } from "react"
import CVForm from "@/components/cv-form"
import CVPreview from "@/components/cv-preview"
import type { CVData } from "@/types/cv"

export default function BuilderPage() {
  const [cvData, setCvData] = useState<CVData>({
    personal: { name: "", email: "", phone: "", address: "" },
    education: [],
    experience: [],
    skills: [],
    summary: "",
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground">Build Your CV</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fill in your details and see the preview update in real-time
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form - Left Side */}
          <div className="lg:col-span-2">
            <CVForm cvData={cvData} setCvData={setCvData} />
          </div>

          {/* Preview - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CVPreview cvData={cvData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

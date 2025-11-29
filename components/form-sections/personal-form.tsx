"use client"

import type { CVData } from "@/types/cv"

interface PersonalFormProps {
  data: CVData
  onChange: (data: CVData) => void
}

export default function PersonalForm({ data, onChange }: PersonalFormProps) {
  const handleChange = (field: keyof typeof data.personal, value: string) => {
    onChange({
      ...data,
      personal: { ...data.personal, [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={data.personal.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={data.personal.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
          <input
            type="tel"
            placeholder="+977 234-5678"
            value={data.personal.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">Address</label>
          <input
            type="text"
            placeholder="City, Country"
            value={data.personal.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, FileText, Zap, Download } from "lucide-react"

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Navigation */}
      <nav className="border-b border-border bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-foreground">CV Maker</span>
          </div>
          <Link
            href="/builder"
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                Create Your CV Instantly
              </h1>
              <p className="text-lg text-muted-foreground">
                Build a professional CV in minutes, not hours. Our intuitive form guides you through every section with
                a live preview that updates as you type.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4">
              {[
                { icon: Zap, text: "Fast & Easy" },
                { icon: Download, text: "Download as PDF" },
                { icon: FileText, text: "Professional Templates" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-accent" />
                  <span className="text-foreground font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/builder"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group mt-8"
            >
              Start Building
              <ArrowRight className={`w-5 h-5 transition-transform ${isHovering ? "translate-x-1" : ""}`} />
            </Link>
          </div>

          {/* Right - Preview Card */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-xl border border-border p-8 space-y-4">
                <div className="space-y-2">
                  <div className="h-3 bg-primary rounded-full w-32" />
                  <div className="h-2 bg-secondary rounded-full w-24" />
                </div>
                <div className="space-y-3 pt-4">
                  <div className="h-2 bg-muted rounded-full w-full" />
                  <div className="h-2 bg-muted rounded-full w-5/6" />
                  <div className="h-2 bg-muted rounded-full w-4/5" />
                </div>
                <div className="space-y-3 pt-4">
                  <div className="h-2 bg-muted rounded-full w-full" />
                  <div className="h-2 bg-muted rounded-full w-5/6" />
                </div>
                <button className="w-full mt-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/10 border-t border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <p className="text-muted-foreground mt-1">CVs Created</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <p className="text-muted-foreground mt-1">Active Users</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <p className="text-muted-foreground mt-1">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 CV Maker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

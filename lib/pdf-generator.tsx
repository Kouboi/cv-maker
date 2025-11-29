import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { CVData } from "@/types/cv"

export async function generatePDF(cvData: CVData) {
  try {
    // Create a temporary container for the CV
    const cvContainer = document.createElement("div")
    cvContainer.style.position = "absolute"
    cvContainer.style.left = "-9999px"
    cvContainer.style.width = "210mm"
    cvContainer.style.height = "297mm"
    cvContainer.style.backgroundColor = "white"
    cvContainer.style.color = "#000"
    cvContainer.style.fontFamily = "Arial, sans-serif"
    cvContainer.style.padding = "20px"
    cvContainer.style.lineHeight = "1.6"

    // Build the CV HTML
    const cvHTML = `
      <div style="max-width: 100%; margin: 0; padding: 0;">
        <!-- Header -->
        <div style="border-bottom: 2px solid #2c5aa0; margin-bottom: 20px; padding-bottom: 15px;">
          <h1 style="margin: 0; font-size: 28px; color: #2c5aa0; font-weight: bold;">
            ${cvData.personal.name || "Your Name"}
          </h1>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
            Professional CV
          </p>
        </div>

        <!-- Contact Information -->
        ${
          cvData.personal.email || cvData.personal.phone || cvData.personal.address
            ? `
          <div style="margin-bottom: 15px; font-size: 11px; color: #333;">
            ${cvData.personal.email ? `<p style="margin: 2px 0;">${cvData.personal.email}</p>` : ""}
            ${cvData.personal.phone ? `<p style="margin: 2px 0;">${cvData.personal.phone}</p>` : ""}
            ${cvData.personal.address ? `<p style="margin: 2px 0;">${cvData.personal.address}</p>` : ""}
          </div>
        `
            : ""
        }

        <!-- Summary -->
        ${
          cvData.summary
            ? `
          <div style="margin-bottom: 15px;">
            <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #2c5aa0; text-transform: uppercase;">Summary</h3>
            <p style="margin: 0; font-size: 11px; color: #333; line-height: 1.5;">
              ${cvData.summary}
            </p>
          </div>
        `
            : ""
        }

        <!-- Education -->
        ${
          cvData.education.length > 0
            ? `
          <div style="margin-bottom: 15px;">
            <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #2c5aa0; text-transform: uppercase;">Education</h3>
            ${cvData.education
              .map(
                (edu) => `
              <div style="margin-bottom: 8px; font-size: 11px;">
                ${edu.degree ? `<p style="margin: 0; font-weight: bold; color: #000;">${edu.degree}</p>` : ""}
                ${edu.institute ? `<p style="margin: 2px 0 0 0; color: #666;">${edu.institute}</p>` : ""}
                ${
                  edu.startYear || edu.endYear
                    ? `<p style="margin: 2px 0 0 0; color: #999; font-size: 10px;">${edu.startYear}${edu.endYear ? ` - ${edu.endYear}` : ""}</p>`
                    : ""
                }
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }

        <!-- Experience -->
        ${
          cvData.experience.length > 0
            ? `
          <div style="margin-bottom: 15px;">
            <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #2c5aa0; text-transform: uppercase;">Experience</h3>
            ${cvData.experience
              .map(
                (exp) => `
              <div style="margin-bottom: 8px; font-size: 11px;">
                ${exp.position ? `<p style="margin: 0; font-weight: bold; color: #000;">${exp.position}</p>` : ""}
                ${exp.company ? `<p style="margin: 2px 0 0 0; color: #666;">${exp.company}</p>` : ""}
                ${exp.duration ? `<p style="margin: 2px 0 0 0; color: #999; font-size: 10px;">${exp.duration}</p>` : ""}
                ${
                  exp.responsibilities
                    ? `<p style="margin: 4px 0 0 0; color: #333; font-size: 10px; font-style: italic;">${exp.responsibilities}</p>`
                    : ""
                }
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }

        <!-- Skills -->
        ${
          cvData.skills.length > 0
            ? `
          <div>
            <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #2c5aa0; text-transform: uppercase;">Skills</h3>
            <p style="margin: 0; font-size: 11px; color: #333;">
              ${cvData.skills.join(", ")}
            </p>
          </div>
        `
            : ""
        }
      </div>
    `

    cvContainer.innerHTML = cvHTML
    document.body.appendChild(cvContainer)

    // Convert to canvas
    const canvas = await html2canvas(cvContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    // Remove temporary container
    document.body.removeChild(cvContainer)

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgData = canvas.toDataURL("image/png")
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Download
    pdf.save(`CV-${cvData.personal.name || "Resume"}.pdf`)
  } catch (error) {
    console.error("[v0] Error generating PDF:", error)
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

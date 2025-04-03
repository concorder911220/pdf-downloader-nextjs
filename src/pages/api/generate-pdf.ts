// src/pages/api/generate-pdf.ts
import { NextApiRequest, NextApiResponse } from "next";
import pdf from "html-pdf";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({ error: "HTML content is required" });
    }

    const options = {
      format: "A4",
      border: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
      header: {
        height: "0mm",
      },
      footer: {
        height: "0mm",
      },
      // Use base path for proper asset loading
      base: `${process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`}`,
      renderDelay: 1000, // Give some time for JS to execute
    };

    // Generate PDF from HTML
    pdf.create(html, options as any).toBuffer((err, buffer) => {
      if (err) {
        console.error("Error generating PDF:", err);
        return res.status(500).json({ error: "Failed to generate PDF" });
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=reportnow-aura-raport.pdf"
      );
      res.send(buffer);
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

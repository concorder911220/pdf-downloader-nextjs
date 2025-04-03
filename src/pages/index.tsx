import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { NextPage } from "next";
import React, { useRef } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: #e0f2f1;
  min-height: 100vh;
  padding: 2rem 1rem;
  color: #4b5563;
`;

const ContentWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
`;

const DownloadButton = styled.button`
  background-color: #2baa90;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #259980;
  }
`;

const ReportCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleSection = styled.div``;

const ReportTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #4b5563;
`;

const ReportSubtitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #4b5563;
`;

const ClientInfoSection = styled.div`
  width: 50%;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const InfoUnderline = styled.div`
  border-bottom: 1px solid #d1d5db;
  margin-top: 2px;
`;

const InfoLabel = styled.span`
  color: #6b7280;
`;

const InfoValue = styled.span`
  font-weight: 500;
  text-align: right;
`;

const TableContainer = styled.div`
  margin-top: 3rem;
  border-radius: 36px;
  border: 1px solid #65676b;
  padding: 40px 40px 100px;
  box-shadow: 8px 8px #2a9d8f;
  margin-bottom: 80px;
  position: relative;
`;

const YellowMarker = styled.div`
  position: absolute;
  left: -12px;
  top: 34px;
  height: 36px;
  width: 22px;
  background-color: #d8df49;
  z-index: 1;
`;

const RedMarker = styled.div`
  position: absolute;
  left: -12px;
  top: 34px;
  height: 36px;
  width: 22px;
  background-color: #f4a261;
  z-index: 1;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid;
  padding: 24px 24px 24px 32px;
  text-align: center;
  border: 1px solid;
  font-size: 18px;
`;

const LeftTableHeader = styled(TableHeader)`
  width: 25%;
  border: 1px solid;
`;

const TableCell = styled.td`
  border: 1px solid;
  padding: 16px 16px 16px 32px;
`;

const ExtraText = styled.div`
  margin-bottom: 16px;
  color: #65676b;
`;

const ContactRight = styled.div`
  width: 50%;
  display: inline-block;
  float: right;
  font-style: italic;
  margin-top: 20px;
`;

const contactMailIcon = styled.div`
  color: white;
  margin-right: 10px;
  border-radius: 50%;
  padding: 5px;
  font-size: 8px;
  background-color: #2a9d8f;
`;

const contactAddressIcon = styled.div`
  color: white;
  margin-right: 10px;
  border-radius: 50%;
  padding: 5px;
  font-size: 8px;
  background-color: #f4a261;
`;

const Home: NextPage = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  // Sample data
  const reportData = {
    clientName: "Jan Kowalski",
    date: "02.04.2023",
    conversationDuration: "15 minut",
    userData: {
      avatar: "Dzień dobry! Jak mogę Ci dzisiaj pomóc?",
      user: "Potrzebuję informacji na temat nowego produktu.",
      feedback: "Rozmowa była pomocna i profesjonalna. Dziękuję!",
    },
    positiveFeedback: "ON",
    improvement: "ON",
    strengths: "ON",
    developmentArea: "ON",
    recommendation: "ON",
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Create a loading state or indication
      console.log("Generating PDF...");

      // Generate table rows for all conversations
      const tableRows = `
        <tr>
          <td class="table-cell">Avatar</td>
          <td class="table-cell">${reportData.userData.avatar}</td>
        </tr>
        <tr>
          <td class="table-cell"> ${reportData.userData.user.split(" ")[0]}</td>
          <td class="table-cell">${reportData.userData.user}</td>
        </tr>
        <tr>
          <td class="table-cell">Feedback</td>
          <td class="table-cell">${reportData.userData.feedback}</td>
        </tr>
      `;

      // Create enhanced HTML with custom styles for PDF generation
      const enhancedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: sans-serif;
              }
              .report-container {
                background-color: white;
                border-radius: 0.75rem;
                padding: 2rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
                color: #4b5563;
              }
              .header-container {
                display: block;
              }
              .report-title {
                font-size: 3rem;
                font-weight: bold;
                color: #4b5563;
              }
              .report-subtitle {
                font-size: 1.875rem;
                font-weight: bold;
                color: #4b5563;
              }
              .client-info-section {
                width: 50%;
                float: right;
                display: inline-block;
              }
              .info-content {
                margin-bottom: 1rem;
              }
              .info-item {
                display: flex;
                flex-direction: column;
              }
              .info-line-container {
                display: block;
                margin-bottom: 4px;
              }
              .info-underline {
                border-bottom: 1px solid #d1d5db;
                margin-top: 2px;
              }
              .info-label {
                color: #6b7280;
              }
              .info-value {
                font-weight: 500;
                display: inline-block;
                float: right;
              }
              .table-container {
                margin-top: 3rem;
                border-radius: 36px;
                border: 1px solid #65676b;
                padding: 40px 40px 100px;
                box-shadow: 8px 8px #2a9d8f;
                margin-bottom: 80px;
                position: relative;
                background-color: white;
              }

              .yellow-marker {
                position: absolute;
                left: -12px;
                top: 34px;
                height: 36px;
                width: 22px;
                background-color: #d8df49;
                z-index: 1;
              }
              .red-marker {
                position: absolute;
                left: -12px;
                top: 34px;
                height: 36px;
                width: 22px;
                background-color: #f4a261;
                z-index: 1;
              }
              .extra-text {
                margin-bottom: 16px;
                color: #65676b;
              }
              .styled-table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid;
              }

              .table-header {
                border: 1px solid;
                padding: 24px 24px 24px 32px;
                text-align: center;
                font-size: 18px;
              }

              .left-table-header {
                width: 25%;
                border: 1px solid;
              }

              .table-cell {
                border: 1px solid;
                padding: 16px 16px 16px 32px;
              }
              .contact-info {
                border-top: 2px solid #65676b;
                margin-bottom: 1.25rem;
                display: block;
                padding-top: 24px;
              }
              .contact-left {
                width: 50%;
                display: inline-block;
              }
              .contact-right {
                width: 50%;
                display: inline-block;
                float: right;
                font-style: italic;
                margin-top: 20px;
              }
              .contact-icon {
                color: white;
                border-radius: 50%;
                padding: 5px;
                font-size: 8px;
              }
              .icon-green {
                background-color: #2a9d8f;
              }
              .icon-orange {
                background-color: #f4a261;
              }
            </style>
          </head>
          <body>
            <div class="report-container">
              <div class="header-container">
                <div style="display: inline-block;">
              <div class="report-title">Raport</div>
              <div class="report-subtitle">nowAURA</div>
                </div>
                <div class="client-info-section">
              <div class="info-item">
                <div class="info-content">
                  <div class="info-line-container">
                <span class="info-label">Klient:</span>
                <span class="info-value">${reportData.clientName}</span>
                  </div>
                  <div class="info-underline"></div>
                </div>
              </div>
              <div class="info-item">
                <div class="info-content">
                  <div class="info-line-container">
                <span class="info-label">Date:</span>
                <span class="info-value">${reportData.date}</span>
                  </div>
                  <div class="info-underline"></div>
                </div>
              </div>
              <div class="info-item">
                <div class="info-content">
                  <div class="info-line-container">
                <span class="info-label">Czas rozmowy:</span>
                <span class="info-value">${reportData.conversationDuration}</span>
                  </div>
                  <div class="info-underline"></div>
                </div>
              </div>
                </div>
              </div>
              
              <div class="table-container">
                <div class="yellow-marker"></div>
              <table class="styled-table">
                <thead>
                  <tr>
                <th class="left-table-header">
                  Osoba
                </th>
                <th class="table-header">
                  Wypowiedź
                </th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
              </div>
              <div class="table-container">
                <div class="red-marker"></div>
                <div class="extra-text">Assessment of soft skills (positive feedback):</div>
                <div class="extra-text">${reportData.positiveFeedback}</div>
              </div>
              <div class="table-container" style="margin-top: 1000px">
                <div class="red-marker"></div>
                <div class="extra-text">Assessment of soft skills (elements for improvement):</div>
                <div class="extra-text">${reportData.improvement}</div>
              </div>
              <div class="table-container">
                <div class="red-marker"></div>
                <div class="extra-text">Strengths:</div>
                <div class="extra-text">${reportData.strengths}</div>
              </div>
              <div class="table-container">
                <div class="red-marker"></div>
                <div class="extra-text">Areas for development:</div>
                <div class="extra-text">${reportData.developmentArea}</div>
              </div>
              <div class="table-container" style="margin-top: 1000px">
                <div class="red-marker"></div>
                <div class="extra-text">Summary and recommendations (which the interviewee should follow
              in the future):</div>
                <div class="extra-text">${reportData.recommendation}</div>
              </div>
              <div class="contact-info">
                <div class="contact-left">
                  <div style="font-weight: bold;">Contact information:</div>
                  <div>Report generated by nowAURA. Have additional questions?</div>
                  <div>Contact us.</div>
                  <div style="margin-top: 10px;">
                    <div style="display: inline-block;">
                      <div style="display: inline-block; margin-right: 20px; vertical-align: top;">
                        <div class="contact-icon icon-green" style="display: inline-block;">📧</div>
                        <div style="display: inline-block; margin-left: 10px; color: #4b5563; font-weight: 500;">
                          kontakt@nowaura.com
                        </div>
                      </div>
                      <div style="vertical-align: top; margin-top: 5px;">
                        <div class="contact-icon icon-orange" style="display: inline-block;">🌐</div>
                        <div style="display: inline-block; margin-left: 10px; color: #4b5563; font-weight: 500;">
                          www.nowaura.com
                        </div>
                      </div>
                    </div>
                    <div style="display: inline-block;  margin-right: 20px; vertical-align: top;">
                      <img src="http://34.16.90.177:3000/images/logo_1.png" alt="Logo" width="60" height="60" />
                    </div>
                  </div>
                </div>
                <div class="contact-right">
                  This AI chat conversation report and transcript was generated
                  entirely by AI.
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      console.log("Generated HTML:", enhancedHtml);

      // Use Next.js API route to generate PDF with html-pdf
      try {
        const response = await fetch("/api/generate-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ html: enhancedHtml }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "reportnow-aura-raport.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          console.log("PDF downloaded successfully using html-pdf");
        } else {
          throw new Error("Next.js API route PDF generation failed");
        }
      } catch (serverError) {
        console.error("Server-side PDF generation failed:", serverError);
        console.log("Falling back to client-side PDF generation...");

        // Fallback to client-side PDF generation
        const canvas = await html2canvas(reportRef.current, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("reportnow-aura-raport.pdf");
        console.log("PDF downloaded successfully using client-side generation");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <ButtonContainer>
          <DownloadButton onClick={handleDownloadPDF}>
            Wypełnij ankietę
          </DownloadButton>
        </ButtonContainer>
        <ReportCard ref={reportRef} id="report-card">
          <HeaderContainer>
            <TitleSection>
              <ReportTitle>Raport</ReportTitle>
              <ReportSubtitle>nowAURA</ReportSubtitle>
            </TitleSection>

            <ClientInfoSection>
              <InfoItem>
                <InfoContent>
                  <InfoLineContainer>
                    <InfoLabel>Klient:</InfoLabel>
                    <InfoValue>{reportData.clientName}</InfoValue>
                  </InfoLineContainer>
                  <InfoUnderline />
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoContent>
                  <InfoLineContainer>
                    <InfoLabel>Data:</InfoLabel>
                    <InfoValue>{reportData.date}</InfoValue>
                  </InfoLineContainer>
                  <InfoUnderline />
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoContent>
                  <InfoLineContainer>
                    <InfoLabel>Czas trwania rozmowy:</InfoLabel>
                    <InfoValue>{reportData.conversationDuration}</InfoValue>
                  </InfoLineContainer>
                  <InfoUnderline />
                </InfoContent>
              </InfoItem>
            </ClientInfoSection>
          </HeaderContainer>

          <TableContainer>
            <YellowMarker />
            <StyledTable>
              <thead>
                <tr>
                  <LeftTableHeader>Osoba</LeftTableHeader>
                  <TableHeader>Wypowiedź</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>Avatar</TableCell>
                  <TableCell>{reportData.userData.avatar}</TableCell>
                </tr>
                <tr>
                  <TableCell>{reportData.clientName.split(" ")[0]}</TableCell>
                  <TableCell>{reportData.userData.user}</TableCell>
                </tr>
                <tr>
                  <TableCell>Feedback</TableCell>
                  <TableCell>{reportData.userData.feedback}</TableCell>
                </tr>
              </tbody>
            </StyledTable>
          </TableContainer>
          <TableContainer>
            <RedMarker />
            <ExtraText>
              Assessment of soft skills (positive feedback):
            </ExtraText>
            <ExtraText>{reportData.positiveFeedback}</ExtraText>
          </TableContainer>
          <TableContainer>
            <RedMarker />
            <ExtraText>
              Assessment of soft skills (elements for improvement):
            </ExtraText>
            <ExtraText>{reportData.improvement}</ExtraText>
          </TableContainer>
          <TableContainer>
            <RedMarker />
            <ExtraText>Strengths:</ExtraText>
            <ExtraText>{reportData.strengths}</ExtraText>
          </TableContainer>
          <TableContainer>
            <RedMarker />
            <ExtraText>Areas for development:</ExtraText>
            <ExtraText>{reportData.developmentArea}</ExtraText>
          </TableContainer>
          <TableContainer>
            <RedMarker />
            <ExtraText>
              Summary and recommendations (which the interviewee should follow
              in the future):
            </ExtraText>
            <ExtraText>{reportData.recommendation}</ExtraText>
          </TableContainer>
          <div
            style={{
              borderTop: "2px solid #65676b",
              marginBottom: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "24px",
            }}
          >
            <div style={{ width: "50%" }}>
              <div style={{ fontWeight: "bold" }}>Contact information:</div>
              <div>Report generated by nowAURA. Have additional questions?</div>
              <div>Contact us.</div>
              <div style={{ marginTop: "10px" }}></div>
              <div style={{ display: "inline-block" }}>
                <div
                  style={{
                    display: "inline-block",
                    marginRight: "20px",
                    verticalAlign: "top",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "#2a9d8f;",
                      color: "white",
                      borderRadius: "50%",
                      padding: "5px",
                      fontSize: "8px",
                    }}
                  >
                    📧
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "10px",
                      color: "#4b5563",
                      fontWeight: 500,
                    }}
                  >
                    kontakt@nowaura.com
                  </div>
                </div>
                <div style={{ verticalAlign: "top", marginTop: "5px" }}>
                  <div
                    style={{
                      display: "inline-block",
                      color: "white",
                      borderRadius: "50%",
                      padding: "5px",
                      fontSize: "8px",
                      backgroundColor: " #f4a261;",
                    }}
                  >
                    🌐
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "10px",
                      color: "#4b5563",
                      fontWeight: 500,
                    }}
                  >
                    www.nowaura.com
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginRight: "20px",
                  verticalAlign: "top",
                }}
              >
                <img
                  src="http://34.16.90.177:3000/images/logo_1.png"
                  alt="Logo"
                  width="60"
                  height="60"
                />
              </div>
            </div>
            <ContactRight>
              This AI chat conversation report and transcript was generated
              entirely by AI.
            </ContactRight>
          </div>
        </ReportCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Home;

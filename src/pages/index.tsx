import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { NextPage } from "next";
import React, { useRef } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: #e0f2f1;
  min-height: 100vh;
  padding: 2rem 1rem;
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
  position: relative;
  border-radius: 0.75rem;
  padding: 30px;
  border-radius: 30px;
  border: 1px solid #d1d5db;
  z-index: 1;
  box-shadow: 4px 0 0 -1px rgba(43, 170, 144, 1);
`;

const YellowMarker = styled.div`
  position: absolute;
  left: -5px;
  top: 2.5rem;
  height: 3rem;
  width: 10px;
  background-color: #e6e95d;
  z-index: 1;
`;

const TableWrapper = styled.div`
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid;
  padding: 0.75rem 1rem;
  text-align: left;
  border: 1px solid;
`;

const LeftTableHeader = styled(TableHeader)`
  width: 25%;
  border: 1px solid;
`;

const TableCell = styled.td`
  border: 1px solid;
  padding: 0.75rem 1rem;
`;

const LeftTableCell = styled(TableCell)`
  border: 1px solid;
`;

const LastRowCell = styled.td`
  padding: 0.75rem 1rem;
`;

const Home: NextPage = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  // Sample data
  const reportData = {
    clientName: "Jan Kowalski",
    date: "02.04.2023",
    conversationDuration: "15 minut",
    conversations: [
      {
        avatarMessage: "Dzień dobry! Jak mogę Ci dzisiaj pomóc?",
        userMessage: "Potrzebuję informacji na temat nowego produktu.",
        feedback: "Rozmowa była pomocna i profesjonalna. Dziękuję!",
      },
      {
        avatarMessage: "Czy interesują Cię jakieś konkretne cechy produktu?",
        userMessage: "Tak, chciałbym wiedzieć więcej o funkcjach i cenie.",
        feedback: "Wyczerpująca odpowiedź.",
      },
      {
        avatarMessage: "Czy mogę pomóc jeszcze w czymś innym?",
        userMessage: "Nie, to wszystko. Dziękuję za pomoc!",
        feedback: "Świetna obsługa.",
      },
    ],
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Create a loading state or indication
      console.log("Generating PDF...");

      // Generate table rows for all conversations
      const tableRows = reportData.conversations
        .map(
          (conversation) => `
        <tr>
          <td class="table-cell">Avatar</td>
          <td class="table-cell">${conversation.avatarMessage}</td>
        </tr>
        <tr>
          <td class="table-cell"> ${reportData.clientName.split(" ")[0]}</td>
          <td class="table-cell">${conversation.userMessage}</td>
        </tr>
        <tr>
          <td class="table-cell">Feedback</td>
          <td class="table-cell">${conversation.feedback}</td>
        </tr>
      `
        )
        .join("");

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
                position: relative;
                border-radius: 0.75rem;
                padding: 30px;
                border-radius: 30px;
                border: 1px solid #d1d5db;
                z-index: 1;
                background-color: white;
                box-shadow: 4px 0 0px -1px rgba(43, 170, 144, 1);
              }

              .yellow-marker {
                position: absolute;
                left: -5px;
                top: 2.5rem;
                height: 3rem;
                width: 10px;
                background-color: #e6e95d;
                z-index: 1;
              }

              .styled-table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid;
              }

              .table-header {
                border: 1px solid;
                padding: 0.75rem 1rem;
                text-align: left;
                background-color: #f9fafb;
              }

              .left-table-header {
                width: 25%;
                border: 1px solid;
              }

              .table-cell {
                border: 1px solid;
                padding: 0.75rem 1rem;
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
                {reportData.conversations.map((conversation, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <LeftTableCell>Avatar</LeftTableCell>
                      <TableCell>{conversation.avatarMessage}</TableCell>
                    </tr>
                    <tr>
                      <LeftTableCell>
                        {reportData.clientName.split(" ")[0]}
                      </LeftTableCell>
                      <TableCell>{conversation.userMessage}</TableCell>
                    </tr>
                    <tr>
                      <LeftTableCell>Feedback</LeftTableCell>
                      <TableCell>
                        {conversation.feedback || "Brak oceny"}
                      </TableCell>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
        </ReportCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Home;

import { jsPDF } from 'jspdf';
import { NumerologyReport } from './numerology';

// Add Vietnamese font support (using default Unicode support)
export function generatePDF(report: NumerologyReport): jsPDF {
  const doc = new jsPDF();
  let yPos = 20;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;

  function addText(text: string, fontSize = 12, isBold = false) {
    if (yPos > pageHeight - margin) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(fontSize);
    doc.text(text, margin, yPos);
    yPos += lineHeight;
  }

  function addSection(title: string, content: string) {
    if (yPos > pageHeight - margin - 20) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPos);
    yPos += lineHeight + 2;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(content, 170);
    for (const line of lines) {
      if (yPos > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin, yPos);
      yPos += lineHeight;
    }
    yPos += 3;
  }

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('BAO CAO THAN SO HOC', margin, yPos);
  yPos += lineHeight + 5;

  // Personal Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  addText(`Ho va Ten: ${report.fullName}`);
  addText(`Ngay Sinh: ${new Date(report.birthDate).toLocaleDateString('vi-VN')}`);
  yPos += 5;

  // Main Numbers
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  addText('CAC SO CHINH');
  yPos += 2;

  addSection(`So Chu Dao (Life Path): ${report.lifePathNumber}`, report.lifePath.meaning);
  addSection('Diem Manh:', report.lifePath.strengths.join(', '));
  addSection('Thach Thuc:', report.lifePath.challenges.join(', '));
  addSection('Nghe Nghiep Phu Hop:', report.lifePath.career.join(', '));
  addSection('Quan He:', report.lifePath.relationships);

  addSection(`So Bieu Dat (Expression): ${report.expressionNumber}`, report.expression.meaning);
  addSection('Tai Nang:', report.expression.talents.join(', '));
  addSection('Muc Dich:', report.expression.purpose);

  addSection(`So Linh Hon (Soul Urge): ${report.soulUrgeNumber}`, report.soulUrge.meaning);
  addSection('Khao Khat:', report.soulUrge.desires.join(', '));
  addSection('Dong Luc:', report.soulUrge.motivation);

  addSection(`So Nhan Cach (Personality): ${report.personalityNumber}`, report.personality.meaning);
  addSection('An Tuong:', report.personality.impression);
  addSection('Dac Diem:', report.personality.traits.join(', '));

  addSection(`So Ngay Sinh (Birthday): ${report.birthdayNumber}`, report.birthday.meaning);
  addSection('Mon Qua:', report.birthday.gift);

  addSection(`So Thai Do (Attitude): ${report.attitudeNumber}`, report.attitude.meaning);
  addSection('Cach Nhin:', report.attitude.outlook);

  // Personal Year
  doc.addPage();
  yPos = 20;
  addSection(`Nam Ca Nhan ${new Date().getFullYear()}: ${report.personalYear}`, report.personalYearAnalysis);

  // Birth Chart
  addSection('BIEU DO NGAY SINH', '');
  for (let i = 1; i <= 9; i++) {
    addText(`So ${i}: ${'*'.repeat(report.birthChart.numbers[i] || 0)} (${report.birthChart.numbers[i] || 0})`);
  }
  if (report.birthChart.missing.length > 0) {
    addText(`So Thieu: ${report.birthChart.missing.join(', ')}`);
  }

  // Life Cycles
  yPos += 5;
  addSection('CHU KY VAN MENH', '');
  addText(`Chu ky 1 (${report.lifeCycles.first.age}): So ${report.lifeCycles.first.number} - ${report.lifeCycles.first.meaning}`);
  addText(`Chu ky 2 (${report.lifeCycles.second.age}): So ${report.lifeCycles.second.number} - ${report.lifeCycles.second.meaning}`);
  addText(`Chu ky 3 (${report.lifeCycles.third.age}): So ${report.lifeCycles.third.number} - ${report.lifeCycles.third.meaning}`);

  // Pinnacles
  yPos += 5;
  addSection('DINH CAO CUOC DOI', '');
  addText(`Dinh cao 1 (${report.pinnacles.first.age}): So ${report.pinnacles.first.number} - ${report.pinnacles.first.meaning}`);
  addText(`Dinh cao 2 (${report.pinnacles.second.age}): So ${report.pinnacles.second.number} - ${report.pinnacles.second.meaning}`);
  addText(`Dinh cao 3 (${report.pinnacles.third.age}): So ${report.pinnacles.third.number} - ${report.pinnacles.third.meaning}`);
  addText(`Dinh cao 4 (${report.pinnacles.fourth.age}): So ${report.pinnacles.fourth.number} - ${report.pinnacles.fourth.meaning}`);

  return doc;
}

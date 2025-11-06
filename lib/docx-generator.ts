import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { NumerologyReport } from './numerology';

export function generateDOCX(report: NumerologyReport): Document {
  const children: Paragraph[] = [];

  // Title
  children.push(
    new Paragraph({
      text: 'BÁO CÁO THẦN SỐ HỌC',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  );

  // Personal Info
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Họ và Tên: ', bold: true }),
        new TextRun(report.fullName)
      ],
      spacing: { after: 200 }
    })
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Ngày Sinh: ', bold: true }),
        new TextRun(new Date(report.birthDate).toLocaleDateString('vi-VN'))
      ],
      spacing: { after: 400 }
    })
  );

  // Main Numbers
  children.push(
    new Paragraph({
      text: 'CÁC SỐ CHÍNH',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 300 }
    })
  );

  // Life Path
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Số Chủ Đạo (Life Path): ${report.lifePathNumber}`, bold: true, size: 24 })
      ],
      spacing: { before: 200, after: 200 }
    })
  );

  children.push(new Paragraph({ text: report.lifePath.meaning, spacing: { after: 200 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Điểm Mạnh: ', bold: true }), new TextRun(report.lifePath.strengths.join(', '))], spacing: { after: 100 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Thách Thức: ', bold: true }), new TextRun(report.lifePath.challenges.join(', '))], spacing: { after: 100 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Nghề Nghiệp Phù Hợp: ', bold: true }), new TextRun(report.lifePath.career.join(', '))], spacing: { after: 100 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Quan Hệ: ', bold: true }), new TextRun(report.lifePath.relationships)], spacing: { after: 300 } }));

  // Expression
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Số Biểu Đạt (Expression): ${report.expressionNumber}`, bold: true, size: 24 })
      ],
      spacing: { before: 200, after: 200 }
    })
  );

  children.push(new Paragraph({ text: report.expression.meaning, spacing: { after: 200 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Tài Năng: ', bold: true }), new TextRun(report.expression.talents.join(', '))], spacing: { after: 100 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Mục Đích: ', bold: true }), new TextRun(report.expression.purpose)], spacing: { after: 300 } }));

  // Soul Urge
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Số Linh Hồn (Soul Urge): ${report.soulUrgeNumber}`, bold: true, size: 24 })
      ],
      spacing: { before: 200, after: 200 }
    })
  );

  children.push(new Paragraph({ text: report.soulUrge.meaning, spacing: { after: 200 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Khao Khát: ', bold: true }), new TextRun(report.soulUrge.desires.join(', '))], spacing: { after: 100 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Động Lực: ', bold: true }), new TextRun(report.soulUrge.motivation)], spacing: { after: 300 } }));

  // Personality
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Số Nhân Cách (Personality): ${report.personalityNumber}`, bold: true, size: 24 })
      ],
      spacing: { before: 200, after: 200 }
    })
  );

  children.push(new Paragraph({ text: report.personality.meaning, spacing: { after: 200 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Ấn Tượng: ', bold: true }), new TextRun(report.personality.impression)], spacing: { after: 100 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Đặc Điểm: ', bold: true }), new TextRun(report.personality.traits.join(', '))], spacing: { after: 300 } }));

  // Birthday
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Số Ngày Sinh (Birthday): ${report.birthdayNumber}`, bold: true, size: 24 })
      ],
      spacing: { before: 200, after: 200 }
    })
  );

  children.push(new Paragraph({ text: report.birthday.meaning, spacing: { after: 200 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Món Quà: ', bold: true }), new TextRun(report.birthday.gift)], spacing: { after: 300 } }));

  // Attitude
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Số Thái Độ (Attitude): ${report.attitudeNumber}`, bold: true, size: 24 })
      ],
      spacing: { before: 200, after: 200 }
    })
  );

  children.push(new Paragraph({ text: report.attitude.meaning, spacing: { after: 200 } }));
  children.push(new Paragraph({ children: [new TextRun({ text: 'Cách Nhìn: ', bold: true }), new TextRun(report.attitude.outlook)], spacing: { after: 400 } }));

  // Personal Year
  children.push(
    new Paragraph({
      text: `NĂM CÁ NHÂN ${new Date().getFullYear()}`,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 300 }
    })
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Số Năm Cá Nhân: ${report.personalYear}`, bold: true })
      ],
      spacing: { after: 200 }
    })
  );

  children.push(new Paragraph({ text: report.personalYearAnalysis, spacing: { after: 400 } }));

  // Birth Chart
  children.push(
    new Paragraph({
      text: 'BIỂU ĐỒ NGÀY SINH',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 300 }
    })
  );

  for (let i = 1; i <= 9; i++) {
    const count = report.birthChart.numbers[i] || 0;
    children.push(
      new Paragraph({
        text: `Số ${i}: ${'★'.repeat(count)} (${count} lần)`,
        spacing: { after: 100 }
      })
    );
  }

  if (report.birthChart.missing.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'Số Thiếu: ', bold: true }),
          new TextRun(report.birthChart.missing.join(', '))
        ],
        spacing: { before: 200, after: 400 }
      })
    );
  }

  // Life Cycles
  children.push(
    new Paragraph({
      text: 'CHU KỲ VẬN MỆNH',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 300 }
    })
  );

  children.push(new Paragraph({ text: `Chu kỳ 1 (${report.lifeCycles.first.age}): Số ${report.lifeCycles.first.number}`, spacing: { after: 100 } }));
  children.push(new Paragraph({ text: report.lifeCycles.first.meaning, spacing: { after: 200 } }));

  children.push(new Paragraph({ text: `Chu kỳ 2 (${report.lifeCycles.second.age}): Số ${report.lifeCycles.second.number}`, spacing: { after: 100 } }));
  children.push(new Paragraph({ text: report.lifeCycles.second.meaning, spacing: { after: 200 } }));

  children.push(new Paragraph({ text: `Chu kỳ 3 (${report.lifeCycles.third.age}): Số ${report.lifeCycles.third.number}`, spacing: { after: 100 } }));
  children.push(new Paragraph({ text: report.lifeCycles.third.meaning, spacing: { after: 400 } }));

  // Pinnacles
  children.push(
    new Paragraph({
      text: 'ĐỈNH CAO CUỘC ĐỜI',
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 300 }
    })
  );

  children.push(new Paragraph({ text: `Đỉnh cao 1 (${report.pinnacles.first.age}): Số ${report.pinnacles.first.number}`, spacing: { after: 100 } }));
  children.push(new Paragraph({ text: report.pinnacles.first.meaning, spacing: { after: 200 } }));

  children.push(new Paragraph({ text: `Đỉnh cao 2 (${report.pinnacles.second.age}): Số ${report.pinnacles.second.number}`, spacing: { after: 100 } }));
  children.push(new Paragraph({ text: report.pinnacles.second.meaning, spacing: { after: 200 } }));

  children.push(new Paragraph({ text: `Đỉnh cao 3 (${report.pinnacles.third.age}): Số ${report.pinnacles.third.number}`, spacing: { after: 100 } }));
  children.push(new Paragraph({ text: report.pinnacles.third.meaning, spacing: { after: 200 } }));

  children.push(new Paragraph({ text: `Đỉnh cao 4 (${report.pinnacles.fourth.age}): Số ${report.pinnacles.fourth.number}`, spacing: { after: 100 } }));
  children.push(new Paragraph({ text: report.pinnacles.fourth.meaning, spacing: { after: 200 } }));

  return new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });
}

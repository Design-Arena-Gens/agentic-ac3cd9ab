import type { NextApiRequest, NextApiResponse } from 'next';
import { generateNumerologyReport } from '@/lib/numerology';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, birthDate } = req.body;

    if (!fullName || !birthDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const report = generateNumerologyReport(fullName, birthDate);

    return res.status(200).json(report);
  } catch (error) {
    console.error('Error generating report:', error);
    return res.status(500).json({ message: 'Error generating report' });
  }
}

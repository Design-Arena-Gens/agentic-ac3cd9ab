import { useState, FormEvent } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { generatePDF } from '@/lib/pdf-generator';
import { generateDOCX } from '@/lib/docx-generator';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import type { NumerologyReport } from '@/lib/numerology';

export default function Home() {
  const { data: session, status } = useSession();
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [report, setReport] = useState<NumerologyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleGenerateReport = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, birthDate }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();
      setReport(data);
      setMessage('Báo cáo đã được tạo thành công!');
    } catch (error) {
      setMessage('Có lỗi xảy ra khi tạo báo cáo. Vui lòng thử lại.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!report) return;

    const doc = generatePDF(report);
    doc.save('bao-cao-than-so-hoc.pdf');
    setMessage('Đã tải xuống file PDF!');
  };

  const handleDownloadDOCX = async () => {
    if (!report) return;

    try {
      const doc = generateDOCX(report);
      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'bao-cao-than-so-hoc.docx');
      setMessage('Đã tải xuống file DOCX!');
    } catch (error) {
      setMessage('Có lỗi xảy ra khi tạo file DOCX.');
      console.error(error);
    }
  };

  const handleSendEmail = async () => {
    if (!report || !session?.user?.email) return;

    setEmailSending(true);
    setMessage('');

    try {
      const doc = generatePDF(report);
      const pdfBase64 = doc.output('datauristring');

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.user.email,
          pdfBase64,
          fullName: report.fullName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Báo cáo đã được gửi đến email của bạn!');
      } else {
        setMessage(data.message || 'Không thể gửi email. Vui lòng thử lại sau.');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra khi gửi email. Vui lòng thử lại.');
      console.error(error);
    } finally {
      setEmailSending(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-xl text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Thần Số Học
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Khám phá bản thân qua con số
            </p>
            <button
              onClick={() => signIn('google')}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Đăng nhập với Google
            </button>
            <p className="text-xs text-center text-gray-500 mt-6">
              Bằng cách đăng nhập, bạn đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật của chúng tôi
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h2 className="font-semibold text-gray-800">
                  Xin chào, {session.user?.name}
                </h2>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Form */}
        {!report && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Tạo Báo Cáo Thần Số Học
            </h1>

            <form onSubmit={handleGenerateReport} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Họ và Tên đầy đủ *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Ví dụ: Nguyễn Văn An"
                />
              </div>

              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ngày sinh *
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {loading ? 'Đang tạo báo cáo...' : 'Báo cáo Thần Số Học'}
              </button>
            </form>

            {message && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-center">{message}</p>
              </div>
            )}
          </div>
        )}

        {/* Report Display */}
        {report && (
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Tải PDF
                </button>

                <button
                  onClick={handleDownloadDOCX}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Tải DOCX
                </button>

                <button
                  onClick={handleSendEmail}
                  disabled={emailSending}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {emailSending ? 'Đang gửi...' : 'Gửi Email'}
                </button>

                <button
                  onClick={() => {
                    setReport(null);
                    setFullName('');
                    setBirthDate('');
                    setMessage('');
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Tạo báo cáo mới
                </button>
              </div>

              {message && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-center">{message}</p>
                </div>
              )}
            </div>

            {/* Report Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Báo Cáo Thần Số Học
              </h1>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <p className="text-lg">
                    <span className="font-semibold">Họ và Tên:</span> {report.fullName}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Ngày Sinh:</span>{' '}
                    {new Date(report.birthDate).toLocaleDateString('vi-VN')}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-purple-700">Các Số Chính</h2>

                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        Số Chủ Đạo (Life Path): {report.lifePathNumber}
                      </h3>
                      <p className="text-gray-700 mb-2">{report.lifePath.meaning}</p>
                      <p className="text-sm">
                        <span className="font-semibold">Điểm Mạnh:</span>{' '}
                        {report.lifePath.strengths.join(', ')}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Thách Thức:</span>{' '}
                        {report.lifePath.challenges.join(', ')}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Nghề Nghiệp:</span>{' '}
                        {report.lifePath.career.join(', ')}
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        Số Biểu Đạt (Expression): {report.expressionNumber}
                      </h3>
                      <p className="text-gray-700 mb-2">{report.expression.meaning}</p>
                      <p className="text-sm">
                        <span className="font-semibold">Tài Năng:</span>{' '}
                        {report.expression.talents.join(', ')}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        Số Linh Hồn (Soul Urge): {report.soulUrgeNumber}
                      </h3>
                      <p className="text-gray-700 mb-2">{report.soulUrge.meaning}</p>
                      <p className="text-sm">
                        <span className="font-semibold">Khao Khát:</span>{' '}
                        {report.soulUrge.desires.join(', ')}
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        Số Nhân Cách (Personality): {report.personalityNumber}
                      </h3>
                      <p className="text-gray-700 mb-2">{report.personality.meaning}</p>
                      <p className="text-sm">
                        <span className="font-semibold">Đặc Điểm:</span>{' '}
                        {report.personality.traits.join(', ')}
                      </p>
                    </div>

                    <div className="bg-pink-50 p-4 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">
                        Năm Cá Nhân {new Date().getFullYear()}: {report.personalYear}
                      </h3>
                      <p className="text-gray-700">{report.personalYearAnalysis}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-purple-700">Biểu Đồ Ngày Sinh</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div
                        key={num}
                        className="bg-gray-50 p-4 rounded-lg text-center border-2 border-gray-200"
                      >
                        <div className="text-2xl font-bold text-purple-600">{num}</div>
                        <div className="text-xl mt-2">
                          {'★'.repeat(report.birthChart.numbers[num] || 0)}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {report.birthChart.numbers[num] || 0} lần
                        </div>
                      </div>
                    ))}
                  </div>
                  {report.birthChart.missing.length > 0 && (
                    <p className="mt-4 text-gray-700">
                      <span className="font-semibold">Số Thiếu:</span>{' '}
                      {report.birthChart.missing.join(', ')}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-purple-700">Chu Kỳ Vận Mệnh</h2>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold">
                        Chu kỳ 1 ({report.lifeCycles.first.age}): Số{' '}
                        {report.lifeCycles.first.number}
                      </p>
                      <p className="text-sm text-gray-700">{report.lifeCycles.first.meaning}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold">
                        Chu kỳ 2 ({report.lifeCycles.second.age}): Số{' '}
                        {report.lifeCycles.second.number}
                      </p>
                      <p className="text-sm text-gray-700">{report.lifeCycles.second.meaning}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold">
                        Chu kỳ 3 ({report.lifeCycles.third.age}): Số{' '}
                        {report.lifeCycles.third.number}
                      </p>
                      <p className="text-sm text-gray-700">{report.lifeCycles.third.meaning}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

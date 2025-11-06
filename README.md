# Website Thần Số Học

Website cho phép người dùng đăng nhập bằng Google, nhập thông tin cá nhân (Họ tên, Ngày sinh) và nhận báo cáo Thần Số Học chi tiết.

## Tính năng

- ✅ Đăng nhập bằng Google OAuth
- ✅ Form đăng ký với Họ tên đầy đủ và Ngày sinh
- ✅ Tính toán Thần số học đầy đủ theo phương pháp Pythagorean
- ✅ Xuất báo cáo dưới dạng PDF
- ✅ Xuất báo cáo dưới dạng DOCX
- ✅ Gửi báo cáo PDF qua Email
- ✅ Hỗ trợ tiếng Việt có dấu

## Cài đặt và Deploy

```bash
npm install
npm run build
vercel deploy --prod
```

## Cấu hình Environment Variables

Cần thiết lập các biến môi trường sau trong Vercel:

- `NEXTAUTH_URL` = https://your-domain.vercel.app
- `NEXTAUTH_SECRET` = (generate bằng: openssl rand -base64 32)
- `GOOGLE_CLIENT_ID` = your-google-client-id
- `GOOGLE_CLIENT_SECRET` = your-google-client-secret
- `RESEND_API_KEY` = your-resend-api-key

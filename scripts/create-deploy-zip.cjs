/**
 * Tạo file deploy.zip với cấu trúc đúng:
 * - index.html, .htaccess, assets/ ở ROOT (không có thư mục dist bên trong)
 * Giải nén trực tiếp vào public_html sẽ đúng
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outZip = path.join(rootDir, 'deploy.zip');

if (!fs.existsSync(distDir)) {
  console.error('Lỗi: Thư mục dist không tồn tại. Chạy npm run build trước.');
  process.exit(1);
}

// Zip NỘI DUNG của dist (không có thư mục dist bên trong)
process.chdir(distDir);
const cmd = `powershell -Command "Compress-Archive -Path 'index.html','.htaccess','favicon.svg','c.js','assets' -DestinationPath '${outZip.replace(/\\/g, '\\\\')}' -Force"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('\n✅ Đã tạo deploy.zip - Upload file này lên public_html và giải nén.');
} catch (err) {
  console.error('Lỗi tạo zip. Thử cách thủ công:', err.message);
  process.exit(1);
}

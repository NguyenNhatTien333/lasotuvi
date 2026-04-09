# La So Tu Vi - Next.js

Ung dung lap la so Tu Vi tren nen Next.js + TypeScript, tap trung vao:

- Engine tinh toan la so (12 cung, he sao, can chi)
- Giao dien data-rich theo phong cach truyen thong
- Kiem thu logic tinh toan va component bang Vitest

## Tai lieu

- Huong dan chay nhanh: xem [QUICK-START.md](QUICK-START.md)
- Dac ta cai tien giao dien: xem [spec-2.md](spec-2.md)

## Yeu cau moi truong

- Node.js >= 18.17
- npm (di kem Node.js)

Neu macOS chua co npm:

```bash
brew install node
```

## Cai dat

```bash
npm install
```

## Chay du an

```bash
npm run dev
```

Sau do mo http://localhost:3000

## Scripts chinh

- npm run dev: chay local development
- npm run build: build production
- npm run start: chay production sau build
- npm run lint: kiem tra lint
- npm run test: chay toan bo test
- npm run test:watch: test watch mode

## Kiem tra nhanh truoc khi day code

```bash
npm run test && npm run lint && npm run build
```

## Cau truc thu muc chinh

- src/app: trang va layout Next.js
- src/components: UI components (InputForm, Chart, Cell, InfoPanel)
- src/lib/lasotuvi: engine tinh toan va cac ham nghiep vu
- src/test: setup test

## Tinh nang da co

- Nhap thong tin sinh (ten, ngay thang nam, gio, gioi tinh, loai lich, mui gio)
- Sinh la so bang nut Tinh la so
- Hien thi 12 cung + thong tin trung cung
- To mau sao theo Ngu Hanh
- Overlay Tuan/Triet giua cac cung bi anh huong
- Xuat anh PNG tu giao dien la so

## Ghi chu pham vi

- localStorage chua bat o giai doan hien tai
- Da ngon ngu va luan giai chi tiet chua nam trong dot chuyen doi nay

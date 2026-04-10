# DAC TA CAI TIEN GIAO DIEN PHAN MEM LA SO TU VI

## 1. Tong quan he thong

- Muc tieu: nang cap UI/UX tu dang toi gian (minimalist) sang dang truyen thong mat do cao (data-rich traditional).
- Nguyen tac cot loi: dung mau sac de phan loai Ngu Hanh va dung vi tri de phan loai tinh chat Cat/Hung cua sao.

## 2. Quy tac phan bo du lieu sao (data mapping)

He thong can truy xuat day du bo sao (108-112 sao). Trong moi o Cung (Palace), du lieu phai duoc phan loai vao cac nhom rieng:

- Chinh tinh (Major Stars): nam o vi tri trung tam phia tren, kem ky hieu do sang (M, V, D, B, H).
- Cat tinh (Lucky Stars): nhom sao tot, xep cot ben trai cua cung.
- Hung tinh (Unlucky Stars): nhom sao xau, xep cot ben phai cua cung.
- Vong Trang Sinh: nam o hang ngang duoi cung.

## 3. Quy tac thiet ke giao dien (UI specification)

### 3.1. He thong mau sac theo Ngu Hanh (Color Palette)

Mau text phai khop voi hanh cua sao:

- Hanh Kim: #B8860B hoac #D4AF37
- Hanh Moc: #228B22
- Hanh Thuy: #0000FF hoac #000000
- Hanh Hoa: #FF0000
- Hanh Tho: #A52A2A hoac #FF8C00

### 3.2. Cau truc layout o Cung (Cell Architecture)

Moi o cung dung CSS Grid hoac Flexbox voi bo cuc:

- Header: ten cung (in dam) + dai han
- Main:
	- Giua: Chinh tinh (bold, uppercase, size 16-18px)
	- Left column: Cat tinh (size 12-13px)
	- Right column: Hung tinh (size 12-13px)
- Footer: Trang Sinh ben trai, Thang ben phai

### 3.3. Xu ly dac biet Tuan/Triet

- Khong hien thi Tuan/Triet nhu sao thong thuong.
- Ve thanh overlay mau den/de dam tren vach ngan giua cac cung bi anh huong.
- Label "TUAN" hoac "TRIET" nam doc hoac ngang tren thanh overlay.

## 4. O trung cung (Center Box Info)

Chuyen tu danh sach text sang dang bang thong tin doi xung:

- Header: "LA SO TU VI" voi font trang trong
- Thong tin dinh danh: ho ten, ngay gio sinh, duong lich va am lich
- Thong tin menh ly: Menh, Cuc, Chu Menh, Chu Than co highlight mau theo hanh

## 5. Thong so style chi tiet (CSS/Stying)

- Border: duong ke mong cho tung cung, duong ke dam cho khung ngoai
- Background: trang su hoac vang nhat de noi mau chu
- Typography: sans-serif cho danh sach sao; serif cho tieu de

## 6. Muc do trien khai hien tai

Duoi day la doi chieu nhanh giua dac ta va ban implementation hien tai:

- Da co phan bo sao theo nhom chinh tinh, cat tinh, hung tinh, trang sinh
- Da co to mau sao theo Ngu Hanh
- Da co overlay TUAN/TRIET tren ranh gioi cung
- Da doi trung cung sang dang bang thong tin
- Chua mo rong day du bo 108-112 sao trong moi tinh huong dac thu
- Co the tinh chinh them typography de sat phong cach file mau

## 7. Tai nguyen tham chieu

- File mau giao dien: ./la-so-tu-vi-mau.jpeg
- Huong dan chay va test: [QUICK-START.md](QUICK-START.md)


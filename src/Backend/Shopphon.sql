
CREATE TABLE KHACHHANG (
	maKH varchar(255) NOT NULL PRIMARY KEY,
	tenKH varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	diachi varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	sdt varchar(255) UNIQUE
);

CREATE TABLE NHASANXUAT(
	tenNSX varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY
);

INSERT INTO NHASANXUAT(tenNSX)
values
('Iphone'),
('Samsung'),
('Oppo'),
('Nokia');

CREATE TABLE LOAISANPHAM(
	tenloaiSP VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY
);

INSERT INTO LOAISANPHAM(tenloaiSP)
values
('Android'),
('iOS'),
('Sản phẩm phổ thông');

CREATE TABLE SANPHAM(
	id varchar(10) NOT NULL PRIMARY KEY,
	tenSP varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	soluong int NOT NULL,
	tenloaiSP varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	tenNSX varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	dungluong varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	giatien float NOT NULL,
	motachitiet varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	mota varchar(255),
	FOREIGN KEY (tenloaiSP) REFERENCES LOAISANPHAM(tenloaiSP),
	FOREIGN KEY (tenNSX) REFERENCES NHASANXUAT(tenNSX)				
);

INSERT INTO SANPHAM (id, tenSP, soluong, tenloaiSP, tenNSX, dungluong, giatien, motachitiet, mota) VALUES
('SP001', 'Iphone 12 Pro ', 10, 'iOS', 'Iphone', '32GB', '130000', 'Bền đẹp và sang trọng','profile_pic-1700324563454.jpg'),
('SP002', 'Samsung Galaxy S8 ', 5, 'Android', 'Samsung', '64GB', '150000', 'Bền đẹp và sang trọng', 'profile_pic-1700324563420.jpg'),
('SP003', 'Nokia', 10, 'Sản phẩm phổ thông', 'Nokia', '32GB', '140000', 'Bền đẹp và sang trọng', 'profile_pic-1700324563453.jpg');

CREATE TABLE CHITIETHOADON(
	maHD varchar(255),
	id varchar(255),
	soluongSP varchar(255),	
	tongtien float,
	PRIMARY KEY(maHD, id),
	FOREIGN KEY (maHD) REFERENCES HOADON(maHD),
	FOREIGN KEY (id) REFERENCES SANPHAM(id)
);

CREATE TABLE HOADON(
	maHD varchar(255) NOT NULL PRIMARY KEY,
	maKH varchar(255) NOT NULL,
	ngay date,
	FOREIGN KEY (maKH) REFERENCES KHACHHANG(maKH)
);
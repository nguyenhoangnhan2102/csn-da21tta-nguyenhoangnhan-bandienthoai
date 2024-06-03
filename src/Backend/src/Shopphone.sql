CREATE TABLE KHACHHANG (
	maKH varchar(255) NOT NULL PRIMARY KEY,
	hotenKH varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	sdt varchar(255) NOT NULL,
	diachi VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
);

CREATE TABLE NHASANXUAT(
	tenNSX varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY
);

INSERT INTO NHASANXUAT(tenNSX)
values
('Apple');

CREATE TABLE LOAISANPHAM(
	tenloaiSP VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY
);

INSERT INTO LOAISANPHAM(tenloaiSP)
values
('Android'),
('iOS');

CREATE TABLE SANPHAM(
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	tenSP varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	soluong int NOT NULL,
	tenloaiSP VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	tenNSX varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	dungluong varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	ram varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	giatien float NOT NULL,
	manhinh varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	pin varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	ghichu text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	mota varchar(255),
	FOREIGN KEY (tenloaiSP) REFERENCES LOAISANPHAM(tenloaiSP),
	FOREIGN KEY (tenNSX) REFERENCES NHASANXUAT(tenNSX)				
);	

INSERT INTO SANPHAM (id, tenSP, soluong, tenloaiSP, tenNSX, dungluong, ram, giatien, manhinh, pin, ghichu, mota) VALUES
('1', 'iPhone 15 Pro Max', 20, 'iOS', 'Apple', '512 GB', '8 GB', '39690000', 'OLED6.7",Super Retina XDR', '4422 mAh, 20 W', 'Vào tháng 09/2023, cuối cùng Apple cũng đã chính thức giới thiệu iPhone 15 Pro Max 512 GB tại sự kiện ra mắt thường niên với nhiều điểm đáng chú ý, nổi bật trong số đó có thể kể đến như sự góp mặt của chipset Apple A17 Pro có trên máy, thiết kế khung titan hay cổng Type-C lần đầu có mặt trên điện thoại iPhone.', 'iphone-15-pro-max.jpg');


CREATE TABLE HOADON(
	maHD varchar(255) NOT NULL PRIMARY KEY,
	maKH varchar(255) NOT NULL,
	diachigiaohang VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	thoigiandat datetime,
	FOREIGN KEY (maKH) REFERENCES KHACHHANG(maKH)
);

CREATE TABLE CHITIETHOADON(
	maHD varchar(255),
	id int AUTO_INCREMENT,
	soluongdat VARCHAR(10) NOT NULL,
	tongtien float NOT NULL,
	PRIMARY KEY(maHD, id),
	FOREIGN KEY (maHD) REFERENCES HOADON(maHD),
	FOREIGN KEY (id) REFERENCES SANPHAM(id)
);
import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Muahang.scss';
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Muahang = () => {

    const [infoProduct, setInfoProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [hoTenKhachHang, setHoTenKhachHang] = useState('');
    const [sodienthoai, setSodienthoai] = useState('');
    const [diachi, setDiachi] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    console.log(id);

    const getusername = sessionStorage.getItem("accessToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    let res = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
                    setInfoProduct(res && res.data && res.data.data ? res.data.data : {});
                    console.log(">>>Check res product: ", res);
                }
            } catch (error) {
                console.error("An error occurred:", error);
                toast.error("Đã xảy ra lỗi khi tải sản phẩm. Vui lòng thử lại sau.");
            }
        };
        fetchData();
    }, [id]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (infoProduct[0]?.soluong > 0 && quantity < infoProduct[0]?.soluong) {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            if (infoProduct[0]?.soluong <= 0) {
                toast.warn("Sản phẩm đã hết hàng!!!");
            } else {
                toast.warn("Số lượng vượt quá số lượng tồn kho!!!");
            }
        }
    };

    const handleConfirm = async (event) => {
        try {
            event.preventDefault();

            const hoTenKhachHang = document.querySelector('input[name="tenKH"]').value.trim();
            const sodienthoai = document.querySelector('input[name="sdt"]').value.trim();
            const diachi = document.querySelector('input[name="diachi"]').value.trim();


            const specialChars = /[!@#$%^&*(),.?":{}|<>]/;

            if (specialChars.test(hoTenKhachHang)) {
                toast.warn("Tên không được chứa ký tự đặc biệt!!!");
                return;
            }

            if (infoProduct[0]?.soluong <= 0) {
                toast.warn("Xin lỗi quý khách, đã hết hàng!!!");
                return;
            }

            if (!hoTenKhachHang || !sodienthoai || !diachi) {
                toast.warn("Vui lòng điền đầy đủ thông tin khách hàng!!!");
                return;
            }

            if (isNaN(sodienthoai) || parseInt(sodienthoai, 10) < 0) {
                toast.warn("Số điện thoại không hợp lệ!!!");
                return;
            }

            if (sodienthoai.length !== 10) {
                toast.warn("Số điện thoại phải có đúng 10 số!!!");
                return;
            }

            const totalPrice = (quantity * infoProduct[0]?.giatien) + 20000;

            console.log("id=", id);
            console.log("hoTenKhachHang=", hoTenKhachHang);
            console.log("sodienthoai=", sodienthoai);
            console.log("diachi=", diachi);
            console.log("quantity=", quantity);
            console.log("totalPrice=", totalPrice);
            const response = await axios.post('http://localhost:8080/api/v1/confirmOrder', {
                id,
                hoTenKhachHang,
                sodienthoai,
                diachi,
                quantity,
                totalPrice,
                getusername,
            });



            if (response.status === 200) {
                console.log("Order confirmed successfully:", response.data);
            } else {
                console.error("Unexpected response status:", response.status);
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
            toast.success("Đặt hàng thành công!!!");
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <Nav />
            <form>
                <div className="muahang-container">
                    <div className="container-thongtinkhachhang">
                        <h3>Thông tin khách hàng</h3>
                        <input type="text" name="tenKH" placeholder="Họ và tên" required /> <br />
                        <div className="warning"><span style={{ color: 'red' }}>* </span>Tên không chứa ký tự đặc biệt</div>
                        <input type="number" name="sdt" pattern="[0-9]*" placeholder="Số điện thoại" /> <br />
                        <div className="warning"><span style={{ color: 'red' }}>* </span>Số điện thoại phải đủ 10 số</div>
                        <input type="text" name="diachi" placeholder="Địa chỉ" /> <br />
                    </div>
                    <div className="thanhdoc"></div>
                    <div className="container-muahang">
                        {infoProduct.map((item, index) => (
                            <div key={index} className="muahang-product-container">
                                <div className="thongtinsanpham">
                                    <div className="content-muahang">
                                        <img
                                            className="muahang-product-img"
                                            src={`http://localhost:8080/public/img/${item.mota}`}
                                            alt={item.tenSP}
                                        />
                                        <label className="product-tensp">{item.tenSP}</label>
                                        <label className="product-pricee">
                                            {item.giatien.toLocaleString()}đ
                                        </label>
                                    </div>
                                    <div className="ton-kho">
                                        {item.soluong > 0 ? (
                                            <span style={{ color: 'green' }}>Còn: {item.soluong}</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>*Hết hàng</span>
                                        )}
                                    </div>
                                    <hr />
                                    <div className="soluong-container">
                                        <div className="soluong-title">
                                            Chọn số lượng:
                                        </div>
                                        <div className="product-soluong">
                                            <div className="tru" onClick={decreaseQuantity}>-</div>
                                            <input className="input-soluong" type="text" name="soluong" value={quantity} readOnly />
                                            <div className="cong" onClick={increaseQuantity}>+</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="tamtinh">
                                        <div className="tamtinh-title">
                                            Tạm tính:
                                        </div>
                                        <div className="tamtinh-value">
                                            {(quantity * item.giatien).toLocaleString()}đ
                                        </div>
                                    </div>
                                    <div className="phivanchuyen">
                                        <div className="phivanchuyen-title">
                                            Phí vận chuyển:
                                        </div>
                                        <div className="phivanchuyen-value">
                                            20.000đ
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="tongtien">
                                        <div className="tongtien-title">
                                            Tổng tiền:
                                        </div>
                                        <div className="tongtien-value">
                                            {(quantity * item.giatien + 20000).toLocaleString()}đ
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="muahang-xacnhan"
                                            type="button"
                                            onClick={(event) => handleConfirm(event)}
                                        >
                                            {item.soluong > 0 ? 'ĐẶT HÀNG' : 'ĐÃ HẾT HÀNG'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default Muahang;

import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './Muahang.scss';
import { toast } from 'react-toastify';

class Muahang extends React.Component {

    state = {
        infoProduct: [],
        quantity: 1,
        hoTenKhachHang: '',
        sodienthoai: '',
        diachi: '',
        soluong: '',
        //isButtonVisible: true, // Thêm trạng thái mới để kiểm soát việc ẩn hiện của nút
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            let res = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
            this.setState({
                infoProduct: res && res.data && res.data.data ? res.data.data : {}
            })
            console.log(">>>Check res product: ", res);
        }
    }

    decreaseQuantity = () => {
        if (this.state.quantity > 1) {
            this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
        }
    }

    increaseQuantity = () => {
        const { quantity, infoProduct } = this.state;

        if (infoProduct[0].soluong > 0 && quantity < infoProduct[0].soluong) {
            this.setState((prevState) => ({
                quantity: prevState.quantity + 1,
                errorMessage: '',
            }));
        } else {
            if (infoProduct[0].soluong <= 0) {
                toast.error("Sản phẩm đã hết hàng!!!");
            }
        }
    };

    handleConfirm = async (event) => {
        try {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của việc gửi form

            let id = this.props.match.params.id;
            console.log(id);
            const hoTenKhachHang = document.querySelector('input[name="tenKH"]').value;
            const sodienthoai = document.querySelector('input[name="sdt"]').value;
            const diachi = document.querySelector('input[name="diachi"]').value;

            //let infoProduct = this.state.infoProduct;
            const { quantity, infoProduct } = this.state;
            if (infoProduct[0].soluong <= 0) {
                toast.error("Xin lỗi, không thể đặt hàng!!!");
                //this.setState({ isButtonVisible: false }); // Ẩn nút khi sản phẩm hết hàng
                return;
            }

            // Kiểm tra họ tên chỉ chứa kí tự và khoảng trắng
            const namePattern = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;
            if (!namePattern.test(hoTenKhachHang)) {
                toast.error("Họ tên không hợp lệ. Vui lòng chỉ nhập kí tự!!!");
                return;
            }

            // Kiểm tra số điện thoại là số và không âm
            if (isNaN(sodienthoai) || parseInt(sodienthoai) < 0) {
                toast.error("Số điện thoại không hợp lệ!!!");
                return;
            }

            if (!hoTenKhachHang || !sodienthoai || !diachi) {
                toast.error("Vui lòng điền đầy đủ thông tin khách hàng!!!");
                return;
            }



            const selectedProduct = infoProduct[0]; // Giả sử chỉ có một sản phẩm

            const totalPrice = (quantity * selectedProduct.giatien) + 20000;



            const response = await axios.post('http://localhost:8080/confirmOrder', {
                id,
                hoTenKhachHang,
                sodienthoai,
                diachi,
                quantity,
                totalPrice,
            });

            // Check the response status
            if (response.status === 200) {
                console.log("Order confirmed successfully:", response.data);
                // Optionally, you can perform actions after a successful request
            } else {
                console.error("Unexpected response status:", response.status);
                alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
        toast.success("Đặt hàng thành công!!!");
    };



    render() {
        let { infoProduct } = this.state;
        return (
            <>
                <form>
                    <div className="muahang-container">
                        <div className="container-thongtinkhachhang">
                            <h3>Thông tin khách hàng</h3>
                            <input type="text" name="tenKH" placeholder="Họ và tên" required /> <br></br>
                            <input type="number" name="sdt" pattern="[0-9]*" placeholder="Số điện thoại" />
                            <br></br>
                            <input type="text" name="diachi" placeholder="Địa chỉ" /> <br></br>
                        </div>
                        <div className="thanhdoc"></div>
                        <div className="container-muahang">
                            {infoProduct &&
                                infoProduct.map((item, index) => (
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
                                            <hr></hr>
                                            <div className="soluong-container">
                                                <div className="soluong-title">
                                                    Chọn số lượng:
                                                </div>
                                                <div className="product-soluong">
                                                    <div className="tru" onClick={this.decreaseQuantity}>-</div>
                                                    <input className="input-soluong" type="text" name="soluong" value={this.state.quantity} readOnly />
                                                    <div className="cong" onClick={this.increaseQuantity}>+</div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="tamtinh">
                                                <div className="tamtinh-title">
                                                    Tạm tính:
                                                </div>
                                                <div className="tamtinh-value">
                                                    {(this.state.quantity * item.giatien).toLocaleString()}đ
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
                                            <hr></hr>
                                            <div className="tongtien">
                                                <div className="tongtien-title">
                                                    Tổng tiền:
                                                </div>
                                                <div className="tongtien-value">
                                                    {(this.state.quantity * item.giatien + 20000).toLocaleString()}đ
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    className="muahang-xacnhan"
                                                    type="button"  // Đặt type là "button" để tránh form tự submit
                                                    onClick={(event) => this.handleConfirm(event)}
                                                //disabled={infoProduct[0].soluong <= 0}  // Vô hiệu hóa nút nếu sản phẩm đã hết hàng
                                                >
                                                    {infoProduct[0].soluong > 0 ? 'ĐẶT HÀNG' : 'ĐÃ HẾT HÀNG'}
                                                </button>
                                                {/* <button
                                                    className="muahang-xacnhan"
                                                    type="button"
                                                    onClick={(event) => this.handleConfirm(event)}
                                                    disabled={!this.state.isButtonVisible}  // Sử dụng trạng thái để kiểm soát việc vô hiệu hóa nút
                                                >
                                                    {infoProduct[0].soluong > 0 ? 'ĐẶT HÀNG' : 'ĐÃ HẾT HÀNG'}
                                                </button> */}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default withRouter(Muahang);

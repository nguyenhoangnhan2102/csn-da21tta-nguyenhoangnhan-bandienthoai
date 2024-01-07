import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './Muahang.scss';

class Muahang extends React.Component {

    state = {
        infoProduct: [],
        quantity: 1,
        hoTenKhachHang: '',
        sodienthoai: '',
        diachi: '',
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
        if (this.state.quantity < 20) {
            this.setState((prevState) => ({
                quantity: prevState.quantity + 1,
                errorMessage: '',
            }));
        } else {
            this.setState({
                errorMessage: 'Số lượng không thể vượt quá 20',
            });
        }
    };

    handleConfirm = async (event) => {
        try {
            event.preventDefault(); // Prevent the default form submission behavior

            let id = this.props.match.params.id;
            console.log(id);
            const hoTenKhachHang = document.querySelector('input[name="tenKH"]').value;
            const sodienthoai = document.querySelector('input[name="sdt"]').value;
            const diachi = document.querySelector('input[name="diachi"]').value;

            if (!hoTenKhachHang || !sodienthoai || !diachi) {
                alert("Vui lòng điền đầy đủ thông tin khách hàng.");
                return;
            }

            const { quantity, infoProduct } = this.state;
            const selectedProduct = infoProduct[0]; // Assuming there's only one product

            const totalPrice = (quantity * selectedProduct.giatien) + 20000;

            // Display the quantity and total price in the alert
            alert("Đặt hàng thành công!!!");

            // Assuming you have axios imported
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
    };



    render() {
        let { infoProduct } = this.state;
        return (
            <>
                <form>
                    <div className="muahang-container">
                        <div className="container-thongtinkhachhang">
                            <h3>Thông tin khách hàng</h3>
                            <input type="text" name="tenKH" placeholder="Họ và tên" required ></input> <br></br>
                            <input type="text" name="sdt" placeholder="Số điện thoại"></input> <br></br>
                            <input type="text" name="diachi" placeholder="Địa chỉ"></input> <br></br>
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
                                                >Xác nhận
                                                </button>
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

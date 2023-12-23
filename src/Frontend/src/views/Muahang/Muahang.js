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

    // handleConfirm = () => {
    //     const hoTenKhachHang = document.querySelector('input[name="tenKH"]').value;
    //     const sodienthoai = document.querySelector('input[name="sdt"]').value;
    //     const diachi = document.querySelector('input[name="diachi"]').value;

    //     if (!hoTenKhachHang || !sodienthoai || !diachi) {
    //         alert("Vui lòng điền đầy đủ thông tin khách hàng.");
    //         return;
    //     }

    //     const { quantity, infoProduct } = this.state;
    //     const selectedProduct = infoProduct[0]; // Assuming there's only one product

    //     const totalPrice = quantity * selectedProduct.giatien;

    //     // Display the quantity and total price in the alert
    //     alert(`
    //         Xác nhận với tên khách hàng: ${hoTenKhachHang}
    //         Xác nhận với số điện thoại: ${sodienthoai}
    //         Xác nhận với địa chỉ: ${diachi}
    //         Số lượng sản phẩm: ${quantity}
    //         Tổng tiền: ${totalPrice.toLocaleString()}đ
    //     `);
    // };

    handleConfirm = () => {
        const { hoTenKhachHang, sodienthoai, diachi, quantity, infoProduct } = this.state;
        const selectedProduct = infoProduct[0]; // Assuming there's only one product
        const totalPrice = quantity * selectedProduct.giatien;

        // Gửi dữ liệu lên server
        axios.post('http://localhost:8080/api/v1/confirm-order', {
            hoTenKhachHang,
            sodienthoai,
            diachi,
            quantity,
            totalPrice,
        })
            .then(response => {
                console.log('Dữ liệu đã được gửi thành công', response.data);
                // Xử lý kết quả nếu cần
            })
            .catch(error => {
                console.error('Đã có lỗi xảy ra khi gửi dữ liệu', error);
                // Xử lý lỗi nếu cần
            });
    };

    render() {
        // ... (Phần render không thay đổi)
    }

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
                                                    {item.giatien.toLocaleString()}
                                                </label>
                                            </div>
                                            <hr></hr>
                                            <div className="soluong-container">
                                                <div className="soluong-title">
                                                    Chọn số lượng:
                                                </div>
                                                <div className="product-soluong">
                                                    <div className="tru" onClick={this.decreaseQuantity}>-</div>
                                                    <input type="text" name="soluong" className="input" value={this.state.quantity} readOnly />
                                                    <div className="cong" onClick={this.increaseQuantity}>+</div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="tamtinh">
                                                <div className="tamtinh-title">
                                                    Giá tiền:
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
                                                    20,000đ
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
                                                    type="summit"  // Đặt type là "button" để tránh form tự submit
                                                    onClick={this.handleConfirm}
                                                    className="muahang-muasp">Xác nhận</button>
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

// import React from "react";
// import { withRouter } from "react-router-dom";
// import axios from "axios";
// import './Muahang.scss';
// import { Button } from "reactstrap";
// import "react-toastify/dist/ReactToastify.css";

// class Muahang extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             counterValue: 1,
//             product: {},
//             errorMessages: {
//                 counterValue: "",
//                 hotenKH: "",
//                 sdt: "",
//                 diachi: "",
//             },
//             isOrderSuccess: false,
//         };
//     }

//     async componentDidMount() {
//         if (this.props.match && this.props.match.params) {
//             let id = this.props.match.params.id;

//             try {
//                 const response = await axios.get(
//                     `http://localhost:8080/api/v1/product/${id}`
//                 );
//                 const productData = response.data.data ? response.data.data[0] : {};
//                 this.setState({
//                     product: productData,
//                 });

//                 console.log("check res: ", response);
//             } catch (error) {
//                 console.error("Error fetching product data: ", error);
//             }
//         }

//         const urlParams = new URLSearchParams(window.location.search);
//         const successMessage = urlParams.get("successMessage");

//         if (successMessage && !this.state.isOrderSuccess) {
//             this.setState({ isOrderSuccess: true });
//             alert(successMessage);

//             setTimeout(() => {
//                 this.setState({ isOrderSuccess: false });
//             }, 3000);
//         }
//     }

//     handleSoluong = (event) => {
//         console.log("check value: ", this.state.counterValue);
//         console.log("check soluong: ", this.state.product.soluong);
//         if (this.state.counterValue > this.state.product.soluong) {
//         }
//     };

//     increment = () => {
//         this.setState((prevState) => ({
//             counterValue: prevState.counterValue + 1,
//         }));
//         if (this.state.counterValue >= this.state.product.soluong) {
//             alert("hết hàng rồi bạn ơi, hôm khác đến nhé =)))");
//             this.setState((prevState) => ({
//                 counterValue: this.state.product.soluong,
//             }));
//             return;
//         }
//     };

//     decrement = () => {
//         const { counterValue } = this.state;
//         if (counterValue > 1) {
//             this.setState({ counterValue: counterValue - 1 });
//         }
//     };

//     render() {
//         const { product, counterValue, errorMessages } = this.state;
//         let isEmptyObj = Object.keys(product).length === 0;
//         console.log("check product: ", product.soluong);
//         console.log("check countervalue: ", counterValue);
//         return (
//             <>
//                 {isEmptyObj === false && (
//                     <div className="muahang-container">
//                         <form method="POST" action="http://localhost:8080/update-user">
//                             <div className="container-setup">
//                                 <div className="muahang-giay-info">
//                                     <div className="muahang-form">
//                                         <h5 className="thongtinh-muahang">Thông tin giao hàng</h5>
//                                         <input name="id" hidden value={product.id} />
//                                         <input name="tenSP" hidden value={product.tenSP} />

//                                         <div className="buttonSoluong">
//                                             <div className="span1" onClick={this.decrement}>
//                                                 -
//                                             </div>
//                                             <input
//                                                 name="soluong"
//                                                 type="text"
//                                                 id="counter"
//                                                 value={counterValue}
//                                                 min={1}
//                                                 max={5000}
//                                                 // readOnly
//                                                 onChange={(event) => this.handleSoluong(event)}
//                                             />
//                                             <div className="span2" onClick={this.increment}>
//                                                 +
//                                             </div>
//                                         </div>

//                                         <label className="muahang-label">
//                                             <input
//                                                 type="text"
//                                                 name="hotenKH"
//                                                 className="muahang-input hoten"
//                                                 placeholder="Họ và tên"
//                                             />
//                                         </label>

//                                         <br />
//                                         <label className="muahang-label">
//                                             <input
//                                                 type="text"
//                                                 name="sdt"
//                                                 className="muahang-input muahang-sdt"
//                                                 placeholder="Số điện thoại "
//                                             />
//                                             {errorMessages.sdt && (
//                                                 <p className="error-message">{errorMessages.sdt}</p>
//                                             )}
//                                         </label>

//                                         <label className="muahang-label">
//                                             <input
//                                                 type="text"
//                                                 name="diachi"
//                                                 className="muahang-input muahang-sonha"
//                                                 placeholder="Địa chỉ chi tiết"
//                                             />
//                                         </label>

//                                         <br />
//                                         <label className="muahang-label">
//                                             <input
//                                                 type="text"
//                                                 name="ghichu"
//                                                 className="muahang-input"
//                                                 placeholder="Ghi chú"
//                                             />
//                                         </label>
//                                         <p className="thanhtoan">Hình thức thanh toán tại nhà</p>
//                                     </div>
//                                 </div>

//                                 <div className="muahang-customer-info">
//                                     <div className="hr-xoaydoc"></div>
//                                     <div className="thongtin-sanpham">
//                                         <div className="thongtin-sanpham_2">
//                                             <span className="discount-bannerr">{counterValue}</span>
//                                             <img
//                                                 src={`http://localhost:8080/public/img/${product.mota}`}
//                                                 className="sanpham-img"
//                                                 alt="Product"
//                                             />
//                                             <span className="sanpham-name">{product.tenSP} </span>
//                                             <span className="sanpham-price">
//                                                 {product.giatien.toLocaleString()}đ
//                                             </span>
//                                         </div>

//                                         <hr></hr>
//                                         <div className="muahang-tamtinh">
//                                             {" "}
//                                             <span className="muahang-tamtinh1">Tạm tính</span>
//                                             <span className="muahang-tamtinh3">
//                                                 {(product.giatien * counterValue).toLocaleString()}đ
//                                             </span>{" "}
//                                         </div>
//                                         <div className="muahang-phivanchuyen">
//                                             <span>Phí vận chuyển</span>
//                                             <span className="muahang-phivanchuyen1">30,000đ</span>
//                                         </div>
//                                         <hr></hr>
//                                         <div className="muahang-tongcong">
//                                             <span>Tổng cộng</span>
//                                             <span className="muahang-tongcong1">
//                                                 {(
//                                                     product.giatien * counterValue +
//                                                     30000
//                                                 ).toLocaleString()}{" "}
//                                                 đ
//                                             </span>
//                                         </div>
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary"
//                                             onClick={this.handleOrder}
//                                         >
//                                             Xác Nhận
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </>
//         );
//     }
// }

// export default withRouter(Muahang);

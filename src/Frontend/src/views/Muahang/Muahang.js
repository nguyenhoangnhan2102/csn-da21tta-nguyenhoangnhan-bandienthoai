// import React from "react";
// import { withRouter } from "react-router-dom";

// class MuaHang extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             data: {},
//             loading: true,
//             error: null,
//             errorMessages: {},
//             product: {}, // Add product to the state
//             counterValue: 1, // Add counterValue to the state with an initial value
//         };
//     }

//     componentDidMount() {
//         this.fetchData();
//     }

//     fetchData = async () => {
//         try {
//             const response = await fetch("http://localhost:8080/api/v1/product", {
//                 method: "GET",
//                 mode: "cors",
//             });
//             if (!response.ok) {
//                 throw new Error("Yêu cầu không thành công");
//             }

//             const jsonResponse = await response.json();

//             this.setState({
//                 data: jsonResponse.data,
//                 loading: false,
//             });

//             console.log(jsonResponse);
//         } catch (error) {
//             console.error(error.message);
//             this.setState({
//                 error: error.message,
//                 loading: false,
//             });
//         }
//     };

//     render() {

//         const { product, counterValue } = this.state;
//         console.log(this.state.data);
//         let giatien = product && product.giatien ? product.giatien.toLocaleString() : 'N/A';
//         return (
//             <form method="POST" action="http://localhost:8080/update-user">
//                 <div className="container-setup">
//                     <div className="muahang-giay-info">
//                         <div className="muahang-form">
//                             <h5 className="thongtinh-muahang">Thông tin giao hàng</h5>
//                             <input name="id" hidden value={product.id} />
//                             <input name="tensp" hidden value={product.tenSP} />

//                             ?

//                             <label className="muahang-label">
//                                 <input
//                                     type="text"
//                                     name="hotenkh"
//                                     className="muahang-input hoten"
//                                     placeholder="Họ và tên"
//                                 />
//                             </label>

//                             <br />
//                             <label className="muahang-label">
//                                 <input
//                                     type="text"
//                                     name="sdt"
//                                     className="muahang-input muahang-sdt"
//                                     placeholder="Số điện thoại "
//                                 />

//                             </label>

//                             <label className="muahang-label">
//                                 <input
//                                     type="text"
//                                     name="diachi"
//                                     className="muahang-input muahang-sonha"
//                                     placeholder="Địa chỉ chi tiết"
//                                 />
//                             </label>

//                             <br />
//                             <label className="muahang-label">
//                                 <input
//                                     type="text"
//                                     name="ghichu"
//                                     className="muahang-input"
//                                     placeholder="Ghi chú"
//                                 />
//                             </label>
//                             <p className="thanhtoan">Hình thức thanh toán tại nhà</p>
//                         </div>
//                     </div>

//                     <div className="muahang-customer-info">
//                         <div className="hr-xoaydoc"></div>
//                         <div className="thongtin-sanpham">
//                             <div className="thongtin-sanpham_2">
//                                 <span className="discount-bannerr">{counterValue}</span>
//                                 <img
//                                     src={`http://localhost:8080/public/img/${product.mota}`}
//                                     className="sanpham-img"
//                                     alt="Product"
//                                 />
//                                 <span className="sanpham-name">{product.tenSP} </span>
//                                 {/* <span className="sanpham-price">
//                                     {product.giatien.toLocaleString()} VND
//                                 </span> */}
//                             </div>

//                             <hr></hr>
//                             <label className="muahang-magiamgia1">
//                                 <input
//                                     type="text"
//                                     name=""
//                                     className="muahang-magiamhgia"
//                                     placeholder="Mã giảm giá (nếu có)"
//                                 />
//                                 <button className="muahang-xacnhan">Sử Dụng</button>
//                             </label>
//                             <hr></hr>
//                             <div className="muahang-tamtinh">
//                                 {" "}
//                                 <span className="muahang-tamtinh1">Tạm tính</span>
//                                 <span className="muahang-tamtinh3">
//                                     {(product.giatien * counterValue).toLocaleString()} VND
//                                 </span>{" "}
//                             </div>
//                             <div className="muahang-phivanchuyen">
//                                 <span>Phí vận chuyển</span>
//                                 <span className="muahang-phivanchuyen1">30,000 VND</span>
//                             </div>
//                             <hr></hr>
//                             <div className="muahang-tongcong">
//                                 <span>Tổng cộng</span>
//                                 <span className="muahang-tongcong1">
//                                     {(
//                                         product.giatien * counterValue +
//                                         30000
//                                     ).toLocaleString()}{" "}
//                                     VND
//                                 </span>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="btn btn-primary"
//                                 onClick={this.handleOrder}
//                             >
//                                 Xác Nhận
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         )
//     }
// }

// export default withRouter(MuaHang);
import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './Muahang.scss';

class Muahang extends React.Component {

    state = {
        infoProduct: [],
        quantity: 1, // Mặc định số lượng là 1
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
        if (this.state.quantity < 10) {
            this.setState((prevState) => ({
                quantity: prevState.quantity + 1,
                errorMessage: '', // Clear error message when increasing
            }));
        } else {
            this.setState({
                errorMessage: 'Số lượng không thể vượt quá 10', // Set error message
            });
        }
    };


    render() {
        let { infoProduct } = this.state;
        return (
            <>
                <div className="muahang-container">

                    <div className="container-thongtinkhachhang">
                        <h3>Thông tin khách hàng</h3>
                        <input type="text" name="tenKH" placeholder="Họ và tên"></input> <br></br>
                        <input type="text" name="sdt" placeholder="Số điện thoại"></input> <br></br>
                        <input type="text" name="diachi" placeholder="Địa chỉ"></input> <br></br>
                        <input type="text" name="tenKH" placeholder="Yêu cầu khác (không bắt buộc)"></input> <br></br>

                    </div>
                    <div className="thanhdoc"></div>
                    <div className="muahang-product">

                        {infoProduct &&
                            infoProduct.map((item, index) => (
                                <div key={index} className="muahang-product-container">
                                    <div className="muahang-product-left">


                                    </div>
                                    <div className="muahang-product-right">
                                        <div className="content-muahang">
                                            <img
                                                className="muahang-product-img"
                                                src={`http://localhost:8080/public/img/${item.mota}`}
                                                alt={item.tenSP}
                                            />

                                            <label className="product-tensp">{item.tenSP}</label>
                                            <label className="product-pricee">
                                                {item.giatien.toLocaleString()} đ

                                            </label>
                                        </div>
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
                                        <div className="tongtien">
                                            <div className="tongtien-title">
                                                Tổng tiền
                                            </div>
                                        </div>

                                        <div>
                                            <a href={`/mua/${item.id}`} className="muahang-muasp" typeof="button">Xác nhận</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div ></>


        )
    }
}

export default withRouter(Muahang);
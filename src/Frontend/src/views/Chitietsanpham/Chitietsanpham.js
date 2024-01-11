import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './Chitietsanpham.scss'

class InfoProduct extends React.Component {

    state = {
        infoProduct: []
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

    render() {
        let { infoProduct } = this.state;
        console.log(">>>Check props: ", this.props)
        return (
            <div className="product">
                {infoProduct &&
                    infoProduct.map((item, index) => (
                        <div key={index} className="product-container">
                            <div className="product-left">
                                <div className="product-top">
                                    <a>
                                        <img
                                            className="product-img"
                                            src={`http://localhost:8080/public/img/${item.mota}`}
                                            alt={item.tenSP}
                                        />
                                    </a>
                                </div>
                                <div className="border">
                                </div>
                                <div className="ghichu">
                                    {item.ghichu}
                                </div>
                            </div>
                            <div className="product-right">
                                <div className="product-info">
                                    <div className="name-product">{item.tenSP}</div>
                                    <div className="price-product">
                                        {item.giatien.toLocaleString()}<sup><u>đ</u></sup>
                                    </div>
                                </div>
                                <div className="table">
                                    <table>
                                        <tbody className="table-content">
                                            <tr>
                                                <td className="table-name-content">Màn hình:</td>
                                                <td className="table-value-content">{item.manhinh}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-name-content">Hệ điều hành:</td>
                                                <td className="table-value-content">{item.tenloaiSP}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-name-content">Dung lượng:</td>
                                                <td className="table-value-content">{item.dungluong}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-name-content">RAM:</td>
                                                <td className="table-value-content">{item.ram}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-name-content">Pin, sạc:</td>
                                                <td className="table-value-content">{item.pin}</td>
                                            </tr>
                                            <tr>
                                                <td className="table-name-content">Hãng:</td>
                                                <td className="table-value-content">{item.tenNSX}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <a href={`/mua/${item.id}`} className="muasp">Mua</a>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        )
    }
}

export default withRouter(InfoProduct);
import React from "react";
import './SanPham.scss';
import axios from "axios";

import { withRouter } from "react-router-dom";

class SanPham extends React.Component {

    state = {
        listProducts: []
    }

    async componentDidMount() {
        let res = await axios.get('http://localhost:8080/api/v1/product');
        this.setState({
            listProducts: res && res.data && res.data.data ? res.data.data : []
        })

        console.log(">>>Check res: ", res.data.data);
    }

    render() {
        let { listProducts } = this.state;
        return (
            <ul className="products">
                {listProducts &&
                    listProducts.map((item, index) => (
                        <li key={index}>
                            <div className="product-top">
                                <a
                                    className="product-thumb"
                                >

                                    <img className="product-pic"
                                        src={`http://localhost:8080/public/img/${item.mota}`}
                                        alt={item.tenSP}
                                    />

                                </a>
                            </div>
                            <div className="product-info">
                                <div className="product-name">{item.tenSP}</div>
                                <div className="product-price">
                                    {item.giatien.toLocaleString()} VND
                                </div>
                            </div>
                            <a className="mua">
                                Mua
                            </a>
                        </li>
                    ))}
            </ul>
        )
    }

}

export default withRouter(SanPham);
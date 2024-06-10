import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import './Chitietsanpham.scss';
import { useParams } from "react-router-dom";

const Chitietsanpham = (props) => {
    const [infoProduct, setInfoProduct] = useState([]);

    const { id } = useParams();
    console.log(id)
    console.log("pros:", props);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    let res = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
                    setInfoProduct(res?.data?.data || []);
                    console.log(">>>Check res product: ", res);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            // Cleanup code (if any)
        };
    }, [props.match]);

    console.log(">>>Check props: ", props);

    return (
        <>
            <Nav />
            <div className="product">
                {infoProduct.map((item, index) => (
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
                            <div className="border"></div>
                            <div className="thongtinchitiet">
                                Thông tin sản phẩm
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
                                <a href={`/mua/${item.id}`} className="muasp">MUA NGAY</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Chitietsanpham;

import React from "react";
import { withRouter } from "react-router-dom";
import './Product.scss';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true,
            error: null,
            searchTerm: "",
            priceFilter: "", // Thêm state để lưu trữ giá trị của nút radio
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/product", {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Yêu cầu không thành công");
            }

            const jsonResponse = await response.json();

            this.setState({
                data: jsonResponse.data,
                loading: false,
            });

            console.log(jsonResponse);
        } catch (error) {
            console.error(error.message);
            this.setState({
                error: error.message,
                loading: false,
            });
        }
    };

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePriceFilterChange = (value) => {
        this.setState({ priceFilter: value });
    };

    render() {
        const { data, loading, error, searchTerm, priceFilter } = this.state;

        const filteredData =
            data &&
            data.length > 0 &&
            data
                .filter((item) =>
                    item.tenSP.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter((item) =>
                    priceFilter === "50000000"
                        ? item.giatien < 50000000
                        : priceFilter === "10000000"
                            ? item.giatien < 10000000 && item.giatien >= 15000000
                            : priceFilter === "15000000"
                                ? item.giatien < 15000000 && item.giatien >= 10000000
                                : true
                );

        return (
            <div className="container-bottom">
                <div className="tieude1">
                    <div>
                        <h1>Danh Sách Sản Phẩm</h1>
                    </div>

                    <div className="Searchfillter">
                        <div className="editinput">
                            <input
                                placeholder="tìm kiếm sản phẩm"
                                value={searchTerm}
                                onChange={this.handleSearchChange}
                            />
                        </div>
                        <div className="fillter">
                            <label>
                                <input
                                    type="radio"
                                    name="priceFilter"
                                    value="5000000"
                                    checked={priceFilter === "5000000"}
                                    onChange={() => this.handlePriceFilterChange("5000000")}
                                />
                                Dưới 5 triệu
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="priceFilter"
                                    value="10000000"
                                    checked={priceFilter === "10000000"}
                                    onChange={() => this.handlePriceFilterChange("10000000")}
                                />
                                Dưới 10 triệu
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="priceFilter"
                                    value="15000000"
                                    checked={priceFilter === "15000000"}
                                    onChange={() => this.handlePriceFilterChange("15000000")}
                                />
                                Dưới 15 triệu
                            </label>
                        </div>
                    </div>
                </div>

                <ul className="products">
                    {filteredData &&
                        filteredData.map((item, index) => (
                            <li key={index}>
                                <div className="product-top">
                                    <a
                                        href={`/thongtinchitietsp/${item.id}`}
                                        className="product-thumb"
                                    >
                                        <div className="product-pic">
                                            <img
                                                src={`http://localhost:8080/public/img/${item.mota}`}
                                                alt={item.tenSP}
                                            />
                                        </div>
                                    </a>
                                    <a href={`/thongtinchitietsp/${item.id}`} className="mua">
                                        Mua
                                    </a>
                                </div>
                                <div className="product-info">
                                    <div className="product-name">{item.tenSP}</div>
                                    <div className="product-price">
                                        {item.giatien.toLocaleString()} VND
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

export default withRouter(Search);
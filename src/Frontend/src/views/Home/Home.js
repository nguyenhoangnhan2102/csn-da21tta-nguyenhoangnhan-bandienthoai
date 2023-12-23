import React from "react";
import { withRouter } from "react-router-dom";
import './Home.scss';

class ListProduct extends React.Component {

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

    // handleViewInfoProduct = (product) => {
    //     this.props.history.push(`/product/${product.id}`)
    // }

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
                    priceFilter === "5000000"
                        ? item.giatien < 5000000
                        : priceFilter === "10000000"
                            ? item.giatien <= 10000000 && item.giatien >= 5000000
                            : priceFilter === "20000000"
                                ? item.giatien <= 20000000 && item.giatien > 10000000
                                : priceFilter === "above20000000" // Thêm điều kiện mới
                                    ? item.giatien > 20000000
                                    : true
                );

        const priceOptions = [
            { label: "Dưới 5 triệu", value: "5000000" },
            { label: "5 - 10 triệu", value: "10000000" },
            { label: "10 - 20 triệu", value: "20000000" },
            { label: "Trên 20 triệu", value: "above20000000" },
        ];
        const firstTenProducts = filteredData ? filteredData.slice(0, 10) : [];

        return (
            <div className="container">
                <div className="tieude1">
                    <div className="logo">
                        <a>
                            <img src="logoshop.png" />
                        </a>
                    </div>

                    <div className="Searchfillter">
                        <div className="editinput">
                            <input
                                placeholder="Tìm kiếm sản phẩm"
                                value={searchTerm}
                                onChange={this.handleSearchChange}
                            />
                        </div>
                        {/* <div className="fillter">
                            <label>
                                <input
                                    hidden type="radio"
                                    name="priceFilter"
                                    value="5000000"
                                    checked={priceFilter === "5000000"}
                                    onChange={() => this.handlePriceFilterChange("5000000")}
                                />
                                <a>Dưới 5 triệu</a>
                            </label>
                            <label>
                                <input
                                    hidden type="radio"
                                    name="priceFilter"
                                    value="10000000"
                                    checked={priceFilter === "10000000"}
                                    onChange={() => this.handlePriceFilterChange("10000000")}
                                />
                                <a>5 - 10 triệu</a>
                            </label>
                            <label>
                                <input
                                    hidden type="radio"
                                    name="priceFilter"
                                    value="20000000"
                                    checked={priceFilter === "20000000"}
                                    onChange={() => this.handlePriceFilterChange("20000000")}
                                />
                                <a className="price">10 - 20 triệu</a>
                            </label>
                            <label>
                                <input
                                    hidden type="radio"
                                    name="priceFilter"
                                    value="above20000000"
                                    checked={priceFilter === "above20000000"}
                                    onChange={() => this.handlePriceFilterChange("above20000000")}
                                />
                                <a className="price">Trên 20 triệu</a>
                            </label>
                        </div> */}
                        <div>
                            {priceOptions.map((option) => (
                                <button
                                    key={option.value}
                                    className={
                                        this.state.priceFilter === option.value ? "selected" : ""
                                    }
                                    onClick={() => this.handlePriceFilterChange(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>



                    </div>
                </div >

                <div className="content">
                    <a>Một số sản phẩm</a>
                </div>

                <ul className="products">
                    {firstTenProducts &&
                        firstTenProducts.map((item, index) => (
                            <li key={index}>
                                <div className="product-top">
                                    <a
                                        href={`/product/${item.id}`}
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
                                        {item.giatien.toLocaleString()}<sup><u>đ</u></sup>
                                    </div>
                                </div>
                                {/* <div onClick={() => this.handleViewInfoProduct(item)}>
                                    <a className="mua">Mua</a>
                                </div> */}
                            </li>
                        ))}
                </ul>
            </div >
        );
    }
}

export default withRouter(ListProduct);
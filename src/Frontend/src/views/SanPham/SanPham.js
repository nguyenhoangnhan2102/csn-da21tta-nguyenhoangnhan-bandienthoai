import React from "react";
import './SanPham.scss';
//import axios from "axios";

class SanPham extends React.Component {

    // state = {
    //     listProducts: []
    // }

    // async componentDidMount() {
    //     let res = await axios.get('http://localhost:8080/api/v1/product');
    //     this.setState({
    //         listProducts: res && res.data && res.data.data ? res.data.data : []
    //     })

    //     console.log(">>>Check res: ", res.data.data);
    // }
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true,
            error: null,
            searchTerm: "",
            priceFilter: "",
            productTypeFilter: "",
            manufacturerFilter: "",
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

    handleManufacturerFilterChange = (value) => {
        this.setState({ manufacturerFilter: value });
    };

    handleProductTypeFilterChange = (value) => {
        this.setState({ productTypeFilter: value });
    };

    render() {
        const { data, loading, error, searchTerm, priceFilter, productTypeFilter, manufacturerFilter } = this.state;

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
                )
                .filter((item) =>
                    manufacturerFilter
                        ? item.tenNSX === manufacturerFilter
                        : true
                )
                .filter((item) =>
                    productTypeFilter
                        ? item.tenloaiSP === productTypeFilter
                        : true
                );

        const priceOptions = [
            { label: "Dưới 5 triệu", value: "5000000" },
            { label: "5 - 10 triệu", value: "10000000" },
            { label: "10 - 20 triệu", value: "20000000" },
            { label: "Trên 20 triệu", value: "above20000000" },
        ];

        const manufacturerOptions = [
            { label: "Tất cả", value: "" },
            { label: "Apple", value: "Apple" },
            { label: "OPPO", value: "OPPO" },
            { label: "realme", value: "realme" },
            { label: "Samsung", value: "Samsung" },
            { label: "vivo", value: "vivo" },
            { label: "Xiaomi", value: "Xiaomi" },
        ];

        const productTypeOptions = [
            { label: "Tất cả", value: "" },
            { label: "Android", value: "Android" },
            { label: "iOS", value: "iOS" },
        ];
        console.log(this.state.data)

        return (
            <div className="container">
                <div className="tieude1">
                    <div>
                        <h1>Danh Sách Sản Phẩm</h1>
                    </div>

                    <div className="Searchfillter">
                        <div className="editinput">
                            <input
                                placeholder="Tìm kiếm sản phẩm"
                                value={searchTerm}
                                onChange={this.handleSearchChange}
                            />
                        </div>
                        <div className="price-filter">
                            <label className="gia-title">Chọn giá:</label>
                            <select
                                value={priceFilter}
                                onChange={(e) => this.handlePriceFilterChange(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                {priceOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="manufacturer-filter">
                            <label className="manufacturer-title">Hãng:</label>
                            <select
                                value={manufacturerFilter}
                                onChange={(e) => this.handleManufacturerFilterChange(e.target.value)}
                            >
                                {manufacturerOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="product-type-filter">
                            <label className="type-title">Loại điện thoại:</label>
                            <select
                                value={productTypeFilter}
                                onChange={(e) => this.handleProductTypeFilterChange(e.target.value)}
                            >
                                {productTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div >

                <ul className="products">
                    {filteredData &&
                        filteredData.map((item, index) => (
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
                            </li>
                        ))}
                </ul>
            </div >
        );
    }

}

export default SanPham;
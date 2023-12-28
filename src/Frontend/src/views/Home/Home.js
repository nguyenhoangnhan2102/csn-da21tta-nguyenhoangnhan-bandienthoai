import React from "react";
import { withRouter } from "react-router-dom";
import './Home.scss';

class Home extends React.Component {



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
            currentImageIndex: 0,
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

    handleManufacturerFilterChange = (value) => {
        this.setState({ manufacturerFilter: value });
    };

    handleProductTypeFilterChange = (value) => {
        this.setState({ productTypeFilter: value });
    };

    handleNextImage = () => {
        const { currentImageIndex } = this.state;
        const totalImages = 5; // Số lượng ảnh trong danh sách

        // Chuyển đến ảnh tiếp theo, quay lại ảnh đầu nếu đã đến ảnh cuối cùng
        this.setState({
            currentImageIndex: (currentImageIndex + 1) % totalImages,
        });
    };

    handlePrevImage = () => {
        const { currentImageIndex } = this.state;
        const totalImages = 5; // Số lượng ảnh trong danh sách

        // Chuyển đến ảnh trước đó, quay lại ảnh cuối cùng nếu đã ở ảnh đầu tiên
        this.setState({
            currentImageIndex:
                (currentImageIndex - 1 + totalImages) % totalImages,
        });
    };

    render() {

        const { data,
            loading,
            error,
            searchTerm,
            priceFilter,
            productTypeFilter,
            manufacturerFilter,
        } = this.state;

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
                )

        const priceOptions = [
            { label: "Tất cả", value: "" },
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

        const { currentImageIndex } = this.state;
        const imageSources = ['/img/Anh1.jpg', '/img/Anh2.webp', '/img/Anh3.jpg', '/img/Anh4.jpg', '/img/Anh5.jpg'];

        const firstTenProducts = filteredData ? filteredData.slice(0, 10) : [];

        return (
            <div className="container">
                <div className="introduce">
                    <button className="introduce-slide" onClick={this.handlePrevImage}>&lt;</button>
                    <div>
                        {imageSources.map((src, index) => (
                            <img
                                key={index}
                                className={`introduce-pic ${index === currentImageIndex ? 'visible' : 'hidden'
                                    }`}
                                src={src}
                                alt={`Image ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button className="introduce-slide" onClick={this.handleNextImage}>&gt;</button>
                </div>
                <div className="tieude1">

                    {/* Bên trong phương thức render của component ListProduct của bạn */}
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
                            </li>
                        ))}
                </ul>
            </div >
        );
    }
}

export default withRouter(Home);
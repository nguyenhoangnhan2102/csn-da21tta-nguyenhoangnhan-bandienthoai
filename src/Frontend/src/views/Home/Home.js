import React from "react";
import Nav from '../Nav/Nav';
import { useState, useEffect } from "react";
import './Home.scss';
import { Link } from "react-router-dom";

const Home = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [productTypeFilter, setProductTypeFilter] = useState("");
    const [manufacturerFilter, setManufacturerFilter] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs once after the first render

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/product", {
                method: "GET",
                mode: "cors",
            });
            if (!response.ok) {
                throw new Error("Yêu cầu không thành công");
            }

            const jsonResponse = await response.json();
            setData(jsonResponse.data);
            setLoading(false);
            console.log(jsonResponse);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePriceFilterChange = (value) => {
        setPriceFilter(value);
    };

    const handleManufacturerFilterChange = (value) => {
        setManufacturerFilter(value);
    };

    const handleProductTypeFilterChange = (value) => {
        setProductTypeFilter(value);
    };

    const handleNextImage = () => {
        const totalImages = 5; // Số lượng ảnh trong danh sách
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const handlePrevImage = () => {
        const totalImages = 5; // Số lượng ảnh trong danh sách
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

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

    const imageSources = ['/img/Anh1.jpg', '/img/Anh2.webp', '/img/Anh10.webp', '/img/Anh4.jpg', '/img/Anh5.jpg'];

    const firstTenProducts = filteredData ? filteredData.slice(0, 10) : [];

    return (
        <>
            <Nav />
            <div className="container">
                <div className="introduce">
                    <button className="introduce-slide" onClick={handlePrevImage}>&lt;</button>
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

                    <button className="introduce-slide" onClick={handleNextImage}>&gt;</button>
                </div>
                <div className="tieude1">

                    {/* Bên trong phương thức render của component ListProduct của bạn */}
                    <div className="Searchfillter">
                        <div className="editinput">
                            <input
                                placeholder="Tìm kiếm sản phẩm"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="price-filter">
                            <label className="gia-title">Chọn giá:</label>
                            <select
                                value={priceFilter}
                                onChange={(e) => handlePriceFilterChange(e.target.value)}
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
                                onChange={(e) => handleManufacturerFilterChange(e.target.value)}
                            >
                                {manufacturerOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="product-type-filter">
                            <label className="type-title">Hệ điều hành:</label>
                            <select
                                value={productTypeFilter}
                                onChange={(e) => handleProductTypeFilterChange(e.target.value)}
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
                                    <Link to={`/product/${item.id}`} className="product-thumb">
                                        <img
                                            className="product-pic"
                                            src={`http://localhost:8080/public/img/${item.mota}`}
                                            alt={item.tenSP}
                                        />
                                    </Link>
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
        </>
    );
}

export default Home;
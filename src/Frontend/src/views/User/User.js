import React, { useState, useEffect } from 'react';
import './User.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const { username } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs once after the first render

    const fetchData = async () => {
        try {
            console.log("username=", username);
            const response = await axios.get(`http://localhost:8080/api/v1/user/info/${username}`, {
                method: "GET",
                mode: "cors",
            });

            console.log("res=", response.data.DT[0]);

            if (+ response.data.EC === 1) {
                console.log("res.data.DT", response.data.DT);
                setData(response.data.DT);
                console.log("data.ec = ", response.data.EC);

            }


            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            setLoading(false);
        }
    };
    console.log("data = ", data)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }




    return (
        <div>
            <ul className="products">
                {data ? (
                    data.map((item, index) => (
                        <li key={index}>
                            {/* <div className="product-top">
                                <a
                                    href={`/user/${item.avatar}`}
                                    className="product-thumb"
                                >
                                </a>
                            </div> */}
                            <div className="product-info">
                                <label>Họ tên:</label>
                                <div className="product-name">{item.hotenKH}</div>
                                <label>Số điện thoại:</label>
                                <div className="product-name">{item.sdt}</div>
                                <label>Địa chỉ:</label>
                                <div className="product-name">{item.diachi}</div>

                            </div>
                        </li>
                    ))
                ) : 'Không có dữ liệu'
                }
            </ul>
        </div>
    );
}

export default User;

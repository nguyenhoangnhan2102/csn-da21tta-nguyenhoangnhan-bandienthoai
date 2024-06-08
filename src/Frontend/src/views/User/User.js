import React, { useState, useEffect } from 'react';
import './User.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';

const User = () => {
    const { username } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState({
        hotenKH: '',
        sdt: '',
        diachi: '',
        avatar: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/user/info/update/${username}`, editData);
            if (response.data.EC === 1) {
                setData(editData);
                alert('Cập nhật thành công');
            } else {
                alert('Cập nhật thất bại');
            }
        } catch (error) {
            console.error(error.message);
            alert('Có lỗi xảy ra khi cập nhật');
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
        <>
            <Nav />
            <div className='profile_container'>
                {data ? (
                    data.map((item, index) => (
                        <div className='profile'>
                            <div className='profile_avatar'>
                                <img
                                    className='avatar'
                                    src={`http://localhost:8080/public/img/${item.avatar}`}
                                    onChange={(e) => handleChange(e, 'avatar')}
                                />
                                <div className='taikhoan'>{item.taikhoan}</div>
                            </div>
                            <div className='profile_info'>
                                <label>Họ tên:</label>
                                <div className="profile_spacing hoten">
                                    <input
                                        type="text"
                                        name="hotenKH"
                                        value={item.hotenKH}
                                        onChange={handleChange}
                                    />
                                </div>
                                <label>Số điện thoại:</label>
                                <div className="profile_spacing sdt" >
                                    <input
                                        type="text"
                                        name="sdt"
                                        value={item.sdt}
                                        onChange={handleChange}
                                    />
                                </div>
                                <label>Địa chỉ:</label>
                                <div className="profile_spacing diachi">
                                    <input
                                        type="text"
                                        name="diachi"
                                        value={item.diachi}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='profile_button'>
                                    <button
                                        className='btn btn-primary'
                                        onClick={handleSubmit}
                                    >Sửa</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : 'Không có dữ liệu'
                }
            </div >
        </>
    );
}

export default User;

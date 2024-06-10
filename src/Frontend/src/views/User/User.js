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
    const [hotenKH, sethotenKH] = useState();
    const [sdt, setsdt] = useState();
    const [diachi, setdiachi] = useState();
    const [avatar, setavatar] = useState();
    const [taikhoan, settaikhoan] = useState();


    const [editIMG, setEditIMG] = useState(null);

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

            if (+response.data.EC === 1) {
                setData(response.data.DT);
                sethotenKH(response.data.DT[0].hotenKH);
                setsdt(response.data.DT[0].sdt);
                setdiachi(response.data.DT[0].diachi);
                setavatar(response.data.DT[0].avatar);
                settaikhoan(response.data.DT[0].taikhoan);
                console.log("hotenKH=", response.data.DT[0].sdt)
                console.log("avatar=", response.data.DT[0].avatar);
            }

            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            setLoading(false);
        }
    };


    const handleFileChange = (e) => {

        setEditIMG(e.target.files[0]);

    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/user/info/update/${username}`,
                {
                    hotenKH: hotenKH,
                    sdt: sdt,
                    diachi: diachi,
                });

            if (response.data.EC === 1) {
                setData(response.data.DT);
                console.log("=>", response.data.DT);
                alert('Cập nhật thành công');
            } else {
                alert('Cập nhật thất bại');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi cập nhật');
        }
    };

    const handleSaveImage = async () => {
        const formData = new FormData();
        console.log(editIMG)
        formData.append('avatar', editIMG);
        formData.append('username', username);

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/updateimg`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.log("Lỗi", error);
        }
    }


    console.log("data = ", data)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Nav
            />
            <div className='profile_container'>
                {data ? (
                    <div className='profile'>
                        <div className='profile_avatar'>
                            <img
                                className='avatar'
                                src={`http://localhost:8080/public/img/${avatar}`}
                                alt='Avatar'
                            />
                            <input
                                type='file'
                                onChange={handleFileChange}
                            />
                            <button onClick={handleSaveImage}>Lưu hình ảnh</button>
                            <div className='taikhoan'>Tài khoản: {taikhoan}</div>
                        </div>
                        <div className='profile_info'>
                            <label>Họ tên:</label>
                            <div className="profile_spacing hoten">
                                <input
                                    type="text"
                                    name="hotenKH"
                                    value={hotenKH}
                                    onChange={(e) => sethotenKH(e.target.value)}
                                />
                            </div>
                            <label>Số điện thoại:</label>
                            <div className="profile_spacing sdt">
                                <input
                                    type="text"
                                    name="sdt"
                                    value={sdt}
                                    onChange={(e) => setsdt(e.target.value)}
                                />
                            </div>
                            <label>Địa chỉ:</label>
                            <div className="profile_spacing diachi">
                                <input
                                    type="text"
                                    name="diachi"
                                    value={diachi}
                                    onChange={(e) => setdiachi(e.target.value)}
                                />
                            </div>
                            <div className='profile_button'>
                                <button
                                    onClick={handleSubmit}
                                >Sửa</button>
                            </div>
                        </div>
                    </div>
                ) : 'Không có dữ liệu'}
            </div>
        </>
    );
}

export default User;

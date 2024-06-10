import axios from "axios";
import React, { useEffect, useState } from "react";

const Donhang = (username) => {

    const [data, setData] = useState('');
    const [usernameDonhang, setusernameDonhang] = useState(null);

    useEffect(() => {
        const fetchBill = async () => {
            try {
                if (username.username) {
                    setusernameDonhang(username.username);
                    const res = await axios.get(`http://localhost:8080/api/v1/bill/${username.username}`);
                    setData(res.data.DT);
                    console.log("res1 = ", res.data);  // In dữ liệu đã được giải quyết từ Promise
                }
            } catch (err) {
                console.error("Error fetching bill: ", err);
            }
        };

        fetchBill();
    }, [username.username]);

    return (
        <>
            <h1>{data}</h1>
        </>
    )
}

export default Donhang;
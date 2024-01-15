import React from "react";
import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <>

                <div className="container-footer">
                    <div className="footer-logo">
                        <p className="logo">Shopphone</p>
                    </div>

                    <div className="footer-hr"></div>
                    <div className="foolter">
                        <div className="footer-thongtinlienhe">
                            <p className="thongtinlienhe1"><b>Thông Tin Liên Hệ</b></p>
                            <div className="thongtinlienhe2">
                                <p>Địa chỉ: Trà Vinh</p>
                                <p>Email: nhnhan2102@gmail.com</p>
                                <p>Hotline: 0987 863 073</p>
                            </div>

                        </div>
                        <div className="footer-hr"></div>
                        <div className="footer-chinhsach">
                            <p className="footer-chinhsach1">
                                <b>Chính Sách</b>
                            </p>
                            <div className="footer-chinhsach2">
                                <p>Bảo hành 12 tháng</p>
                                <p>Đổi trả sau 7 ngày </p>
                            </div>
                        </div>
                        <div className="footer-hr"></div>
                        <div className="footer-hotro">
                            <p className="footer-hotro1">
                                <b>Hỗ Trợ </b>
                            </p>
                            <p><a href="/" className="footer-hotro2">Tuyển dụng</a></p> </div>
                        <div className="footer-hr"></div>
                        <div className="footer-mangxahoi">
                            <p className="mangxahoi1">
                                <b>Mạng xã hội</b>
                            </p>
                            <div className="mangxahoi2">
                                <p><a href="https://www.facebook.com/omari.kikane/" className="thea">Facebook</a></p>
                                <p><a href="/" className="thea">Instagram</a></p>
                                <p><a href="/" className="thea">Tiktok</a></p></div>
                        </div>
                    </div>
                </div >
            </>
        );
    }
}

export default Footer;
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faDribbble } from '@fortawesome/free-brands-svg-icons'; // Cập nhật dòng này
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Thêm dòng này
import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            // <footer className="site-footer_Footer">
            //     <div className="container_Footer">
            //         <div className="row_Footer">

            //             <div className="W30__Footer">
            //                 <h6>About</h6>
            //                 <p className="text-justify_Footer">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
            //             </div>

            //             <div className="W30__Footer">
            //                 <h6>Categories</h6>
            //                 <ul className="footer-links_Footer">
            //                     <li><a>C</a></li>
            //                     <li><a>UI Design</a></li>
            //                     <li><a>PHP</a></li>
            //                     <li><a>Java</a></li>
            //                     <li><a>Android</a></li>
            //                     <li><a>Templates</a></li>
            //                 </ul>
            //             </div>

            //             <div className="W30__Footer">
            //                 <h6>Quick Links</h6>
            //                 <ul className="footer-links_Footer">
            //                     <li><a>About Us</a></li>
            //                     <li><a>Contact Us</a></li>
            //                     <li><a>Contribute</a></li>
            //                     <li><a>Privacy Policy</a></li>
            //                     <li><a>Sitemap</a></li>
            //                 </ul>
            //             </div>
            //         </div>

            //         <hr />
            //     </div>
            //     <div className="container_Footer">
            //         <div className="row_Footer">
            //             <div className="col-md-8 col-sm-6 col-xs-12">
            //                 <p className="copyright-text_Footer">Copyright &copy; 2017 All Rights Reserved by
            //                     <a href="#"> Scanfcode</a>.
            //                 </p>
            //             </div>

            //             <div className="col-md-4 col-sm-6 col-xs-12">
            //                 <ul className="social-icons_Footer">
            //                     <li><a className="facebook" href="https://www.facebook.com/omari.kikane/"><FontAwesomeIcon icon={faFacebook} /></a></li>
            //                     <li><a className="twitter" href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
            //                     <li><a className="dribbble" href="#"><FontAwesomeIcon icon={faDribbble} /></a></li>
            //                     <li><a className="linkedin" href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            //                 </ul>
            //             </div>
            //         </div>
            //     </div>
            // </footer>

            <div className="container-footer">
                <div className="footer-logo">   <p className="logo">Shopphone</p></div>

                <div className="footer-hr"></div>
                <div className="foolter">
                    <div className="footer-thongtinlienhe"> <p className="footer-thongtin2">Thông Tin Liên Hệ</p>
                        <p className="footer-thongtinlienhe_diachi">Địa chỉ: Trà Vinh</p>
                        <p>Email: nhnhan2102@gmail.com</p>
                        <p>Phone: 0987863073</p>
                    </div>
                    <div className="footer-hr"></div>
                    <div className="footer-chinhsach">  <p className="footer-thongtin2">Chính Sách </p>
                        <p className="footer-chinhsach_baohanh">Bảo hành 12 tháng</p>
                        <p>Đổi trả sau 3 ngày </p>
                        <p>Miễn ship cho lần đầu mua hàng</p>
                    </div>
                    <div className="footer-hr"></div>
                    <div className="footer-hotro"><p className="footer-thongtin2">Hỗ Trợ </p>
                        <p><a href="/" className="thea footer-hotro_tuyendung">Tuyển dụng</a></p> </div>
                    <div className="footer-hr"></div>
                    <div className="footer-mangxahoi"> <p className="footer-thongtin2"> Mạng xã hội</p>
                        <p><a href="/" className="thea footer-facebook">Facebook</a></p>
                        <p><a href="/" className="thea">Instagram</a></p>
                        <p><a href="/" className="thea">Tiktok</a></p></div>
                </div>
            </div >
        )
    }
}

export default Footer;
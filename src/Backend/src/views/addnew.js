<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="../css/style.css" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    </head>

    <body>
        <div class="topnav">
            <a href="#" class="active">Home</a>
            <a href="/user-order">User Order</a>
        </div>

        <div class="create-user-container">
            <form action="/create-new-product" method="get" enctype="multipart/form-data">
                <fieldset>
                    <legend><b>Thêm sản phẩm</b></legend>
                    {/* <!-- <div>
                        <label for="">Mã sản phẩm : </label>
                        <input type="text" name="id" />
                    </div> --> */}
                    <div>
                        <label for="">Tên sản phẩm : </label>
                        <input type="text" name="tenSP" />
                    </div>
                    <div>
                        <label for="">Loại : </label>
                        <select name="tenloaiSP" id="hall" value="3">
                            <option>Android</option>
                            <option>iOS</option>
                            <option>Sản phẩm phổ thông</option>
                        </select>
                    </div>
                    <div>
                        <div class="input-group">
                            <label for="size">NSX</label>
                            <select name="tenNSX">
                                <option>iPhone</option>
                                <option>Oppo</option>
                                <option>Nokia</option>
                                {/* <% AllNSX.forEach(function(AllNSX) { %>
                                <option value="<%= AllNSX.tenNSX %>">
                                    <%= AllNSX.tenNSX %>
                                </option>
                                <% }); %> */}
                            </select>
                            <span><a href="/tao-moi-NSX" method="get">Thêm</a></span>
                        </div>

                    </div>
                    <div>
                        <label for="">Số lượng thêm : </label>
                        <input type="text" name="soluong" />
                    </div>
                    <div>
                        <label for="">Giá tiền : </label>
                        <input type="text" name="giatien" />
                    </div>
                    <div>
                        <label for="">Dung lượng : </label>
                        <select name="dungluong" id="hall" value="3">
                            <option>32 GB</option>
                            <option>64 GB</option>
                            <option>128 GB</option>
                            <option>256 GB</option>
                            <option>512 GB</option>
                            <option>1 TB</option>
                        </select>
                    </div>

                    <div>
                        <label for="">RAM : </label>
                        <select name="ram" id="hall" value="3">
                            <option>1 GB</option>
                            <option>2 GB</option>
                            <option>4 GB</option>
                            <option>6 GB</option>
                            <option>8 GB</option>
                            <option>12 GB</option>
                        </select>
                    </div>

                    <div>
                        <label for="">Ghi chú : </label>
                        <input type="text" name="ghichu" />
                    </div>

                    <div>
                        <label for="">Avatar: </label>
                        <input type="file" name="profile_pic" />
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </fieldset>
            </form>
            <form method="POST" action="/upload-profile-pic" enctype="multipart/form-data"></form>
        </div>
    </body>

</html>
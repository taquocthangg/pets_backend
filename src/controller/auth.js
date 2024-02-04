import * as services from '../sevices'
export const getAllThuCung = async (req, res) => {
    try {
        const result = await services.getAllThuCung();
        if (result.err == 0) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json(result);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi sever", user: null })
    }
}
export const getAllDanhMuc = async (req, res) => {
    try {
        const response = await services.getAllDanhMuc();
        return res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ messsage: "Lỗi sever", Category: null })
    }
}

export const getDanhMuc = async (req, res) => {
    try {
        const response = await services.getDanhMuc();
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            err: -1,
            message: "Lỗi sever",
        })
    }
}
export const getCategoryThuCung = async (req, res) => {
    try {
        const idDanhMuc = req.params.idDanhMuc;
        const response = await services.getCategoryThuCung(idDanhMuc );
        return res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({
            err:-1,
            message: "Lỗi sever"
        })
    }
}


export const getAllNews = async (req, res) => {
    try {

        const response = await services.getAllNews();
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}

export const getNew = async (req, res) => {
    try {
        const idNew = req.params.idNew
        const response = await services.getNew({ idNew });
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const getAllOrder = async (req, res) => {
    try {
        const response = await services.getAllOrder();
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            mess: "Lỗi sever",
            Orders: null
        })
    }
}

export const getCart = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const response = await services.getCart(idUser);

        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            err: -1,
            mess: "Lỗi sever",
        })
    }
}
export const suaThuCung = async (req, res) => {
    try {
        const idThuCung = req.params.idThuCung;
        const { name, price, describe, species, id_category } = req.body;


        const response = await services.suaThuCung({ idThuCung, name, price, describe, species, id_category })
        return res.status(200).json(response)


    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const choThanhToanCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const response = await services.choThanhToanCart( idCart )
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const themThucung = async (req, res) => {
    try {

        const fileData = req.File;
        const avatar = fileData?.path;
        const { name, price, describe, species, id_category } = req.body

        if (!name || !price || !describe || !species || !id_category) return res.status(400).json(
            {
                err: 1,
                mess: "Điền thông tin đầy đủ"
            }
        )

        const response = await services.themThuCung({ name, price, describe, species, id_category })
        return res.status(200).json(response)


    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const insertCart = async (req, res) => {
    try {
        const idUser = req.params.idUser;

        const { idPet } = req.body
        const response = await services.insertCart({ idUser, idPet })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}


export const updateCart = async (req, res) => {
    try {
        const idCart = req.params.idCart;
        const { quantity, status } = req.body;

        const response = await services.updateCart({ idCart, quantity, status })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const themNews = async (req, res) => {
    try {
        const fileData = req.File;
        const avatar = fileData?.path;

        const { title, describe, author } = req.body;
        if (!title || !describe || !author) return res.status(400).json(
            {
                err: 1,
                mess: "Điền đầy đủ thông tin"
            }
        )
        const response = await services.themNews({ title, describe, author })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }

}
export const updateNews = async (req, res) => {
    try {
        const idNew = req.params.idNew;
        const { title, describe, author } = req.body;
        const response = await services.updateNews({ idNew, title, describe, author })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever "
        })
    }
}

export const updateOrder = async (req, res) => {
    try {
        const idOrder = req.params.idOrder;
        const { TenDonHang, idKhachHang, DiaChi, sdt } = req.body;
        const response = await services.updateOrder({ idOrder, TenDonHang, idKhachHang, DiaChi, sdt })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500)({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}
export const themDanhMuc = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json(
            {
                err: 1,
                mess: "Điền thông tin đầy đủ"
            }
        )
        const response = await services.themDanhMuc({ name });
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const xoaDanhMuc = async (req, res) => {
    try {
        const idDanhMuc = req.params.idDanhMuc;
        const response = await services.xoaDanhMuc({ idDanhMuc })
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}


export const deleteCart = async (req, res) => {
    try {
        const idCart = req.params.idCart
        const response = await services.deleteCart(idCart)
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const deleteNews = async (req, res) => {
    try {
        const idNew = req.params.idNew;
        const response = await services.deleteNews({ idNew })
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const suaDanhMuc = async (req, res) => {
    try {
        const idDanhMuc = req.params.idDanhMuc;
        const { name } = req.body;


        const response = await services.suaDanhMuc({ idDanhMuc, name })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
        })
    }
}

export const xoaThuCung = async (req, res) => {
    try {
        const idThuCung = req.params.idThuCung;
        const response = await services.xoaThuCung({ idThuCung })
        return res.status(200).json(response)


    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const idOrder = async (req, res) => {
    try {
        const idOrder = req.params.idOrder
        const response = await services.deleteOrder({ idOrder })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500), json({
            err: -1,
            mess: 'lỗi sever'
        })
    }
}
export const insertBill = async (req, res) => {
    try {
        const idThuCung = req.params.idThuCung;

        const { idNhanVien, soLuong, donGia, status } = req.body
        if (!idNhanVien || !soLuong || !donGia || !status) return res.status(400).json(
            {
                err: 1,
                mess: "Điền thông tin đầy đủ"
            }
        )
        // const {tenThuCung}
        const response = await services.insertBill({ idThuCung, idNhanVien, soLuong, donGia, status });
        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}

export const insertOrder = async (req, res) => {
    try {
        const idNhanVien = req.params.idNhanVien;
        const { TenDonHang, idKhachHang, DiaChi, sdt, total } = req.body
        if (!TenDonHang || !idKhachHang || !DiaChi || !sdt) return res.status(400).json(
            {
                err: 1,
                mess: 'Điền thông tin đầy đủ'
            }
        )
        const response = await services.insertOrder({ idNhanVien, TenDonHang, idKhachHang, DiaChi, sdt, total })
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}
export const insertPay = async (req, res) => {
    try {

    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}
export const getSearchBill = async (req, res) => {
    try {
        const { idNhanVien, soLuong, donGia, idThuCung, status, createdAt } = req.body

        const response = await services.getSearchBill({ idNhanVien, idThuCung, soLuong, donGia, status, createdAt })
        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: 'Lỗi sever'
        })
    }
}

export const getAllBill = async (req, res) => {
    try {
        const response = await services.getAllBill();
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            err: -1,
            mess: "Lỗi sever"
        })
    }
}

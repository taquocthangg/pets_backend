import db from '../models'
import Sequelize from 'sequelize'

export const getAllThuCung = (ofset, litmit, page, ...query) => new Promise(async (resolve, reject) => {
    // ofset, litmit, page => phân trang
    // ...query => sắp xếp , tìm kiếm
    const queries = { ...query }
    try {
        const pets = await db.Pet.findAndCountAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả thú cưng thành công',
            pets: pets ? pets : ''
        });
    } catch (errol) {
        reject(errol);
    }
})

export const getThuCung = ({ idThuCung }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Pet.findByPk(idThuCung)
        resolve({
            err: 0,
            mess: 'Lấy thông tin thú cưng thành công',
            pet: response ? response : ' '
        })
    } catch (e) {
        reject(e)
    }
})

export const getNew = ({ idNew }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.findByPk(idNew)
        // console.log(response)
        resolve({
            err: 0,
            mess: 'Lấy thông tin tin tức thành công',
            New: response ? response : 'Không tồn tại tin tức này'
        })
    } catch (e) {
        reject(e)
    }
})

export const getAllDanhMuc = () => new Promise(async (resolve, reject) => {
    try {
        const categorys = await db.Category.findAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả danh mục thành công',
            categorys: categorys ? categorys : ''
        })
    } catch (errol) {
        reject(errol);
    }
})

export const getDanhMuc = () => new Promise(async (resolve, reject) => {
    try {
        const categorys = await db.Category.findAndCountAll({
            where: {
            },
            limit: 3
        });
        resolve({
            err: 0,
            mess: 'Lấy danh mục thành công',
            category: categorys ? categorys : ''
        })
    } catch (e) {
        reject(e)
    }
})

export const getCart = (idUser) => new Promise(async (resolve, reject) => {
    try {
        const isChecked = await db.User.findByPk(idUser)
        if (isChecked) {
            const response = await db.Cart.findAndCountAll({
                where: {
                    idUser: `${idUser}`,
                    status: 'Chưa thanh toán'
                }

            });
            const idPet = response?.rows?.map(item => item?.dataValues?.idPet) // tạo ra một array lưu idPet
            const InfoPet = await db.Pet.findAll({
                where: {
                    id: idPet
                },
                attributes: ['id', 'name', 'price']
            })


            resolve({
                err: 0,
                mess: 'Lấy thông tin giỏ hàng thành công',
                Cart: response ? response : "Chưa có sản phẩm nào trong giỏ hàng này",
                Pets: InfoPet
            })
        }
        else {
            resolve({
                err: -1,
                mess: "Không tồn tại người dùng"
            })
        }

    } catch (e) {
        reject(e)
    }
})
export const getAllBill = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bill.findAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả các bill thành công',
            Bills: response ? response : ''
        })
    } catch (error) {
        reject(error)
    }
})

export const getAllNews = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.findAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả các tin tức thành công',
            News: response ? response : ''
        })
    } catch (e) {
        reject(e)
    }
})

export const getAllOrder = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order.findAll()
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả các đơn hàng thành công',
            Orders: response ? response : ''
        })
    } catch (e) {
        reject(e)
    }
})
export const themThuCung = ({ name, price, describe, species, id_category }) => new Promise(async (resolve, reject) => {
    try {
        const isChecked = await db.Category.findByPk(id_category)
        if (isChecked) {
            const response = await db.Pet.findOrCreate({
                where: { name, price, describe, species, id_category },
                defaults: {
                    name,
                    price,
                    describe,
                    species,
                    id_category
                }
            })
            resolve({
                err: response[1] ? 0 : 1,
                mess: response[1] ? "Thêm thú cưng thành công" : "Thú cưng đã tồn tại"
            })
        }
        else {
            resolve({
                err: -1,
                mess: 'Danh mục sản phẩm này không tồn tại'
            })
        }

    } catch (e) {
        reject(e);
    }
})


export const insertCart = ({ idUser, idPet }) => new Promise(async (resolve, reject) => {
    try {
        const isChecked = await db.Pet.findByPk(idPet)
        if (isChecked) {
            const response = await db.Cart.findOrCreate({
                where: {
                    idPet: `${idPet}`,
                    status: 'Chưa thanh toán'
                },
                defaults: {
                    idUser,
                    idPet,
                    quantity: 1,
                    status: 'Chưa thanh toán'
                }
            })
            resolve({
                err: response[1] ? 0 : 1,
                mess: response[1] ? "Thêm vào giỏ hàng thành công" : "Sản phẩm đã có trong giỏ hàng"
            })
        }
        else {
            resolve({
                err: 0,
                mess: "Không có thông tin thú cưng này "
            })
        }
    }
    catch (e) {
        reject(e)
    }
})


export const updateCart = ({ idCart, quantity, status }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Cart.update(
            {
                quantity,
                status
            },
            {
                where: {
                    id: idCart
                }
            }
        );
        resolve({
            err: 0,
            mess: response ? "Cập nhật thông tin giỏ hàng thành công" : "Không tìm thấy sản phẩm này"
        })
    } catch (e) {
        reject(e)
    }
})
export const suaThuCung = ({ idThuCung, name, price, describe, species, id_category }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Pet.update(
            {
                name,
                price,
                describe,
                species,
                id_category
            },
            {
                where: { id: idThuCung },
            }
        );

        resolve({
            err: response ? 0 : 1,
            mess: response ? "Sửa thông tin thú cưng thành công" : " "

        })
    } catch (e) {
        reject(e);
    }
})

export const suaDanhMuc = ({ idDanhMuc, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.update(
            {
                name
            },
            {

                where: { id: idDanhMuc },
            }
        );
        resolve({
            err: response[0] ? 0 : 1,
            mess: response[0] ? "Sửa thành công danh mục" : "Danh mục không tồn tại"
        })

    } catch (e) {
        reject(e);
    }
})

export const xoaThuCung = ({ idThuCung }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Pet.destroy({
            where: {
                id: idThuCung
            }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa thành công thú cưng" : "Thú cưng không tồn tại"

        })
    } catch (e) {
        reject(e);
    }
})
export const themDanhMuc = ({ name }) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.Category.findOrCreate({
            where: { name },
            defaults: {
                name,
            }
        })

        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? "Thêm thành công danh mục" : "Danh mục đã tồn tại"
        })
    } catch (e) {
        reject(e)
    }
})

export const themNews = ({ title, describe, author }) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.New.create({
            title,
            describe,
            author
        }, {
            timestamps: false
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Thêm tin tức thành công" : "Lỗi không thêm được tin tức"
        })

    } catch (e) {
        reject(e)
    }
})

export const updateNews = ({ idNew, title, describe, author }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.update({
            title,
            describe,
            author
        },
            {
                where: { id: idNew }
            })
        // console.log(response)
        resolve({
            err: response[0] ? 0 : 1,
            mess: response[0] ? "Sửa tin tức thành công" : "Tin tức này không tồn tại"
        })
    } catch (e) {
        reject(e);
    }
})

export const updateOrder = ({ idOrder, TenDonHang, idKhachHang, DiaChi, sdt }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bill.update({
            TenDonHang,
            idKhachHang,
            DiaChi,
            sdt
        },
            {
                where: { id: idOrder }
            })
        resolve({
            err: response[0] ? 0 : 1,
            mess: response[0] ? "Sửa thông tin đơn hàng thành công" : "Đơn hàng này không tồn tại"
        })
    } catch (e) {
        reject(e);
    }
})
export const deleteNews = ({ idNew }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.New.destroy({
            where: { id: idNew }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa tin tức thành công" : "Tin tức này không tồn tại"
        })
    } catch (e) {
        reject(e);
    }
})
export const xoaDanhMuc = ({ idDanhMuc }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.destroy({
            where: {
                id: idDanhMuc
            }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa thành công danh mục" : "Danh mục không tồn tại"
        })
    } catch (e) {
        reject(e)
    }
})

export const deleteOrder = ({ idOrder }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Order.destroy({
            where: { id: idOrder }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "Xóa đơn hàng" : "Tin tức này không tồn tại"
        })
    } catch (e) {
        reject(e);
    }
})

export const deleteCart = (idCart) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Cart.destroy({
            where: { id: idCart }
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? " Xóa sản phẩm ra giỏ hàng thành công" : "Sản phẩm này không tồn tại trong giỏ"
        })
    } catch (e) {
        reject(e)
    }
})
export const choThanhToanCart = (idCart) => new Promise(async (resolve, reject) => {
    try {
        const isChecked = await db.Cart.findByPk(idCart)
        if (isChecked) {
            const response = await db.Cart.update({
                status: 'Chờ thanh toán'
            },
                {
                    where: { id: idCart }
                })
            resolve({
                err: response ? 0 : 1,
                mess: response ? "Thay đổi trạng thái sang chờ thanh toán" : "Sản phẩm này không tồn tại trong giỏ hàng"
            })
        }
        else {
            resolve({
                err: -1,
                mess: 'Không tìm thấy id của giỏ hàng này'
            })
        }

    } catch (e) {
        reject(e)
    }
})
export const getCategoryThuCung = (idDanhMuc) => new Promise(async (resolve, reject) => {
    try {
        const isChecked = await db.Category.findByPk(idDanhMuc)
        if (isChecked) {
            const response = await db.Pet.findAndCountAll({
                where: {
                    id_category: idDanhMuc

                }
            })

            resolve({
                err: 0,
                mess: 'Lấy thông tin thú cưng thành công',
                response: response ? response : ''
            });
        }
        else {
            resolve({
                err: 0,
                mess: 'Không tìm thấy danh mục này '
            })
        }
    } catch (e) {
        reject(e)
    }
})

export const getSearchBill = ({ idNhanVien, idThuCung, soLuong, donGia, status, createdAt }) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.findAndCountAll({
            where: {
                idThuCung: { [Op.like]: `${idThuCung}` },
                idNhanVien: { [Op.like]: `${idNhanVien}` },
                soLuong: { [Op.like]: `${soLuong}` },
                donGia: { [Op.like]: `${donGia}` },
                status: { [Op.like]: `${status}` },
            }
        })
        resolve({
            err: 0,
            mess: 'Lấy thông tin hóa đơn thành công',
            Bills: response ? response : ''
        })
    } catch (e) {
        reject(e)
    }
})
export const insertOrder = ({ idNhanVien, TenDonHang, idKhachHang, DiaChi, sdt }) => new Promise(async (resolve, reject) => {
    try {
        const checkId = await db.Order.findByPk(idNhanVien);
        if (checkId === null) {
            resolve({
                err: -1,
                mess: 'Không tồn tài id khách hàng này'
            })
        }
        else {
            const response = await db.Order.create({
                idNhanVien,
                TenDonHang,
                idKhachHang,
                DiaChi,
                sdt,
                total,
            }, {
                timestamps: true,
            })
            resolve({
                err: response ? 0 : 1,
                mess: response ? "Tạo đơn hàng thành công" : " "

            })
        }
    } catch (e) {
        reject(e)
    }
})
export const insertBill = ({ idThuCung, idNhanVien, soLuong, donGia, status }) => new Promise(async (resolve, reject) => {
    try {

        const checkId = await db.Pet.findByPk(idThuCung);

        if (checkId === null) {
            resolve({
                err: -1,
                mess: "Không tồn tại id thú cưng này"
            })
        }
        else {
            const response = await db.Bill.create({
                idThuCung,
                idNhanVien,
                soLuong,
                donGia,
                status
            }, {
                timestamps: true,
            })

            resolve({
                err: response ? 0 : 1,
                mess: response ? "Tạo hóa đơn thành công" : "Cuộc đời quá thất bại"

            })
        }

    } catch (e) {
        reject(e)
    }
})
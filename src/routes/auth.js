import * as controller from '../controller'
import express from 'express'
const router = express.Router();

router.get('/getAllThuCung', controller.getAllThuCung);
router.get('/getThuCung/:idThuCung', controller.getThuCung);
router.get('/getCategoryThuCung/:idDanhMuc', controller.getCategoryThuCung);
router.get('/getAllDanhMuc', controller.getAllDanhMuc)
router.get('/getDanhMuc', controller.getDanhMuc)
router.get('/getAllBill', controller.getAllBill)
router.get('/getBill/:idBill', controller.getBill)
router.get('/getAllNews', controller.getAllNews)
router.get('/getNew/:idNew', controller.getNew)
router.get('/getAllOrder', controller.getAllOrder)
router.get('/getOrder/:idOrder', controller.getOrder)
router.get('/getCart/:idUser', controller.getCart)
router.post('/suaThuCung/:idThuCung', controller.suaThuCung);
router.post('/xoaThuCung/:idThuCung', controller.xoaThuCung);
router.post('/themThuCung', controller.themThucung);
router.post('/themDanhMuc', controller.themDanhMuc);
router.post('/xoaDanhMuc/:idDanhMuc', controller.xoaDanhMuc);
router.post('/suaDanhMuc/:idDanhMuc', controller.suaDanhMuc);
router.post('/themNews', controller.themNews);
router.post('/updateNews/:idNew', controller.updateNews)
router.post('/deleteNews/:idNew', controller.deleteNews);
router.post('/insertCart/:idUser', controller.insertCart);
router.post('/updateCart/:idCart', controller.updateCart);
router.post('/choThanhToanCart/:idCart', controller.choThanhToanCart);// Thêm một trạng thái là 'Chờ thanh toán'
router.delete('/deleteCart/:idCart', controller.deleteCart);
// lấy ra giỏ hàng 1 user


router.post('/insertBill/:idThuCung', controller.insertBill) // id khách hàng // trạng thái  // hóa đơn
router.post('/insertPay/:idNhanVien', controller.insertPay) // chưa hoàn thành
router.post('/insertOrder/:idNhanVien', controller.insertOrder) // đơn hàng thiếu trạn thái
router.post('/updateOrder/:idOrder', controller.updateOrder)
// router.post('/deleteOrder/:idOrder',controller.idOrder)
module.exports = router
// Doanh Thu (hoa don) // tim kiem

// Thong ke (doanh thu, hoa don, don hang) // thong ke
// trang thai don hang
// bao cao
// lấy thông tin hóa đơn theo trạng thái
// thanh thanh toán baokim vnpay paypal












//  20 rows


// ofset = 0 => lấy tất cả 20 rows
// ofset = 5 => bỏ qua 5 rows đầu tiên , lấy từ rows 5 -> rows 20
// limit = 3 && ofset = 5 => bỏ qua 5 rows đầu tiên , lấy từ rows 5 -> rows 8
// page = limit * ( ofset - 1 )
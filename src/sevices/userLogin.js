import db from '../models'
import Sequelize from 'sequelize'
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs'
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9))

// export const dangky = ({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, avatar }) => new Promise(async (resolve, reject) => {
//     try {
//         const response = await db.User.findOrCreate({
//             where: { email },
//             defaults: {
//                 name,
//                 email,
//                 password: hashPassword(password),
//                 gioiTinh,
//                 namSinh,
//                 sdt,
//                 diaChi,
//                 role_id,
//                 avatar
//             }
//         })
 
//         const token = response[1] ? jwt.sign({
//             id: response[0].id,
//             email: response[0].email,
//             role_id: response[0].role_id,
//         }, process.env.JWT_SECRET,
//             {
//                 expiresIn: '90d'
//             })
//             : null
//         resolve({
//             err: response[1] ? 0 : 1,
//             mess: response[1] ? 'Đăng kí thành công' : 'Tài khoản đã tồn tại',
//             'access_token': token ? `Bearer ${token}` : token
//         })
//     }
//     catch (e) {
//         reject(e)
//     }
// })

export const dangKi = ({ name, email, password, gioiTinh, sdt, diaChi, namSinh, role_id, avatar }) => new Promise(async (resolve, reject) => {
    // try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                name,
                email,
                password: hashPassword(password),
                gioiTinh,
                namSinh,
                sdt,
                diaChi,
                role_id,
                avatar
            }
        })
        console.log("hii"+process.env.JWT_SECRET);
        const token = response[1] ? jwt.sign({
            id: response[0].id,
            email: response[0].email,
            role_id: response[0].role_id,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '90d'
            })
            : null
        
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'Đăng kí thành công' : 'Tài khoản đã tồn tại',
            'access_token': token ?  token : token
            // ,
            // 'access_token': token ? `Bearer ${token}` : token
        })
    // }
    // catch (e) {
    //     reject(e)
    // }
})
export const dangNhap = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        // console.log(email, password)
        const response = await db.User.findOne({ // check table
            where: { email },
            raw: true,
        })

        const isChecked = response && bcrypt.compareSync(password, response.password)
  
        const token = isChecked ? jwt.sign({
            id: response.id,
            email: response.email,
            role_id: response.role_id,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '90d'
            })
            : null
        resolve({
            err: token ? 0 : 1,
            mess: token ? 'Đăng nhập thành công' : response ? 'Mật khẩu sai' : 'Tài khoản chưa được đăng kí',
            'access_token': token ? `${token}` : token
        })
    }
    catch (e) {
        reject(e)
    }
})

// export const forgotPassword = ({ email }) => new Promise(async (resolve, reject) => {
//     const {email}= req.body;
//     try {
//         const response = await db.User.update({ password: "oke" }, {
//             where: {
//                 email
//             },
//         });

//         resolve({
//             err: response[1] ? 0 : 1,
//             mess: response[1] ? 'Mật khẩu đã được cấp lại là "oke" ' : 'Tài khoản không tồn tại!'
//         })
//     }
//     catch (e) {
//         reject(e)
//     }
// })

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'quocthangforwork@gmail.com',
        pass: 'gtovgcshoqnolyao',
    },
});
export const forgotPassword = async (email)=>{
    const token= crypto.randomBytes(20).toString('hex')// tạo ra một token ngẫu nhiên và biến thành chuỗi hexadecimal
    const user=await db.User.findOne({where:{email:email}})
 
    let errorMessage= null;
    if(user){
     
        user.resetToken=token;
        user.resetTokenExpiry= Date.now() + 900000
        await user.save();
        const resetLink = process.env.URL_SERVER + `/api/v1/user/reset-password/${token}`;
        const mailOptions={
            from:'shopThuCung@gmail.com',
            to:email,
            subject:'Đặt lại mật khẩu',
            html:`Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. ${resetLink}`
        }
        await transporter.sendMail(mailOptions)
    }
    else{
        throw errorMessage = 'Người dùng không tồn tại'
    }
    return errorMessage
}

export const getAllUser = () => new Promise(async (resolve, reject) => {
    try {
        const Users = await db.User.findAll();
        resolve({
            err: 0,
            mess: "Lấy thông tin tất cả người dùng thành công",
            users: Users ? Users : ''
        })
        const categorys = await db.Category.findAll();
        resolve({
            err: 0,
            mess: 'Lấy thông tin tất cả danh mục thành công',
            categorys: categorys ? categorys : ''
        })
    } catch (e) {
        reject(e)
    }
})


export const getUser = ({idUser})=> new Promise (async (resolve,reject)=>{
    try{
        const response = await db.User.findByPk(idUser);
        resolve({
            err:0,
            mess:'Lấy thông tin người dùng thành công',
            User: response? response :'Không có thông tin người dùng'
        })
    }catch(e){
        reject(e)
    }
})

export const getOrder = ({idOrder}) =>new Promise (async (resolve,reject)=>{
    try{
        const response =await db.Bill.findByPk(idOrder)
        resolve({
            err:0,
            mess:'Lấy thông tin đơn hàng thành công',
            Order:response ? response:'Không có thông tin đơn hàng'
        })
    }catch(e){
        reject(e)
    }
})

export const getBill =({idBill}) =>new Promise (async (resolve,reject)=>{
    try{
        const response =await db.Bill.findByPk(idBill);
        resolve({
            err:0,
            mess:'Lấy thông tin hóa đơn thành công',
            Bill: response ? response :'Không có hóa đơn này'
        })
    }catch(e){
        reject(e)
    }
})
export const getAllCustomer = () => new Promise(async (resolve, reject) => {
    try {
      
        const response = await db.User.findAndCountAll({
            where: {
                role_id: "R3"
            },
        })
        console.log('hihi')
        resolve({
            err: 0,
            mess: 'Lấy thông tin khách hàng thành công',
            Users: response ? response : " "
        })
    } catch (e) {
        reject(e);
    }
})

export const getAllEmployee = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAndCountAll({
            where: {
                role_id: "R2"
            },

        })
        resolve({
            err: 0,
            mess: "Lấy thông tin nhân viên thành công",
            User: response ? response : " "
        })
    } catch (e) {
        reject(e);
    }
})
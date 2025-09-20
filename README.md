# Supplier & Product CRUD App

## 📌 Giới thiệu
Dự án xây dựng website CRUD quản lý **Nhà cung cấp (Supplier)** và **Sản phẩm (Product)**.  
Ứng dụng được phát triển bằng **Node.js, Express, MongoDB, Mongoose**, theo mô hình **MVC**, sử dụng **EJS + Bootstrap** cho view.  

## 🚀 Chức năng
- Quản lý **Nhà cung cấp**: thêm, sửa, xóa, xem danh sách.
- Quản lý **Sản phẩm**: thêm, sửa, xóa, xem danh sách, liên kết với nhà cung cấp.
- Cấu hình `.env` để quản lý thông tin môi trường.
- Swagger UI để mô tả và test các RESTful APIs.
- Sử dụng `.gitignore` để tránh commit `node_modules` và `.env`.

## ⚙️ Công nghệ sử dụng
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [Bootstrap](https://getbootstrap.com/)
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)
- [dotenv](https://www.npmjs.com/package/dotenv)

## 📂 Cấu trúc thư mục
```
├── app.js
├── controllers/
│ ├── productController.js
│ └── supplierController.js
├── models/
│ ├── Product.js
│ └── Supplier.js
├── routes/
│ ├── productRoutes.js
│ └── supplierRoutes.js
├── views/
│ ├── partials/
│ ├── products/
│ └── suppliers/
├── public/
├── .env
├── .gitignore
├── package.json
└── README.md
```
## 🔑 Cấu hình môi trường
Tạo file `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lab5db

# Cài dependencies
npm install

# Chạy app
npm start

Mở trình duyệt: http://localhost:5000

📖 Swagger API Docs

Swagger UI được cấu hình tại:
👉 http://localhost:5000/api-docs

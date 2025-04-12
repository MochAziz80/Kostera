# Kostera 🏠

**Kostera** adalah aplikasi manajemen kos berbasis web yang membantu pemilik atau pengelola kost untuk mengelola data kamar, penyewa, dan pembayaran secara efisien.

---

## 🔧 Teknologi yang Digunakan

- **Frontend**: React.js + Tailwind CSS  
- **Backend**: Node.js + Express.js  
- **Database**: MariaDB  
- **ORM**: Sequelize

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/MochAziz80/Kostera.git
cd Kostera/backend
```

### 2. Install Dependency
```bash
npm install
```

### 3. Konfigurasi Database
Edit file **config/config.json** sesuai kredensial MariaDB kamu:
```bash
{
  "development": {
    "username": "root",
    "password": "",
    "database": "kostera_dev",
    "host": "127.0.0.1",
    "dialect": "mariadb"
  }
}
```
### 4. Jalankan Migrasi dan Seeder
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

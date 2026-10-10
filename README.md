# Library Loans API

**Nama:** ANINDYA FAIRUZ AZ ZAHRA

## Deskripsi

Library Loans API adalah REST API sederhana untuk mengelola data peminjaman buku perpustakaan. API ini dibuat menggunakan Node.js, Express.js, dan Supabase sebagai database.

Fitur yang tersedia meliputi:
- Melihat seluruh data peminjaman buku.
- Melihat detail peminjaman berdasarkan ID.
- Menambahkan data peminjaman.
- Memperbarui data peminjaman.
- Menghapus data peminjaman.
- Memfilter data berdasarkan status peminjaman.

## Teknologi

- Node.js
- Express.js
- Supabase
- JavaScript (ES Modules)

## Persyaratan

Pastikan Node.js dan npm sudah terpasang.

## Instalasi dan Menjalankan Proyek

1. Clone repositori:

   ```bash
   git clone <URL_REPOSITORI_GITHUB>
   ```

2. Masuk ke folder proyek:

   ```bash
   cd library-loans-api
   ```

3. Instal dependensi:

   ```bash
   npm install
   ```

4. Buat file `.env` di folder utama proyek dan isi dengan konfigurasi Supabase:

   ```env
   SUPABASE_URL=URL_PROYEK_SUPABASE
   SUPABASE_KEY=SUPABASE_PUBLISHABLE_KEY
   PORT=3000
   ```

   Ganti nilai tersebut dengan konfigurasi proyek Supabase milik sendiri. Jangan mengunggah file `.env` ke GitHub.

5. Jalankan server lokal:

   ```bash
   npm run dev
   ```

6. Buka `http://localhost:3000` untuk memeriksa apakah API berjalan.

## Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/` | Memeriksa API dan melihat daftar endpoint |
| GET | `/loans` | Mengambil seluruh data peminjaman |
| GET | `/loans/:id` | Mengambil data berdasarkan ID |
| POST | `/loans` | Menambahkan data peminjaman |
| PUT | `/loans/:id` | Memperbarui data peminjaman |
| DELETE | `/loans/:id` | Menghapus data peminjaman |

### Filter berdasarkan Status

Gunakan query parameter `status` pada endpoint GET:

```http
GET /loans?status=Dipinjam
GET /loans?status=Dikembalikan
GET /loans?status=Terlambat
```

Status yang tersedia:
- `Dipinjam`
- `Dikembalikan`
- `Terlambat`

## Contoh Penggunaan

### 1. Menambahkan Peminjaman

**Request:**

```http
POST /loans
Content-Type: application/json
```

**Body:**

```json
{
  "nama_peminjam": "ANINDYA FAIRUZ AZ ZAHRA",
  "judul_buku": "Belajar Node.js",
  "tanggal_pinjam": "2026-10-10",
  "tanggal_jatuh_tempo": "2026-10-20",
  "status": "Dipinjam"
}
```

`tanggal_pinjam` dapat dihilangkan karena database memiliki nilai default. Gunakan tanggal yang sesuai saat melakukan pengujian.

### 2. Memperbarui Peminjaman

**Request:**

```http
PUT /loans/ID_PEMINJAMAN
Content-Type: application/json
```

**Body:**

```json
{
  "status": "Dikembalikan",
  "tanggal_kembali": "2026-10-15"
}
```

Ganti `ID_PEMINJAMAN` dengan ID data yang benar-benar ada di database.

### 3. Menghapus Peminjaman

```http
DELETE /loans/ID_PEMINJAMAN
```

Ganti `ID_PEMINJAMAN` dengan ID data yang ingin dihapus.

## Database

Database menggunakan tabel `loans` pada Supabase dengan informasi utama:
- `id`
- `nama_peminjam`
- `judul_buku`
- `tanggal_pinjam`
- `tanggal_jatuh_tempo`
- `tanggal_kembali`
- `status`
- `created_at`

## Deployment

URL API yang telah dideploy ke Vercel:

`https://library-loans-api-six.vercel.app/`

## Catatan Keamanan

API ini dibuat untuk kebutuhan pembelajaran dan pengujian menggunakan data contoh. Endpoint saat ini belum menggunakan autentikasi, sehingga akses publik dapat memungkinkan orang lain membaca, menambahkan, mengubah, atau menghapus data. Jangan gunakan data pribadi atau data sensitif.

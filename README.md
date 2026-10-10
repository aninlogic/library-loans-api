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
   git clone https://github.com/aninlogic/library-loans-api
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

### 1. Menambahkan Peminjaman (POST /loans)

**Body:**
```json
{
  "nama_peminjam": "Budi",
  "judul_buku": "Belajar Node.js",
  "tanggal_jatuh_tempo": "2026-10-20",
  "status": "Dipinjam"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil ditambahkan.",
  "data": {
    "id": "9a22dc53-8c99-49da-805f-6357a15b45f5",
    "nama_peminjam": "Budi",
    "judul_buku": "Belajar Node.js",
    "tanggal_pinjam": "2026-10-10",
    "tanggal_jatuh_tempo": "2026-10-20",
    "tanggal_kembali": null,
    "status": "Dipinjam",
    "created_at": "2026-10-10T10:34:01.935921+00:00"
  }
}
```

### 2. Mengambil Semua Data (GET /loans)

**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "9a22dc53-8c99-49da-805f-6357a15b45f5",
      "nama_peminjam": "Budi",
      "judul_buku": "Belajar Node.js",
      "tanggal_pinjam": "2026-10-10",
      "tanggal_jatuh_tempo": "2026-10-20",
      "tanggal_kembali": null,
      "status": "Dipinjam",
      "created_at": "2026-10-10T10:34:01.935921+00:00"
    }
  ]
}
```

### 3. Memperbarui Peminjaman (PUT /loans/:id)

**Body:**
```json
{
  "status": "Dikembalikan",
  "tanggal_kembali": "2026-10-15"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil diperbarui.",
  "data": {
    "id": "9a22dc53-8c99-49da-805f-6357a15b45f5",
    "nama_peminjam": "Budi",
    "judul_buku": "Belajar Node.js",
    "tanggal_pinjam": "2026-10-10",
    "tanggal_jatuh_tempo": "2026-10-20",
    "tanggal_kembali": "2026-10-15",
    "status": "Dikembalikan",
    "created_at": "2026-10-10T10:34:01.935921+00:00"
  }
}
```

### 4. Menghapus Peminjaman (DELETE /loans/:id)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data peminjaman berhasil dihapus.",
  "data": { "id": "9a22dc53-8c99-49da-805f-6357a15b45f5", "...": "..." }
}
```

### 5. Data Tidak Ditemukan (GET /loans/:id)

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Data peminjaman tidak ditemukan."
}
```

### 6. ID Tidak Valid (PUT /loans/:id)

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Gagal memperbarui data peminjaman.",
  "error": "invalid input syntax for type uuid: \"ID_KAMU\""
}
```

## Database

Database menggunakan tabel `loans` pada Supabase (PostgreSQL) dengan struktur berikut:

| Kolom | Tipe | Default | Wajib diisi | Keterangan |
|---|---|---|---|---|
| id | uuid | `gen_random_uuid()` | Otomatis | Primary key |
| nama_peminjam | text | - | Ya | Nama anggota peminjam |
| judul_buku | text | - | Ya | Judul buku yang dipinjam |
| tanggal_pinjam | date | `CURRENT_DATE` | Tidak | Terisi tanggal hari ini jika tidak dikirim |
| tanggal_jatuh_tempo | date | - | Ya | Batas pengembalian |
| tanggal_kembali | date | - | Tidak (boleh null) | Null jika buku belum dikembalikan |
| status | text | `'Dipinjam'` | Tidak | Dipinjam / Dikembalikan / Terlambat |
| created_at | timestamp with time zone | `now()` | Otomatis | Waktu data dibuat |

Saat `POST /loans`, field yang wajib dikirim hanya `nama_peminjam`, `judul_buku`, dan `tanggal_jatuh_tempo`. Field lain punya default atau boleh kosong.

## Deployment

URL API yang telah dideploy ke Vercel:

`https://library-loans-api-six.vercel.app/`

## Catatan Keamanan

API ini dibuat untuk kebutuhan pembelajaran dan pengujian menggunakan data contoh. Endpoint saat ini belum menggunakan autentikasi, sehingga akses publik dapat memungkinkan orang lain membaca, menambahkan, mengubah, atau menghapus data. Jangan gunakan data pribadi atau data sensitif.

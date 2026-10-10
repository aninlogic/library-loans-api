import {
  getAllLoans,
  getLoanById as findLoanById,
  createLoan as insertLoan,
  updateLoan as editLoan,
  deleteLoan as removeLoan,
} from '../models/loanModel.js';

const VALID_STATUSES = ['Dipinjam', 'Dikembalikan', 'Terlambat'];

const ALLOWED_FIELDS = [
  'nama_peminjam',
  'judul_buku',
  'tanggal_pinjam',
  'tanggal_jatuh_tempo',
  'tanggal_kembali',
  'status',
];

export async function getLoans(req, res) {
  try {
    const { status } = req.query;

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid.',
        valid_statuses: VALID_STATUSES,
      });
    }

    const { data, error } = await getAllLoans(status);

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data peminjaman.',
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}

export async function getLoan(req, res) {
  try {
    const { data, error } = await findLoanById(req.params.id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data peminjaman.',
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Data peminjaman tidak ditemukan.',
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}

export async function createLoan(req, res) {
  try {
    const {
      nama_peminjam,
      judul_buku,
      tanggal_pinjam,
      tanggal_jatuh_tempo,
      tanggal_kembali,
      status,
    } = req.body;

    if (!nama_peminjam || !judul_buku || !tanggal_jatuh_tempo) {
      return res.status(400).json({
        success: false,
        message:
          'nama_peminjam, judul_buku, dan tanggal_jatuh_tempo wajib diisi.',
      });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid.',
        valid_statuses: VALID_STATUSES,
      });
    }

    const loanData = {
      nama_peminjam,
      judul_buku,
      tanggal_jatuh_tempo,
    };

    if (tanggal_pinjam !== undefined) {
      loanData.tanggal_pinjam = tanggal_pinjam;
    }

    if (tanggal_kembali !== undefined) {
      loanData.tanggal_kembali = tanggal_kembali;
    }

    if (status !== undefined) {
      loanData.status = status;
    }

    const { data, error } = await insertLoan(loanData);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Gagal menambahkan data peminjaman.',
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Data peminjaman berhasil ditambahkan.',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}

export async function updateLoan(req, res) {
  try {
    const loanData = {};

    for (const field of ALLOWED_FIELDS) {
      if (req.body[field] !== undefined) {
        loanData[field] = req.body[field];
      }
    }

    if (Object.keys(loanData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Isi setidaknya satu field yang ingin diperbarui.',
      });
    }

    if (
      loanData.status !== undefined &&
      !VALID_STATUSES.includes(loanData.status)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid.',
        valid_statuses: VALID_STATUSES,
      });
    }

    const { data, error } = await editLoan(req.params.id, loanData);

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Data peminjaman tidak ditemukan.',
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Gagal memperbarui data peminjaman.',
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data peminjaman berhasil diperbarui.',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}

export async function deleteLoan(req, res) {
  try {
    const { data, error } = await removeLoan(req.params.id);

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Data peminjaman tidak ditemukan.',
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Gagal menghapus data peminjaman.',
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data peminjaman berhasil dihapus.',
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}
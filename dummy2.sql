-- Admins
INSERT INTO admins (id, password, phone, name, email) VALUES
  (4, 'admin012', '083456789012', 'Admin Keempat', 'admin4@okelaundry.com'),
  (5, 'admin345', '084567890123', 'Admin Kelima', 'admin5@okelaundry.com'),
  (6, 'admin789', '082345678901', 'Admin Ketiga', 'admin3@okelaundry.com');

-- Clothes
INSERT INTO clothes (id, id_transaction, type, qty, price, total) VALUES
  (4, 2, 'Kaos', 1, 12000, 12000),
  (5, 3, 'Rok', 2, 18000, 36000),
  (6, 3, 'Blouse', 1, 22000, 22000);

-- Customer Reports
INSERT INTO customer_reports (id, id_user, title, `desc`, report_date, trans_date, status) VALUES
  (3, 1, 'Kerusakan Pakaian', 'Salah satu pakaian saya rusak setelah dicuci.', '2023-05-05', '2023-05-02', 'Selesai'),
  (4, 2, 'Keterlambatan Pengembalian', 'Pakaian saya terlambat dikembalikan selama 1 hari.', '2023-05-07', '2023-05-04', 'Menunggu'),
  (5, 1, 'Kehilangan Barang', 'Saya kehilangan satu pakaian setelah laundry.', '2023-05-10', '2023-05-07', 'Selesai');

-- Managers
INSERT INTO managers (id, password, phone, name, email) VALUES
  (3, 'manager789', '087890123456', 'Manager Ketiga', 'manager3@okelaundry.com'),
  (4, 'manager012', '088901234567', 'Manager Keempat', 'manager4@okelaundry.com'),
  (5, 'manager345', '089012345678', 'Manager Kelima', 'manager5@okelaundry.com');

-- Monthly Reports
INSERT INTO monthly_reports (id, income, date) VALUES
  (3, 7000000, '2023-06-01'),
  (4, 8000000, '2023-07-01'),
  (5, 9000000, '2023-08-01');

-- Transactions
INSERT INTO transactions (id, id_user, id_monthly_report, date, total_price, status) VALUES
  (4, 1, 3, '2023-06-01', 30000, 'Selesai'),
  (5, 2, 3, '2023-06-05', 48000, 'Selesai'),
  (6, 1, 4, '2023-07-03', 40000, 'Menunggu');

-- Users
INSERT INTO users (id, password, phone, name, email) VALUES
  (3, 'user789', '082345678901', 'Pengguna Ketiga', 'user3@example.com'),
  (4, 'user012', '083456789012', 'Pengguna Keempat', 'user4@example.com'),
  (5, 'user345', '084567890123', 'Pengguna Kelima', 'user5@example.com');

  -- Transactions
INSERT INTO transactions (id, id_user, id_monthly_report, date, total_price, status) VALUES
  (7, 1, 3, '2023-06-03', 45000, 'Selesai'),
  (8, 2, 3, '2023-06-07', 55000, 'Selesai'),
  (9, 1, 4, '2023-07-05', 35000, 'Menunggu'),
  (10, 2, 4, '2023-07-10', 50000, 'Selesai'),
  (11, 1, 5, '2023-08-02', 42000, 'Menunggu'),
  (12, 2, 5, '2023-08-05', 60000, 'Selesai'),
  (13, 3, 3, '2023-06-09', 65000, 'Selesai'),
  (14, 3, 4, '2023-07-12', 72000, 'Selesai'),
  (15, 4, 5, '2023-08-08', 58000, 'Menunggu'),
  (16, 4, 3, '2023-06-11', 48000, 'Selesai');

-- Clothes
INSERT INTO clothes (id, id_transaction, type, qty, price, total) VALUES
  (7, 7, 'Dress', 2, 20000, 40000),
  (8, 7, 'Celana Panjang', 1, 15000, 15000),
  (9, 8, 'Kemeja', 3, 12000, 36000),
  (10, 8, 'Celana Pendek', 1, 10000, 10000),
  (11, 9, 'Sweater', 2, 18000, 36000),
  (12, 10, 'Jaket', 2, 22000, 44000),
  (13, 10, 'Pakaian Dalam', 3, 6000, 18000),
  (14, 11, 'Setelan', 1, 30000, 30000),
  (15, 11, 'Kaus', 2, 8000, 16000),
  (16, 12, 'Gaun', 2, 25000, 50000),
  (17, 12, 'Baju Tidur', 1, 15000, 15000),
  (18, 13, 'Stelan Jas', 2, 30000, 60000),
  (19, 13, 'Kemeja Formal', 1, 18000, 18000),
  (20, 14, 'Blouse', 3, 20000, 60000),
  (21, 14, 'Rok', 1, 15000, 15000),
  (22, 15, 'Kaos', 2, 12000, 24000),
  (23, 15, 'Celana Panjang', 2, 17000, 34000),
  (24, 16, 'Kemeja', 2, 14000, 28000),
  (25, 16, 'Celana Pendek', 1, 12000, 12000),
  (26, 16, 'Pakaian Dalam', 2, 4000, 8000);
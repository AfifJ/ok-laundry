-- Active: 1717089160380@@127.0.0.1@3306@okelaundry
-- Membuat database
CREATE DATABASE okelaundry;

USE okelaundry;

-- Membuat tabel
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE clothes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_transaction INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    qty INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_transaction) REFERENCES transactions (id)
);

CREATE TABLE customer_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    desc TEXT NOT NULL,
    report_date DATE NOT NULL,
    trans_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE managers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE monthly_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    income DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_monthly_report INT NOT NULL,
    date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users (id),
    FOREIGN KEY (id_monthly_report) REFERENCES monthly_reports (id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Memasukkan data dummy
INSERT INTO
    admins (password, phone, name, email)
VALUES (
        'admin123',
        '081234567890',
        'Admin Utama',
        'admin@okelaundry.com'
    ),
    (
        'admin456',
        '089876543210',
        'Admin Kedua',
        'admin2@okelaundry.com'
    );

INSERT INTO
    clothes (
        id_transaction,
        type,
        qty,
        price,
        total
    )
VALUES (1, 'Kemeja', 2, 10000, 20000),
    (1, 'Celana', 1, 15000, 15000),
    (2, 'Jaket', 3, 20000, 60000);

INSERT INTO
    customer_reports (
        id_user,
        title,
        `desc`,
        report_date,
        trans_date,
        status
    )
VALUES (
        1,
        'Keterlambatan Pengambilan',
        'Pakaian saya terlambat diambil selama 2 hari.',
        '2023-05-01 00:00:00',
        '2023-04-28 00:00:00',
        'Menunggu'
    ),
    (
        2,
        'Pakaian Hilang',
        'Satu celana saya hilang setelah laundry.',
        '2023-05-03 00:00:00',
        '2023-04-30 00:00:00',
        'Selesai'
    );

INSERT INTO
    managers (password, phone, name, email)
VALUES (
        'manager123',
        '087654321012',
        'Manager Utama',
        'manager@okelaundry.com'
    ),
    (
        'manager456',
        '085432109876',
        'Manager Kedua',
        'manager2@okelaundry.com'
    );

INSERT INTO
    monthly_reports (income, date)
VALUES (5000000, '2023-04-01'),
    (6000000, '2023-05-01');

INSERT INTO
    transactions (
        id_user,
        id_monthly_report,
        date,
        total_price,
        status
    )
VALUES (
        1,
        1,
        '2023-04-28',
        35000,
        'Selesai'
    ),
    (
        2,
        1,
        '2023-04-30',
        60000,
        'Selesai'
    ),
    (
        1,
        2,
        '2023-05-03',
        25000,
        'Menunggu'
    );

INSERT INTO
    users (password, phone, name, email)
VALUES (
        'user123',
        '081234567890',
        'Pengguna Pertama',
        'user1@example.com'
    ),
    (
        'user456',
        '089876543210',
        'Pengguna Kedua',
        'user2@example.com'
    );

/* 
-- buat query untuk menampilkan list data transaksi
SELECT
t.id,
t.date,
t.total_price,
t.status,
u.name AS user_name,
u.email AS user_email,
GROUP_CONCAT (c.type SEPARATOR ', ') AS item
FROM transactions t
JOIN users u ON t.id_user = u.id
JOIN clothes c ON t.id = c.id_transaction
GROUP BY t.id */
SELECT
    t.id,
    CONCAT(
        DAY(t.date),
        ' ',
        CASE MONTH(t.date)
            WHEN 1 THEN 'Januari'
            WHEN 2 THEN 'Februari'
            WHEN 3 THEN 'Maret'
            WHEN 4 THEN 'April'
            WHEN 5 THEN 'Mei'
            WHEN 6 THEN 'Juni'
            WHEN 7 THEN 'Juli'
            WHEN 8 THEN 'Agustus'
            WHEN 9 THEN 'September'
            WHEN 10 THEN 'Oktober'
            WHEN 11 THEN 'November'
            WHEN 12 THEN 'Desember'
        END,
        ' ',
        YEAR(t.date)
    ) AS date,
    t.total_price,
    t.status,
    u.name AS user_name,
    u.email AS user_email,
    GROUP_CONCAT(
        CONCAT(c.type, " ", c.qty) SEPARATOR ', '
    ) AS items
FROM
    transactions t
    JOIN users u ON t.id_user = u.id
    JOIN clothes c ON t.id = c.id_transaction
GROUP BY
    t.id
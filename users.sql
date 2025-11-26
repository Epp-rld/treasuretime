-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2025 at 02:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `treasuretime_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `tokens` int(11) NOT NULL DEFAULT 10,
  `tokens_earned` int(11) DEFAULT 0,
  `tokens_spent` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_estonian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `tokens`, `tokens_earned`, `tokens_spent`) VALUES
(57, 'Testkasutaja', 'test@test.ee', '$2y$10$SpwK.W7D4U8w5LAeEAsWj.XjVHZP20RnLa/VZLNQEDQCBQ1opB0uu', 10, 8, 8),
(58, 'Testike123', 'uustestikas12@test.ee', '$2y$10$IpToc667fsLI0BioeedEjuk7zyhDOGySeJ3YsN7YF2fnrGTMrPwRu', 8, 2, 4),
(61, 'Testike', 'testikas12@test.ee', '$2y$10$ynnrjE37qSOS72VvqzhYXOQrhGKhND9JXtx/s62xhjtY/gkeQ26fG', 10, 0, 0),
(62, 'Testike1234', 'testikas1234@test.ee', '$2y$10$N7gSYvyRBEjt4sLvmVpXA.WSz.M87uyG7TZWelMkbBlAjCHTyNEKK', 10, 0, 0),
(63, 'Testike12345', 'testikas12345@test.ee', '$2y$10$MNHYLjpMmF4TumFMMJ7tSunnTwi.vpQpZ0Oq3oK7ZbkaG28ZEvi.m', 10, 0, 0),
(64, 'Testike123456', 'testikas123456@test.ee', '$2y$10$jlZw5KTH5yIz5KkCLmn3JO98hEBG8eG3JtjyK.6/dHJIVDIKFLsii', 10, 0, 0),
(65, 'EppJaKerstin', 'eppjakerstin@test.ee', '$2y$10$Zs2Mt.3DY9E5/HRzZCRV8ufOMZ2RsaHVl5q/47.1hMSmwLb8vDZHW', 13, 3, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

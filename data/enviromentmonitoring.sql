-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2016 at 01:30 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enviromentmonitoring`
--

-- --------------------------------------------------------

--
-- Table structure for table `devicetbl`
--

CREATE TABLE `devicetbl` (
  `id` int(11) NOT NULL,
  `id_endpoint` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `unit` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `minthreshold` double DEFAULT '0',
  `maxthreshold` double DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `endpointtbl`
--

CREATE TABLE `endpointtbl` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `address` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `endpointtbl`
--

INSERT INTO `endpointtbl` (`id`, `name`, `description`, `address`, `id_user`) VALUES
(1, 'Ho1', 'Ho1', 'dia chi', 1),
(2, 'Ho2', 'Ho2', 'Ho2', 1);

-- --------------------------------------------------------

--
-- Table structure for table `roletbl`
--

CREATE TABLE `roletbl` (
  `id` int(11) NOT NULL,
  `role` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'User',
  `description` varchar(20) COLLATE utf8_unicode_ci DEFAULT 'Người dùng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roletbl`
--

INSERT INTO `roletbl` (`id`, `role`, `description`) VALUES
(1, 'Admin', 'Quản trị viên'),
(2, 'User', 'Người dùng');

-- --------------------------------------------------------

--
-- Table structure for table `userstbl`
--

CREATE TABLE `userstbl` (
  `IdUser` int(11) NOT NULL,
  `FirstName` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'noname',
  `LastName` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `Username` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `userstbl`
--

INSERT INTO `userstbl` (`IdUser`, `FirstName`, `LastName`, `Username`, `Password`, `id_role`) VALUES
(1, 'Khoa', 'Nguyen Dang', 'ndkhoa220982', 'C58882A88DB41CE9C8613625CE51E9C79459DE346D181A25D65E9B5FD30FB004DE6C618512DF650867F9FA3E6D0E387FC975F5E38A6755F48DF6A60796C47219', 1),
(2, 'Anh Quoc', 'Tran', 'anhquoctran', '4D08C715F44976DC8B7F73715B5853D03BFC4AC80DEAEDBCBA29B6F37FE778E1B8E0FEAA82A9A859A0BAA59C92C31522D2695A2B11FB03DE7905680F697DAC5D', 2);

-- --------------------------------------------------------

--
-- Table structure for table `valuetbl`
--

CREATE TABLE `valuetbl` (
  `id` int(11) NOT NULL,
  `id_device` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `value` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `devicetbl`
--
ALTER TABLE `devicetbl`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `endpointtbl`
--
ALTER TABLE `endpointtbl`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `roletbl`
--
ALTER TABLE `roletbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userstbl`
--
ALTER TABLE `userstbl`
  ADD PRIMARY KEY (`IdUser`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `valuetbl`
--
ALTER TABLE `valuetbl`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `devicetbl`
--
ALTER TABLE `devicetbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `endpointtbl`
--
ALTER TABLE `endpointtbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `roletbl`
--
ALTER TABLE `roletbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `userstbl`
--
ALTER TABLE `userstbl`
  MODIFY `IdUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

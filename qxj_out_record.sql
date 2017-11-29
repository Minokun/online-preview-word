/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 100119
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 100119
File Encoding         : 65001

Date: 2017-11-29 15:54:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for qxj_out_record
-- ----------------------------
DROP TABLE IF EXISTS `qxj_out_record`;
CREATE TABLE `qxj_out_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `record_date` datetime DEFAULT NULL,
  `out_time` datetime DEFAULT NULL,
  `back_time` datetime DEFAULT NULL,
  `car` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `remark` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

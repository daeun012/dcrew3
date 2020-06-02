/* 

CREATE TABLE `admins` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(30) NOT NULL UNIQUE,
    `password` VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE `boards` (
    `board_id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `contents` text NOT NULL,
    `date` DATE NOT NULL ,
    `view_cnt` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`board_id`)
); 


CREATE TABLE `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT, // 회원 고유 값
    `admin` VARCHAR(5) NOT NULL, // 회원이 관리자인지 구분
    `id` VARCHAR(30) NOT NULL,
    `password` VARCHAR(100) NOT NULL ,
    `name` VARCHAR(20) NOT NULL DEFAULT 0,
    `nickname` VARCHAR(20) NOT NULL DEFAULT 0,
    `email` VARCHAR(40) NOT NULL DEFAULT 0,
    `join_date` DATE NOT NULL,
    PRIMARY KEY (`user_id`)
); 



*/

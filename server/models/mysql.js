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
    `view_cnt` INT, NOT NULL DEFAULT 0
    PRIMARY KEY (`board_id`)
); 


*/

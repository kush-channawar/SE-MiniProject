CREATE DATABASE attendance;

CREATE TABLE student(
  user_id VARCHAR(255) NOT NULL UNIQUE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_mac VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY(user_id)
  
);

CREATE TABLE teacher(
   user_id VARCHAR(255) NOT NULL UNIQUE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
   PRIMARY KEY(user_id)
  
);

CREATE TABLE administrator(
   user_id VARCHAR(255) NOT NULL UNIQUE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
   PRIMARY KEY(user_id)
  
  
);

CREATE TABLE timetable(
    day VARCHAR(255) NOT NULL UNIQUE,
    p1 VARCHAR(255),
    p2 VARCHAR(255),
    p3 VARCHAR(255),
    p4 VARCHAR(255),
    p5 VARCHAR(255),
    p6 VARCHAR(255),
    p7 VARCHAR(255)

);

Insert into timetable(day,p1,p2,p3,p4,p5,p6,p7) values('monday','AC','DS','OS','GM LAB','GM','Minor/Honors','MOOC');

INSERT INTO student (user_id,user_name , user_email,user_password ) values (111803068,'kush','channawarkush@gmail.com','qwerty123');
INSERT INTO teacher (user_id,user_name , user_email,user_password ) values (222802222,'maam','maam@gmail.com','qwerty123');
INSERT INTO administrator (user_id,user_name , user_email,user_password) values (1,'Kush Channawar','kvcalt1707@gmail.com','qwerty123');
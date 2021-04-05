CREATE DATABASE attendance;

CREATE TABLE student(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_address VARCHAR(255) ,
  user_age INTEGER ,
  PRIMARY KEY(user_id)
  
);

CREATE TABLE teacher(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_address VARCHAR(255) ,
  user_age INTEGER ,
  PRIMARY KEY(user_id)
  
);

CREATE TABLE administrator(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
  
);



INSERT INTO student (user_name , user_email,user_password,user_address,user_age) values ('kush','channawarkush@gmail.com','qwerty123','nagpur',20);
INSERT INTO teacher (user_name , user_email,user_password,user_address,user_age) values ('maam','maam@gmail.com','qwerty123','nagpur',30);
INSERT INTO administrator (user_name , user_email,user_password) values ('Kush Channawar','kvcalt1707@gmail.com','qwerty123');
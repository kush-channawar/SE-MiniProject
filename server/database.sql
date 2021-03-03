CREATE DATABASE attendance;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_address VARCHAR(255) ,
  user_age INTEGER ,
  PRIMARY KEY(user_id)
  
);


INSERT INTO users (user_name , user_email,user_password,user_address,user_age) values ('kush','channawarkush@gmail.com','qwerty123','nagpur',20);
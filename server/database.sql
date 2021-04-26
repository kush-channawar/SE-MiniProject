CREATE DATABASE attendance;

CREATE TABLE student (
	sid varchar(255),
	name varchar(255) NOT NULL,
	password varchar(255),
   mac_add VARCHAR(255),
   email VARCHAR(255),
	CONSTRAINT  student_pk  PRIMARY KEY (sid)
);


/* entity */
CREATE TABLE  teacher  (
	 tid  varchar(255) ,
    name  varchar(255),
    email VARCHAR(255),
	 password  varchar(255),
	 
    
	CONSTRAINT  teacher_pk  PRIMARY KEY (tid)
);


/* connecting table */

CREATE TABLE  course_enroll  (
	 cid   varchar(255),
	 sid  varchar(255)
);


/* entity */
CREATE TABLE  courses  (
	 cid  varchar(255) NOT NULL,
	 tid  varchar(255) NOT NULL,
	 name  VARCHAR(255) NOT NULL,
	CONSTRAINT  courses_pk  PRIMARY KEY (cid)
);

insert into courses values('CT-17015','104','Software Engineering');
insert into courses values('CT-17014','104','Software Engineering Laboratory');
insert into courses values('CT-17016','101','Operating Systems');
insert into courses values('CT-17017','102','Algorithms and Complexity');
insert into courses values('CT-17018','103','Data Science');
insert into courses values('CT-17019','101','Operating Systems Laboratory');
insert into courses values('CT-17021','105','Graphics and Multimedia');
insert into courses values('CT-17020','105','Graphics and Multimedia Laboratory');
insert into courses values('CT(HO)-17002','106','Advanced Database Management Systems');
insert into courses values('CT-17000','109','Entreprenuership Development');
insert into courses values('CT-17022','108','Finance for Engineers');
insert into courses values('CT-17023','107','Environmental studies');

/* connecting table*/
CREATE TABLE  student_attend  (
	 sid  varchar(255) NOT NULL,
	 cid  varchar(255) NOT NULL,
	 date VARCHAR(255) NOT NULL,
	 present integer NOT NULL
);

/* entity */
CREATE TABLE administrator(
   user_id VARCHAR(255) NOT NULL UNIQUE,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
   PRIMARY KEY(user_id)
  
  
);

/* entity */
CREATE TABLE timetable(
    day VARCHAR(255) NOT NULL UNIQUE,
    p1 VARCHAR(255),
    p2 VARCHAR(255),
    p3 VARCHAR(255),
    p4 VARCHAR(255),
    p5 VARCHAR(255),
    p6 VARCHAR(255),
    p7 VARCHAR(255),
    p8 VARCHAR(255)

);



ALTER TABLE  course_enroll  ADD CONSTRAINT  course_enroll_fk0  FOREIGN KEY (cid) REFERENCES  courses(cid);
ALTER TABLE  course_enroll  ADD CONSTRAINT  course_enroll_fk1  FOREIGN KEY (sid) REFERENCES  student(sid);

ALTER TABLE  courses  ADD CONSTRAINT  courses_fk0  FOREIGN KEY (tid) REFERENCES  teacher(tid);

ALTER TABLE  student_attend  ADD CONSTRAINT  student_attend_fk0  FOREIGN KEY (sid) REFERENCES  student(sid);
ALTER TABLE  student_attend  ADD CONSTRAINT  student_attend_fk1  FOREIGN KEY (cid) REFERENCES  courses(cid);

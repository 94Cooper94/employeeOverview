DROP DATABASE IF EXISTS employeeoverview;
CREATE DATABASE employeeoverview;

USE employeeoverview;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  departmentName VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id),
  CONSTRAINT FK_DEPARTMENTID FOREIGN KEY  (department_id)
  REFERENCES departments(id)
);

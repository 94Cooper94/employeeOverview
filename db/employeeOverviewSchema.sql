DROP DATABASE IF EXISTS employeeoverview;
CREATE DATABASE employeeoverview;

USE employeeoverview;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  departmentName VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

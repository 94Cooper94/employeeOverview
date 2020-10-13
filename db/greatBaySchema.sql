DROP DATABASE IF EXISTS employeOverview;
CREATE DATABASE employeOverview;

USE employeOverview;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  departmentName VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

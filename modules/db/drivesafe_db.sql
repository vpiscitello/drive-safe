-- Group 16 DriveSafe database
-- CS344 Agile Project
-- DriveSafe Database

DROP TABLE IF EXISTS `ds_driver`;
DROP TABLE IF EXISTS `ds_employer`;
DROP TABLE IF EXISTS `ds_insurance`;
DROP TABLE IF EXISTS `ds_parent`;
DROP TABLE IF EXISTS `ds_driver_parent`;

-- create driver table
CREATE TABLE `ds_driver`(
	`username` varchar(255) NOT NULL, -- primary key
	`password` varchar(255) NOT NULL,
	`fName` varchar(255) NOT NULL,
	`lName` varchar(255) NOT NULL,
	`distance` int(11),	
	`minutes` int(11),
	`emergency_minutes` int(11),
	`employer_username` varchar(255),
	`insurance_username` varchar(255),
	PRIMARY KEY (`username`),
	CONSTRAINT `ds_driver_ibfk_1` FOREIGN KEY (`employer_username`) REFERENCES `ds_employer` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT `ds_driver_ibfk_2` FOREIGN KEY (`insurance_username`) REFERENCES `ds_insurance` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- create employer table
CREATE TABLE `ds_employer`(
	`username` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`username`),
	UNIQUE KEY(`name`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- create insurance table
CREATE TABLE `ds_insurance`(
	`username` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`username`),
	UNIQUE KEY (`name`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- create parent table
CREATE TABLE `ds_parent`(
	`username` varchar(255) NOT NULL,
	`fName`	varchar(255) NOT NULL,
	`lName` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`username`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- a driver can have many parents and a parent can have many drivers
-- ds_driver_parent is a relationship table for the M to N relationship
CREATE TABLE `ds_driver_parent`(
	`driver_username` varchar(255) NOT NULL,
	`parent_username` varchar(255) NOT NULL,
	PRIMARY KEY (`driver_username`, `parent_username`),
	CONSTRAINT `ds_driver_parent_ibfk_1` FOREIGN KEY (`driver_username`) REFERENCES `ds_driver` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `ds_driver_parent_ibkf_2` FOREIGN KEY (`parent_username`) REFERENCES `ds_parent` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `ds_driver` (`username`, `password`, `fName`, `lName`, `distance`, `minutes`, `emergency_minutes`, `employer_username`, `insurance_username`)
	VALUES
		('JSMITH', 'password', 'John', 'Smith', 0,0,0, 'TARGET', 'GEICO'),
		('ADOE', 'PASSWORD', 'Alice', 'Doe', 0,0,0, 'WALMART', 'ALLSTATE');
		
INSERT INTO `ds_employer` (`username`, `name`, `password`)
	VALUES
		('WALMART', 'Walmart', 'walmart1'),
		('TARGET', 'Target', 'target1');
		
INSERT INTO `ds_insurance` (`username`, `name`, `password`)
	VALUES
		('GEICO', 'Geico', 'geico1'),
		('ALLSTATE', 'Allstate', 'allstate1');

INSERT INTO `ds_parent` (`username`, `fName`, `lName`, `password`)
	VALUES
			('RDOE', 'Richard', 'Doe', 'rdoe1');
			
INSERT INTO `ds_driver_parent` (`driver_username`, `parent_username`)
	VALUES
			('ADOE', 'RDOE');
		
		
		
		
		
		
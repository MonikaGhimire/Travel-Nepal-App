CREATE TABLE destination
(
    uuid VARCHAR(36) PRIMARY KEY,
	name VARCHAR ( 250 ) unique NOT NULL,
	description text unique NOT NULL,
	location json NOT NULL,
	image_urls json,
	recommended BOOLEAN,
	featured BOOLEAN
);

CREATE TABLE review
(
    uuid VARCHAR(36) PRIMARY KEY,
	title VARCHAR ( 250 ) NOT NULL,
	detail text,
	rating integer NOT NULL,
	user_id VARCHAR ( 36 ) NOT NULL,
	destination_id VARCHAR ( 36 ) NOT NULL,
	CONSTRAINT fk_destination
      FOREIGN KEY(destination_id) 
	  REFERENCES destination(uuid)
)

ALTER TABLE review add COLUMN user_full_name VARCHAR (250);
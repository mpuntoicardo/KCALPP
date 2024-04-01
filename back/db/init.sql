USE kcalpp;

CREATE TABLE USER (
    id int auto_increment,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY(ID)
);

INSERT INTO USER (name, password, username, email) VALUES ('admin', '1234', 'admin', 'admin@admin.com');
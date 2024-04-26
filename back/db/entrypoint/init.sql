USE kcalpp;

CREATE TABLE IF NOT EXISTS USER (
    id int auto_increment,
    name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS HISTORY(
    id int auto_increment,
    user_id int not null,
    created_at date default (current_date),
    name varchar(255) not null,
    url varchar(255) not null,
    data json not null,
    FOREIGN KEY (USER_ID) REFERENCES USER(ID),
    PRIMARY KEY(ID)
);

INSERT INTO USER (name, password, username, email) VALUES ('admin', '1234', 'admin', 'admin@admin.com');
INSERT INTO HISTORY (USER_ID, url, data) VALUES (1, 'https://kcalpp.s3.eu-central-1.amazonaws.com/Remove-bg.ai_1712059304114.png', '{}');
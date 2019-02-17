--Database Tables

--Table of sound files stored
CREATE TABLE soundFiles (
	fileName VARCHAR(32),
	filePath VARCHAR(64),
	imageFilePath VARCHAR(64),
	userName VARCHAR(16),
	PRIMARY KEY(filePath),
	FOREIGN KEY (userName) REFERENCES users(userName));

--account information
CREATE TABLE users (
	userName VARCHAR(16),
	pass VARCHAR(16),
	PRIMARY KEY(userName));

--playlists, collections of soundFiles made by users
CREATE TABLE playlists (
	fileName VARCHAR(32),
	userName VARCHAR(16),
	playName VARCHAR(32),
	PRIMARY KEY(fileName, userName),
	FOREIGN KEY (fileName) REFERENCES soundFiles(fileName),
	FOREIGN KEY (userName) REFERENCES users(userName));

--list of rooms currently made, with users in that room
CREATE TABLE rooms (
	userName VARCHAR(16),
	roomName VARCHAR(16),
	PRIMARY KEY(userName, roomName),
	FOREIGN KEY (username) REFERENCES users(userName));

--Function that checks whether an account exists with a given username and password
select exists(select 1 from users where userName = u AND pass = p) AS "exists";

--Function that returns the filePath for the sound file with the given name if it exists
select sF.filePath
from soundFiles sF
where exists(select 1 from soundFiles where fileName = snd);

--Function that returns the filePath of the image for a given sound file
select sF.imageFilePath
from soundFiles sF
where (sF.fileName = str);

--Function that lists all users
select u.userName
from users u;

--Function that lists all soundFiles that a user has created
select sF.fileName
from soundFiles sF
where (sF.userName = str);

--Function that lists all playlists that a user has created
select pl.playName
from playlists pl
where (pl.userName = str);

--Function that lists all soundFiles in a given playlists
select pl.filePath
from playlists pl
where playName = n;

--Function that lists ALL soundFiles
select sF.fileName
from soundFiles sF;

--Function that lists ALL playlists
select pl.playName
from playlists pl;

--INSERTIONS

--function to create a new users
insert into users values(userName, pass);

--function to create a new soundFiles
insert into soundFiles values(fileName, filePath, imageFilePath, userName);

--function to create/add to a new soundboard
insert into playlists values(fileName, userName, playName);

--function to create a new room
insert into rooms values(userName, roomName);
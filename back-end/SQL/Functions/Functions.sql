--Function that checks whether an account exists with a given username and password
--usage SELECT userExists('Username','Password');
create or replace function userExists(u varchar, p varchar) returns boolean as
$$
select exists(select 1 from users where userName = u AND pass = p) AS "exists";
$$ language sql;

--Function that returns the filePath for the sound file with the given name if it exists
--usage SELECT getSoundFilePath('Sound File Name');
create or replace function getSoundFilePath(snd varchar) returns varchar as
$$
select sF.filePath
from soundFiles sF
where exists(select 1 from soundFiles where fileName = snd);
$$ language sql;

--Function that returns the filePath of the image for a given sound file
--usage SELECT getImageFilePath('Sound File Name');


--Function that lists all users
--usage SELECT getUsers();


--Function that lists all soundFiles that a user has created
--usage SELECT getSoundFiles('userName');


--Function that lists all playlists that a user has created
--usage SELECT getPlaylists('userName');


--Function that lists all soundFiles in a given playlists
--usage SELECT getPlaylistFiles('playName');


--Function that lists ALL soundFiles
--usage SELECT getAllSoundFiles();


--Function that lists ALL playlists
--usage SELECT getAllPlaylists();
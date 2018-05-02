<?php

$link = mysqli_connect(null, 'ellawiki', 'ellawiki', 'ellawiki', null, '/var/run/mysqld/mysqld.sock') or die('Could not connect: ' . mysql_error());
mysqli_select_db($link, 'ellawiki') or die('Could not select database');

mysqli_query($link, "insert into ellawiki (date_added) values (now())");
if (!mysqli_query($link, "insert into ellawiki (date_added) values (now())")) {
	throw new Exception('Query failed: ' . mysqli_error($link));
}


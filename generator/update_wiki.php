<?php

$link = mysqli_connect(null, 'ellawiki', 'ellawiki', 'ellawiki', null, '/var/run/mysqld/mysqld.sock') or die('Could not connect: ' . mysql_error());
mysqli_select_db($link, 'ellawiki') or die('Could not select database');

$result = mysqli_query($link, "select count(*) from ellawiki");
$row = $result->fetch_array(); 

$c = intval($row[0]);

if ($c > 0)
{
	system('/var/www/ellawiki/update_wiki.sh');
	mysqli_query($link, 'delete from ellawiki');
}

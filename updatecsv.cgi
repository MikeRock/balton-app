#!/bin/bash

echo -ne "Content-type: text/html\r\nCache-Control: no-cache\r\nExpires: -1\r\n\r\n"

cat << EOT
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <meta content="text/html; charset=ISO-8859-15" http-equiv="content-type">
  <meta http-equiv="refresh" content="30;url=updatecsv.cgi?done=Yes">
  <LINK rel="stylesheet" href="style.css" type="text/css">
  <title>pCOWeb Configuration</title>
</head>
<body bgcolor='#ffffff' style="margin: 0px; border: 0px; padding: 0px;">

<script type="text/javascript" src="pw_headtable.js"></script>

<center>
EOT

if [ "$QUERY_STRING" = "done=Yes" ]; then

cat << EOT
<div style="padding-top: 10px; font-size: 16px; font-weight: bold">
All files have been updated<br>
Close this window and press the link you need on "logger" page<br>
</div>

<br><br>

<div style="padding-bottom: 10px; border: 0px none 0; vertical-align: bottom; text-decoration: none;">
  <a href="javascript:window.close();">Close Window</a>
</div>
EOT

else

cat << EOT
<div style="padding-top: 10px; font-size: 16px; font-weight: bold">
Please wait while pCOWeb is generating csv files.<br>
This operation can take one minute
</div>
<br><br>
<img style="width: 101px; height: 11px" alt="progressbar" src="img/pw_progbar.gif" border="0">
EOT

fi

cat << EOT
</center>
</body>
</html>
EOT

if [ "$QUERY_STRING" != "done=Yes" ]; then

app=logger
sig=SIGUSR1

echo "do_kill?$app&-$sig" > /dev/httpsvc
cat /dev/httpsvcrep > /dev/null

fi

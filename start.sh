#!/usr/bin/env bash
#start up nodejs server

#exit on error
set e

# install PM2
npm install pm2@latest 

# run the server via PM2
pm2 start index.js

# save the PM2 process list and corresponding environments:
pm2 save

# generates and configures a startup script to launch PM2 and its managed processes on server boots:
pm2 startup systemd

# Start the service with systemctl:
echo "RUN THIS TO START PM2"
echo "sudo systemctl start pm2-$USER"

echo "DONE!" 

var net = require('net');
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const API = require('./api');
const fs = require('fs');
var client = new net.Socket();
var response = Array();
let data ='';
let tcp_connect = true;




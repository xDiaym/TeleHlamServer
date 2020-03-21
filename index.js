/* This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
'use strict';

const port = process.env.PORT || 8081;
const io = require('socket.io').listen(port);

/**
 * Table of the number of users and their socket IDs
 * Later this will be replaced with a SQL DataBase
 * @type {Map<string, Number>}
 */
const users = new Map();


function validateNumber(countryCode, number) {
    let numberRegex = /^\(?\d{3}\)?\s*-?\s*\d{3}\s*-?\s*\d{2}\s*-?\s*\d{2}$/;
    let countryCodeRegex = /^\+?\s*[1-9]{1,3}$/;
    return !!countryCode.match(countryCodeRegex) && !!number.match(numberRegex);
}

io.sockets.on('connection', (socket) => {
    let _number = null;
    console.log('New connection');

    socket.on('register', (number) => {
        // TODO(all): add number validator
        //  I don`t create it now because it`s just prototype
        users.set(number, socket.id);
        _number = number;
        console.log(`User with number ${number} added in DB`);
    });

    socket.on('send', (countryCode, number, text) => {
        if (!validateNumber(countryCode, number)) {
            socket.emit('error', `Incorrect number: ${number}`)
        }
        let id = users.get(number);
        if (!id) {
            socket.emit('error', `There are no user with number ${number}`);
        }

        io.sockets.connected[id].emit('new message', _number, text);
        console.log(`${_number} -> ${number}: ${text}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        users.delete(_number);
    });

});

const { v4: uuidv4 } = require('uuid');

module.exports.users = [
  {
    id: uuidv4(),
    email: 'hieu@gmail.com',
    password: '123456',
    firstName: 'hieu',
    lastName: 'truong cong',
    birthday: '17/10/1996',
    gender: 'male'
  },
  {
    id: uuidv4(),
    email: 'quy@gmail.com',
    password: '123456',
    firstName: 'quy',
    lastName: 'nguyen thanh',
    birthday: '17/10/2000',
    gender: 'male'
  },
  {
    id: uuidv4(),
    email: 'trung@gmail.com',
    password: '123456',
    firstName: 'trung',
    lastName: 'phan nguyen hoai',
    birthday: '17/10/1999',
    gender: 'male'
  }
]
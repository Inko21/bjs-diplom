// Первая часть диплома:
'use strict'
class Profile {
  constructor({nickName, name: {firstName, lastName}, password}){
    this.nickName = nickName;
    this.name = {
      firstName,
      lastName,
    };
    this.password = password;
    this.status = false;
    this.money = false;
  }

  createUser(callback) {
    return ApiConnector.createUser(
      {nickName: this.nickName, name: this.name, password: this.password }, (err, data) => {
      console.log(`Пользователь ${this.nickName} создан`);
      callback(err, data);
      }
    );
  };

  authorize(callback) {
    return ApiConnector.performLogin(
      {nickName: this.nickName, password: this.password}, (err, data) => {
        console.log(`Пользователь ${this.nickName} авторизован`);
        callback(err, data);
      }
    );
  };

  addMoney({ currency, amount }, callback) {
    return ApiConnector.addMoney({ currency, amount }, (err, data) => {
      console.log(`Зачисленно ${amount} ${currency}`);
      callback(err, data);
      }
    );
  };

  transferMoney({ to, amount }, callback) {
    return ApiConnector.transferMoney({ to, amount }, (err, data) => {
      console.log(`Переведино ${amount} пользователю ${to} `);
      callback(err, data);
      }
    );
  };

  convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
    return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
      console.log(`Перевод ${fromCurrency} в ${targetAmount} ${targetCurrency}`);
      callback(err, data);
      }
    );
  };

  getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
      console.log(`Текущий курс`);
      callback(err, data);
      }
    );
  };
};

// Вторая часть диплома
const user1 = new Profile({
  nickName: 'Vasya24',
  name: {firstName: 'Vsiliy', lastName: 'Proshkin'},
  password: '12345'
});


function main(){
  const user1 = new Profile({
    nickName: 'Vasya24',
    name: {firstName: 'Vsiliy', lastName: 'Proshkin'},
    password: '12345'
  });

  const user2 = new Profile({
    nickName: 'Foxy78',
    name: {firstName: 'Ekaterina', lastName: 'Zemlyanskaya'},
    password: '54321'
  });

  user1.createUser((err, data) => {
    if (err) {
      if (err.code === 409) {
        user.authorize((err, data) => {
          if (err) {
            console.error('Не авторизован');
          } else {
            user.status = true;
          }
        });
      }
    } else {
      user.status = true;
      console.log(`Создан пользователь ${user.nickName}`);
    }
  });

  user2.createUser((err, data) => {
    if (err) {
      if (err.code === 409) {
        user.authorize((err, data) => {
          if (err) {
            console.error('Не авторизован');
          } else {
            user.status = true;
          }
        });
      }
    } else {
      user.status = true;
      console.log(`Создан пользователь ${user.nickName}`);
    }
  });

  let check = setInterval(() => {

  user1.addMoney({ currency: 'RUB', amount: 500000 }, (err, data) => {
    if (err) {
      console.error(`Ошибка при зачислении денег на счет пользователю ${user1.nickName}`);
    } else {
      console.log(`Зачисленно 500000 руб на счет пользователю ${user1.nickName}`);
      user1.money = true;
    }
  });

  user1.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: 100 }, (err, data) => {
    if (err) {
      console.error(`Error converting money from RUB to NETCOIN`);
    } else {
      console.log(`Конвертация в 100 ${targetCurrency}`);
    }
  });

  user1.transferMoney({ to: 'Foxy78', amount: 100 }, (err, data) => {
    if (err) {
      console.error(`Error during transfer money to Foxy78`);
    } else {
      console.log(`Пользователю переведено: 100`);
    }
  });

  user1.getStocks((err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(data[0]);
    }
  });
  clearInterval(timer1);
  }, 1000);
}

main();
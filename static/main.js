// Первая часть диплома:
'use strict'
class Profile {
  constructor({username, name: {firstName, lastName}, password}){
    this.username = username;
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
      {username: this.username, name: this.name, password: this.password }, (err, data) => {
      console.log(`Пользователь ${this.username} создан`);
      callback(err, data);
      }
    );
  };

  authorize(callback) {
    return ApiConnector.performLogin(
      {username: this.username, password: this.password}, (err, data) => {
        console.log(`Пользователь ${this.username} авторизован`);
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
};

function getStocks(callback) {
  return ApiConnector.getStocks((err, data) => {
    console.log(`Текущий курс`);
    callback(err, data);
    }
  );
};

// Вторая часть диплома
function main(){
  const user1 = new Profile({
    username: 'Vasya24',
    name: {firstName: 'Vsiliy', lastName: 'Proshkin'},
    password: '12345'
  });

  const user2 = new Profile({
    username: 'Foxy78',
    name: {firstName: 'Ekaterina', lastName: 'Zemlyanskaya'},
    password: '54321'
  });

  user1.createUser((err, data) => {
    if (err) {
        console.error(`Ошибка при создании аккаунта ${user1.username}`);
    }
    else {
        console.log(`Аккаунт ${user1.username} успешно создан`);
        user1.authorize((err, data) => {
          if (err) {
            console.error('Не авторизован');
          } else {
            console.log(`${user1.username} заходим в аккаунт`);
            user1.status = true;
            user1.addMoney({ currency: 'RUB', amount: 500000 }, (err, data) => {
              if (err) {
                console.error(`Ошибка при зачислении денег на счет пользователю ${user1.username}`);
              } else {
                console.log(`Зачисленно 500000 руб на счет пользователю ${user1.username}`);
                user1.money = true;
                getStocks((err, data) => {
                  if (err) {
                    console.error(err.message);
                  } 
                user1.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: 100 }, (err, data) => {
                  if (err) {
                    console.error(`Ошибка конвертации из "RUB" в "NETCOIN"`);
                  } else {
                    console.log(`Конвертация в 100 'NETCOIN'`);
                    user2.createUser((err, data) => {
                      if (err) {
                          console.error(`Ошибка при создании аккаунта ${user2.username}`);
                      }
                      else {
                          console.log(`Аккаунт ${user2.username} успешно создан`);
                          user1.transferMoney({ to: 'Foxy78', amount: 100 }, (err, data) => {
                            if (err) {
                              console.error(`Ошибка при попытке перевода валюты пользователю 'Foxy78'`);
                            } else {
                              console.log(`Пользователю переведено: 100`);
                            }
                          });
                      };
                    });
                  }
                });
                });
              }
            });
          }
        });
    };
  });
}

main();
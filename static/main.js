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
        console.error(`Ошибка при создании аккаунта ${user1.nickName}`);
    }
    else {
        console.log(`Аккаунт ${user1.nickName} успешно создан`);
        user1.authorize((err, data) => {
          if (err) {
            console.error('Не авторизован');
          } else {
            console.log(`${user1.nickName} заходим в аккаунт`);
            user.status = true;
            user1.addMoney({ currency: 'RUB', amount: 500000 }, (err, data) => {
              if (err) {
                console.error(`Ошибка при зачислении денег на счет пользователю ${user1.nickName}`);
              } else {
                console.log(`Зачисленно 500000 руб на счет пользователю ${user1.nickName}`);
                user1.money = true;
                getStocks((err, data) => {
                  if (err) {
                    console.error(err.message);
                  } 
                user1.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: 100 }, (err, data) => {
                  if (err) {
                    console.error(`Ошибка конвертации из "RUB" в "NETCOIN"`);
                  } else {
                    console.log(`Конвертация в 100 ${targetCurrency}`);
                    user2.createUser((err, data) => {
                      if (err) {
                          console.error(`Ошибка при создании аккаунта ${user2.nickName}`);
                      }
                      else {
                          console.log(`Аккаунт ${user2.nickName} успешно создан`);
                          user1.transferMoney({ to: 'Foxy78', amount: 100 }, (err, data) => {
                            if (err) {
                              console.error(`Ошибка при попытке перевода валюты пользователю ${to}`);
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
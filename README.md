# TeleHlamServer
Checklist:
- [x] Отправка собщений
- [ ] Получение деталей о пользователе
- [ ] Поддержка шифрования

__**В случае ошибки сервер ответит [таким событием](#error-handling)**__
## Register
После подключения пользователь отправляет событие `register`  

| Имя параметра |  Тип   |                Описание               |
| :------------ | :----- | :------------------------------------ |
|  areaCode     | string |  Код страны                           |
|  number       | string |  Номер телефона                       |


## Отправка сообщения
Пользователь отправляет событие `send message`

| Имя параметра |  Тип   |                Описание               |
| :------------ | :----- | :------------------------------------ |
|  areaCode     | string | Код страны                            |
|  number       | string | Номер телефона                        |
|  text         | string | Сообщение пользователя                |


## Прием сообщения
Пользователь получет событие `message`

| Имя параметра |  Тип   |                Описание               |
| :------------ | :----- | :------------------------------------ |
|  areaCode     | string | Код страны                            |
|  number       | string | Номер телефона                        |
|  text         | string | Сообщение пользователя                |


## Выход из сети
Пользователь получает событие `user disconnected`. После этого 
пользователь с данным носером телефона не сможет принять соощение

| Имя параметра |  Тип   |                Описание               |
| :------------ | :----- | :------------------------------------ |
|  areaCode  | string | Код страны                            |
|  number       | string | Номер телефона                        |


## Error Handling
Сервер отправит пользователю событие `error`

| Имя параметра |  Тип   |                Описание               |
| :------------ | :----- | :------------------------------------ |
| type          | string | Тип ошибки                            |
| code          | Number | Код ошибки                            |
| description   | string | Краткое описание ошибки               |


Список ошибок:

| Имя ошибки            |  Код   |           Описание            |
| :-------------------- | :----- | :---------------------------- |
| IncorrectNumberFormat | 0      | Неверный формат номера        |
| UserNotFound          | 1      | Пользователь не найден        |

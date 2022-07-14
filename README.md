# Описание проекта

## Запуск приложения

Для инициализации приложения достаточно запуск docker-compose файла - после клонирования репозитории - следующей командой:  
`docker-compose up --build`

#### Перед запуском убедитесь, что порты, указанные ниже свободны

        3003, 27017

## API

- POST
  - api/user/create - создает пользователя и возвращает его же
  - api/user/login - авторизует пользователя и возвращает email и token, где хранится id пользователя
- GET

  - api/user/get/all - показывает всех пользователей, и доступно только авторизованным пользователям.
  - api/user/get/:id - показывает пользователя по id, и доступно только авторизованным пользователям.
  - api/user/token/verify/:token - показывает содержимое токена.

- DELETE

  - api/user/delete/:id - удаляет пользователя по id.

- PUT
  - api/user/update - доступно только авторизованным пользователям и меняет свои данные

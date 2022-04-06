Как развернуть проект:
  С помощью docker:
    - Создаем .env в корне проекта по примеру .env.example
    - docker-compose build
    - docker-compose up

    backend должен подняться на 3000 порту
    frontend на 8080

  Без docker
    Понадобится установленный postgres
    - cd backend
    - Создаем .env по примеру .env.example
    - nvm use 16.11.0
    - yarn
    - yarn start:dev

    - cd frontend
    - cd backend
    - Создаем .env по примеру .env.example
    - nvm use 16.11.0
    - yarn
    - yarn serve

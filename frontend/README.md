## Available Scripts

In the project directory, you can run:

### `npm start`

Dev server (берет адрес из .env.development)

### `npm run local`

Dev local server (берет адрес из .env.development.local)

Необходимо создать файл .env.development.local в корне реакт приложения, указать в нем:
REACT_APP_BASE_URL = "localhost:ваш_порт"

### `npm run build`

Собрать проект (берет адрес из .env.development)

### `npm run build:prod`

Собрать проект для продакшена (берет адрес из .env.production)

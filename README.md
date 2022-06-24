# ui-plugin-example

> Перед початком потрібно встановити [nodejs](https://nodejs.org/) та [@angular/cli](https://www.npmjs.com/package/@angular/cli)

>  Даний проект є результатом виконання інструкції по генерації UI плагіна: **ПОСИЛАННЯ СТОРІНКУ ІНСТРУКЦІЇ** 

Протестовано на таких версіях @angular/cli: [12.2.17](https://www.npmjs.com/package/@angular/cli/v/12.2.17 "12.2.17"), [13.3.8](https://www.npmjs.com/package/@angular/cli/v/13.3.8 "13.3.8") 


Встановлення компонентів: `npm i`.

## Збірка та публікація

Перед збіркою потрібно прогнерувати файл спецефікації:
```
npm explore @natec/mef-dev-platform-connector -- npm run generate-version-file
```

Для збірки плагіна можна використовувати команду:
```
 ng build --output-hashing none --prod --single-bundle
```
Після чого вміст папки `dist` можна завантажувати на платформу.


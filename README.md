[Получаем и выводим весь список контакстов в виде таблицы (console.table)]
(./images/action-list.jpg)
node index.js --action="list"

[Получаем контакт по id]
(./images/action-get.jpg)
node index.js --action="get" --id=5

[Добавялем контакт]
(./images/action-add.jpg)
node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

[Удаляем контакт]
(./images/action-remove.jpg)
node index.js --action="remove" --id=3
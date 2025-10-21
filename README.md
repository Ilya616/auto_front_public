# Всем привет! Небольшая памятка для работы с проектом

## ПОСТОЯННО ПОВТОРЯЮЩИЕСЯ ОПЕРАЦИИ

### Начинайте работу с проектом в папке auto_front_public

```
git checkout dev
```

```
git pull
```

```
npm install
```

Если нужно реализовать новый функционал:

```
git branch <НОВАЯ ВЕТКА ДЛЯ РАБОТЫ НАД НОВЫМ ФУНКЦИОНАЛОМ>
```

Пример: git branch feature/edit_readme

Переход на созданную ветку:

```
git checkout <НОВАЯ ВЕТКА ДЛЯ РАБОТЫ НАД НОВЫМ ФУНКЦИОНАЛОМ>
```

Пример: git checkout feature/edit_readme

Завершение работы на новым функционалом:

```
git add .
```

```
git commit -m "<КОММЕНТАРИЙ К КОММИТУ>"
```

```
git push -u origin <ВЕТКА НА КОТОРОЙ РАБОТАЛИ>
```

```
git push
```

## ПОЛЕЗНЫЕ ССЫЛКИ

## React

- [ ] [Документация](https://react.dev/learn/build-a-react-app-from-scratchhttps://laravel.com/docs/11.x)
- [ ] [React Route](https://reactrouter.com/start/framework/installation)

## Git

- [ ] [Git](https://liblessons.ru/sundry/comands-git/)

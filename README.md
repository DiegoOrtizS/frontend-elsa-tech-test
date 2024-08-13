# frontend-elsa-tech-test

## Definir el .env
```bash
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000/api/v1
```


## Instalación de paquetes con npm o yarn
```bash
npm install
```
```bash
yarn install
```

## Ejecución de la aplicación en dev
```bash
yarn run dev
```

## Ejecución de la aplicación en producción
```bash
yarn run build
yarn run start
```

## Ejecución de la aplicación en producción con pm2
```bash
yarn run build
pm2 start npm --name "front-elsa-tech-test" -- start
```

## Roles
La aplicación cuenta con 3 roles distintos admin, volunteer y adopter
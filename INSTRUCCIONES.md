# Instrucciones de Despliegue

## Clonar los repositorios

Se recomienda copiar los comandos desde BitBucket ya que dependen del usuario
```
git clone https://emlautarom1@bitbucket.org/emlautarom1/back-unsltv.git
git clone https://emlautarom1@bitbucket.org/Gonzaloquirogavaldez/front-unsltv.git
```

## Ajustar las variables de entorno

El archivo `environment.prod.ts` debería verse similar a:

```javascript
export const environment = {
  production: true,
  backend_url: 'http://35.225.151.107/api',
  youtube_api_key: 'AIxxSxCLExxxCx5xxHZxQSxxKxBUxINIx11x1xx',
};
```

```
cd front-unsltv
cp src/environments/environment.ts src/environments/environment.prod.ts
nano src/environments/environment.prod.ts
```
- Configurar `production: true`
- La clave de la API se encuentra en el panel de Google Cloud (YouTube Data API)
- La URL del backend es la URL pública de la VM ('http://35.225.151.107/api')

## Crear archivo de Swap

La VM gratuita tiene muy poca RAM, por lo que utilizamos el disco como "memoria extra"

```
sudo fallocate -l 2G /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## Compilar el front

Este proceso puede tardar un rato

```
npm i
npx ng build --base-href=./
```

## Preparar el back

Creamos las carpetas necesarias

```
mkdir ../back-unsltv/static
mkdir ../back-unsltv/cache
```

Habilitamos el puerto 80 para el back

```
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```

Cambiamos el puerto de desarrollo (`3000`) por el de producción (`80`)

El archivo `main.ts` debería verse similar a:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(80);
}
bootstrap();
```

```
cd ../back-unsltv
nano src/main.ts
```

## Ejecutar el back

Compilamos el back

```
npm i
npm run build
```

Ejecutamos el back con `pm2`

```
sudo npm i -g pm2
pm2 start dist/main.js
```

## Notas finales

El sitio debería estar disponible desde la URL pública de la VM (`http://35.225.151.107`)

Es posible ajustar la duración del cache cambiando el archivo `back-unsltv/src/http-cached.service.ts`. Allí, cambiar el valor de `CACHE_TTL` por el que se considere apropiado.

En caso de realizar este cambio, se debe:
- Recompilar el back (`npm run build`)
- Reiniciar el back (`pm2 restar all`)


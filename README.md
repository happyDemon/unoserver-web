# Unoserver Web

Web server for converting files using [unoserver](https://github.com/unoconv/unoserver)

![CI/CD](https://github.com/happyDemon/unoserver-web/workflows/CI/CD/badge.svg)
[![Codecov](https://codecov.io/gh/happyDemon/unoserver-web/graph/badge.svg?token=2LFC0WZCQE)](https://codecov.io/gh/happyDemon/unoserver-web)

Once the container is up and running http://127.0.0:3000 provides a swagger interface.

This is perfect for local development, or running it on a private network in production.

## Example

Using [Dockerhub Image](https://hub.docker.com/r/happydemon/unoserver-web):

```sh
docker run -d -p 3000:3000 happydemon/unoserver-web:latest

curl \
--request POST 'http://localhost:3000/convert/pdf' \
--form 'file=@"/path/to/file.docx"' \
-o my.pdf
```

each release has a version with all google fonts, sufixed with`-fonts`

## Container Environment

| Variable             | Description                                                                | Default |
| -------------------- | -------------------------------------------------------------------------- | ------- |
| PORT                 | Application port                                                           | 3000    |
| MAX_WORKERS          | Maximum number of LibreOffice workers                                      | 8       |
| WORKER_JOB_TIMEOUT   | Time limit that 1 file conversion can run (ms)                             | 60000   |
| CONVERSION_RETRIES   | Number of retries for converting a file                                    | 3       |
| MAX_FAILED_STORED    | Defines how many of the latest failed conversions are kept on record       | 500     |
| BASE_PATH            | Prefix path                                                                |         |
| REQUEST_ID_HEADER    | The header name used to set the request-id                                 |         |
| REQUEST_ID_LOG_LABEL | Defines the label used for the request identifier when logging the request | reqId   |

You can pass values individually when starting up the container

```shell
docker run --rm -e MAX_WORKERS=8 -e CONVERSION_RETRIES=3 -p 3000:3000 unoserver-web:dev
```

Or you you pass a whole `.env` file:

```shell
docker run --rm --env-file ./env -p 3000:3000 unoserver-web:dev
```

## Development

To spin up the container for development use [VSCode Remote Containers](https://code.visualstudio.com/docs/devcontainers/containers) feature. See `.devcontainer/devcontainer.json` for reference.

If you need to support more custom fonts, you could add them to `fonts` folder.

Commands:

- `pnpm run dev` - runs the app in watch-mode, then you could access a Swagger UI from `http://0.0.0.0:3000`
- `pnpm run build && pnpm run start` - builds and starts a production version of the app
- `pnpm run validate` - runs linting, typechecking and formatting check
- `pnpm run test` - runs all the tests

### Building an image

This step will always be required if you want to bring your own fonts.

```sh
docker build --build-arg NODE_ENV=production --tag unoserver-web:dev .
docker run --rm -p 3000:3000 unoserver-web:dev
```

Optionally you could include all the google fonts (1GB worth of files) into your container

```sh
docker build --build-arg NODE_ENV=production --build-arg GOOGLE_FONTS=1 --tag unoserver-web:dev .
docker run --rm -p 3000:3000 unoserver-web:dev
```

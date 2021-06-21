FROM elixir:1.9.4-alpine AS build

RUN apk add --no-cache build-base git

RUN mkdir /app
WORKDIR /app

RUN mix local.hex --force && \
    mix local.rebar --force

ENV MIX_ENV=prod

COPY mix.exs mix.lock ./
RUN mix deps.get

COPY config ./config
RUN mix deps.compile

COPY lib ./lib/
COPY priv ./priv/

RUN mix release

FROM alpine:3.14.0 as app

RUN apk add --update openssl ncurses-libs postgresql-client && \
    rm -rf /var/cache/apk/*

RUN mkdir /app
WORKDIR /app

RUN chown nobody:nobody /app
USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/tabi ./
COPY entrypoint.sh .

EXPOSE 4000

ENTRYPOINT ["sh", "./entrypoint.sh"]
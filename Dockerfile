FROM ruby:2-alpine3.13 as builder

RUN apk --update add --no-cache --virtual run-dependencies \
  build-base

WORKDIR /finitio
COPY Gemfile* /finitio/
RUN bundle install

FROM ruby:2-alpine3.13 as runtime
COPY --from=builder /usr/local/bundle /usr/local/bundle
WORKDIR /finitio
COPY . .

EXPOSE 4000
ENTRYPOINT [ "bundle", "exec", "rackup", "--host", "0.0.0.0", "--port", "4000" ]
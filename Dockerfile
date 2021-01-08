FROM ruby:2.7.2-slim-buster as builder

RUN apt-get update && apt-get install -y build-essential

WORKDIR /finitio
COPY Gemfile* /finitio/
RUN bundle install

FROM ruby:2.7.2-slim-buster as runtime
COPY --from=builder /usr/local/bundle /usr/local/bundle
WORKDIR /finitio
COPY . .

EXPOSE 4000
ENTRYPOINT [ "bundle", "exec", "rackup", "--host", "0.0.0.0", "--port", "4000" ]
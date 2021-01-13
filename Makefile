container = finitio

ps:
	docker ps

build:
	docker build -t $(container) .

up:
	docker run -d -p 4000:4000 --rm --name $(container) $(container)

logs:
	docker logs -f $(container)

down:
	docker stop $(container)

restart:
	docker container restart $(container)
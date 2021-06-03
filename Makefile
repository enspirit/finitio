IMAGE = enspirit/finitio
CONTAINER = finitio
ps:
	docker ps

image:
	docker build -t $(IMAGE) .

push-image:
	docker push $(IMAGE)

redeploy:
	@kubectl rollout restart deployment -n enspirit finitio

up:
	docker run -d -p 4000:4000 --rm --name $(CONTAINER) $(IMAGE)

logs:
	docker logs -f $(CONTAINER)

down:
	docker stop $(CONTAINER)

bash:
	docker exec -it $(CONTAINER) bash

restart:
	docker container restart $(CONTAINER)

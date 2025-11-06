# Working with Docker and ECS

### Useful ECS and Docker commands
Build a docker image
```bash
$ cd nest-app
$ docker build -t my-app .
```

List existing images and delete
```bash
$ docker images
# Containers using the image must be stopped and removed first
$ docker rmi <image-tag>
```

Run a docker container using the _my-app_ image
```bash
# With environment variables
$ docker run -e NODE_ENV="development" -e AWS_REGION="eu-west-2" -e  my-app
# With environment file
$ docker run --env-file docker.env my-app
# With port mapping
$ docker run  -p 8911:8911 --env-file docker.env my-app
# In detached mode
$ docker run -d  my-app:latest
```

Enter a container to inspect it's file content
```bash
$ docker run -it my-app sh
```

Enter running container
```bash
$ docker exec -it <container-name-or-id> sh
```

Check if application is running while inside a container
```bash
# The application is expected to run on port 8911
$ netstat -tulpn | grep 8911
```

Check if node process is running while inside a container
```bash
$ ps aux | grep node
```

Check container logs from host machine
```bash
$ docker logs <container-name-or-id sh>
# Very useful for debugging
```

Copy file from docker container to host machine
```bash
$ docker create --name temp-container 12345678910.dkr.ecr.eu-west-1.amazonaws.com/my-app:latest
docker cp temp-container:/app/web ~/my-workspace
```

List running container, stop and remove
```bash
$ docker ps
$ docker stop <container-name-or-id>
$ docker rm <container-name-or-id>
# Force remove
$ docker rm -f <container-name-or-id>
```  

Push docker image to ECR repository
```bash
$ docker tag my-app:latest 12345678910.dkr.ecr.eu-west-2.amazonaws.com/my-app:latest
$ aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 12345678910.dkr.ecr.eu-west-2.amazonaws.com
$ docker push 12345678910.dkr.ecr.eu-west-1.amazonaws.com/my-app:latest
```

Pull docker image from ERC repository
```bash
# After authenticating to the ECR repository
$ docker pull 12345678910.dkr.ecr.eu-west-1.amazonaws.com/my-app:latest
```

Run container using the ECR image
```bash
$ docker run -d 12345678910.dkr.ecr.eu-west-1.amazonaws.com/my-app:latest
```

### Other useful linux commands
Process running in the background on a porr that is needed. You get error when you try to use the port:
_Error: listen EADDRINUSE: address already in use 0.0.0.0:8911_

Find the process  
```bash
$ lsof -ti:8911
```
Kill the process
```bash
$ kill -9 $(lsof -ti:8911)
```

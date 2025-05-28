### User Service API

**Setup**
Install dependencies

First setup you virtual environment for the application

```bash
# Create virtual environment
$ python -m venv user_service_env
# Activate the environment
$ source user_service_env/bin/activate
# Install dependencies
$ pip install -r requirements.txt
```

```bash
$ pip install fastapi uvicorn pydantic email-validator bcrypt
```

Run the server

```bash
$ uvicorn main:app --reload
```

**Deployment**

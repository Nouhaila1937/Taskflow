# Taskflow
### 📦 Description  
TaskFlow est une application web permettant aux équipes de gérer leurs tâches et leurs projets en toute simplicité. L'objectif est de créer une API Node.js avec Express.js pour gérer les tâches et de mettre en place une pipeline CI/CD avec Jenkins, Docker et GitHub. 

### 🐳 Récupérer l'Image depuis Docker Hub  
Pour télécharger et exécuter l'image, utilise les commandes suivantes :  

```bash
docker pull nanga123/task-api:latest
```

### ▶️ Exécuter le Conteneur  
Tu peux exécuter l'image avec la commande suivante :  

```bash
docker run -d -p 5000:5000 nanga123/task-api:latest
```

L'API sera disponible sur `http://localhost:5000`.

### 🔧 Construire et Exécuter l'Image Localement  
Si tu veux reconstruire l'image à partir du Dockerfile, utilise :  

```bash
docker build -t task-api .
docker run -d -p 5000:5000 task-api
```

### 📜 Liste des Endpoints  
| Méthode | Endpoint      | Description |
|---------|-------------|------------|
| GET     | `/tasks`    | Récupérer toutes les tâches |
| POST    | `/tasks`    | Ajouter une nouvelle tâche |
| PUT     | `/tasks/:id` | Modifier une tâche existante |
| DELETE  | `/tasks/:id` | Supprimer une tâche |

## 🔬 Tests avec Postman
### Ajouter une tâche dans MongoDB
1. Ouvre **Postman**.
2. Crée une nouvelle requête **POST** vers `http://localhost:5000/tasks`.
3. Dans l'onglet **Body**, choisis `raw` et `JSON`.
4. Ajoute ce JSON d'exemple :
   ```json
   {
     "title": "Acheter du lait",
     "description": "Aller au supermarché pour acheter du lait",
     "status": "En cours"
   }
   ```
5. Clique sur **Send** et vérifie la réponse.
6. Pour voir les tâches ajoutées, envoie une requête **GET** sur `http://localhost:5000/tasks`.

🚀 Configuration de Jenkins pour CI/CD

Installer Jenkins et les plugins nécessaires

Installer Jenkins

Ajouter les plugins : Pipeline, GitHub, Docker Pipeline

Créer un job Jenkins

Aller sur Jenkins > New Item

Sélectionner Pipeline

Configurer le dépôt GitHub (branch principale)

Ajouter les credentials GitHub si nécessaire

Ajouter un `` dans le repoExemple de Jenkinsfile :

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "task-api"
        DOCKER_USERNAME = "nanga123"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials',
                     passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                     sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                     sh "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}"
                }
            }
        }
    }
}

Configurer le Webhook GitHub pour déclencher Jenkins

Aller sur GitHub > Repo > Settings > Webhooks

Ajouter un Webhook : http://<JENKINS_URL>/github-webhook/

Sélectionner Just the push event

🌍 Utiliser ngrok pour exposer l'API

Si tu veux tester l'API depuis une machine externe :

Installer ngrok :

npm install -g ngrok

Exposer le port 5000 :

ngrok http 5000

Copier l'URL générée (ex: https://abcd1234.ngrok.io) et tester avec Postman.

🛠 Tester l'API avec Postman

Ajouter une tâche

Méthode : POST

URL : http://localhost:5000/tasks

Body (JSON) :

{
  "title": "Nouvelle tâche",
  "description": "Description de la tâche",
  "status": "en cours"
}

Voir les tâches ajoutées

Méthode : GET

URL : http://localhost:5000/tasks

Modifier une tâche

Méthode : PUT

URL : http://localhost:5000/tasks/:id

Body (JSON) :

{
  "title": "Tâche modifiée",
  "description": "Nouvelle description",
  "status": "terminé"
}

Supprimer une tâche

Méthode : DELETE

URL : http://localhost:5000/tasks/:id




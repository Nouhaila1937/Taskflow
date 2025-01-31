pipeline {
    agent any

    environment {
        // Définir l'image Docker comme une variable d'environnement
        DOCKER_IMAGE = "task-api"
        DOCKER_REGISTRY = "docker.io"  // Optionnel, si tu utilises un registre Docker privé
    }

    stages {
        // Étape de construction de l'image Docker
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker à partir du Dockerfile
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }

        // Étape de test (si tu as des tests à exécuter)
        // stage('Run Tests') {
        //     steps {
        //         script {
        //             // Exécuter les tests, par exemple avec Jest ou Mocha
        //             sh 'npm test'
        //         }
        //     }
        // }

        // Étape de déploiement
        stage('Deploy to Docker') {
            steps {
                script {
                    // Lancer l'image Docker dans un conteneur
                    sh 'docker run -d -p 5000:5000 ${DOCKER_IMAGE}'
                }
            }
        }

        // Optionnel : étape de nettoyage (si nécessaire)
        // stage('Cleanup') {
        //     steps {
        //         script {
        //             // Supprimer l'image Docker locale après déploiement (si nécessaire)
        //             sh 'docker rmi ${DOCKER_IMAGE}'
        //         }
        //     }
        // }

        stage('Push to Docker Hub') {
          steps {
            script {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials',
                 passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    // Se connecter à Docker Hub
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    // Pousser l'image vers Docker Hub
                    sh "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest"
                }
            }
          }
          }

    }

    post {
        // Actions après chaque exécution de pipeline (réussite ou échec)
        always {
            // Par exemple, supprimer les conteneurs Docker s'ils sont restés actifs
            sh 'docker ps -q | xargs docker rm -f || true'
        }
        success {
            echo 'Le pipeline s\'est exécuté avec succès !'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
    }
}

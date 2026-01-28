pipeline {
    agent any

    environment {
        IMAGE_NAME = "praveenchandeepa/backend-app"
        DOCKERHUB = credentials('dockerhub-creds')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                  docker build -t $IMAGE_NAME:latest ./backend
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh '''
                  echo $DOCKERHUB_PSW | docker login \
                    -u $DOCKERHUB_USR --password-stdin
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                  docker push $IMAGE_NAME:latest
                '''
            }
        }
    }
}

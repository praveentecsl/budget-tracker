pipeline {
    agent any

    environment {
        // Names for your repositories on Docker Hub
        BACKEND_IMAGE  = "praveenchandeepa/backend-app"
        FRONTEND_IMAGE = "praveenchandeepa/frontend-app"
        DOCKERHUB      = credentials('dockerhub-creds')
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh """
                  # Build backend from its folder
                  docker build -t $BACKEND_IMAGE:latest ./backend
                  
                  # Build frontend from its folder
                  docker build -t $FRONTEND_IMAGE:latest ./frontend
                """
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh "echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin"
            }
        }

        stage('Push Images') {
            steps {
                sh """
                  docker push $BACKEND_IMAGE:latest
                  docker push $FRONTEND_IMAGE:latest
                """
            }
        }

        stage('deploy with ansible'){
            steps{
                sh 'ansible-playbook /var/lib/jenkins/ansible/deploy.yml'
            }
        }
    }

    

    post {
        always {
            // Optional: Clean up local build images to save space on Ubuntu
            sh "docker logout"
            sh "docker image prune -f"
        }
    }
}
pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-cd-demo"
        DOCKERHUB_USER = "your_dockerhub_user"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/oshergildavid/docker-cd-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                  docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                      echo $PASS | docker login -u $USER --password-stdin
                      docker push $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  docker stop app || true
                  docker rm app || true
                  docker run -d --name app -p 3100:3100 \
                  $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }
    }

    post {
        success {
            echo '🚀 Deployment successful!'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}

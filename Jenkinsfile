pipeline {
    agent any

    environment {
        PM2_APP_NAME = 'pos-fe'
        APP_DIR = '~/pos-app/pos-fe'
    }

    stages {
        stage('Build') {
            steps {
                sh cd ${APP_DIR}
                sh git pull origin main
                sh npm install
                sh npm run build
            }
        }

        stage('Deploy') {
            steps {
                sh cd ${APP_DIR}
                sh pm2 reload ${PM2_APP_NAME}
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}

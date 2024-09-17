pipeline {
    agent any

    environment {
        PM2_APP_NAME = 'pos-fe'
        APP_DIR = "${WORKSPACE}/pos-app/pos-fe"
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                cd ${APP_DIR}
                git pull origin main
                npm install
                npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                cd ${APP_DIR}
                pm2 reload ${PM2_APP_NAME}
                '''
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

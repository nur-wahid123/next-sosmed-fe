pipeline {
    agent any

    environment {
        PM2_APP_NAME = 'pos-fe'
        APP_DIR = "/home/farhan/pos-app/pos-fe"
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                cd ${APP_DIR}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                cd ${APP_DIR}
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

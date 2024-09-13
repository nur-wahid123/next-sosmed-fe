pipeline {
    agent any

    environment {
        PM2_APP_NAME = 'pos-fe'
        APP_DIR = "pos-app/pos-fe"  // Use $HOME for path expansion
    }

    stages {
        stage('Build') {
            steps {
                // Execute multiple shell commands using a multi-line string
                sh '''
                cd ..
                cd ${APP_DIR}
                git pull origin main
                npm install
                npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                // Reload PM2 app
                sh '''
                cd ..
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


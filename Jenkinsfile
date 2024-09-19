pipeline {
    agent any
    tools {nodejs "nodejs"}
    
    environment {
        PM2_APP_NAME = 'pos-fe'
        APP_DIR = "/home/farhan/pos-app/pos-fe"
    }
    stages {
        stage('Checkout') {
            steps {
                // Pull the code from the Git repository
                git branch: 'main', url: 'https://github.com/nur-wahid123/next-sosmed-fe.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install the project dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Run the build script (assumes `npm run build` is in your package.json)
                sh 'npm run build'
            }
        }

        stage('Start Prod') {
            steps {
                //sh 'npm run start'
                sh 'sudo -u farhan /home/farhan/.nvm/versions/node/v22.9.0/bin/pm2 restart ${PM2_APP_NAME}'
            }
        }
    }

    post {
        success {
            // Notify or deploy after successful build
            echo 'Build successful!'
        }
        failure {
            // Handle build failure (e.g., notify via email, Slack, etc.)
            echo 'Build failed!'
        }
    }
}

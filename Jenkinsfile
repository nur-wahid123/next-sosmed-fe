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

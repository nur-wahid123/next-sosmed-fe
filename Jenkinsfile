pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Pull the code from the Git repository
                git branch: 'main', url: 'https://github.com/nur-wahid123/next-sosmed-fe.git'
            }
        }
        
        stage('Use Secret File') {
            steps {
                withCredentials([file(credentialsId: 'env-fe', variable: 'ENV_FILE')]) {

                        // Remove any existing .env file
                        sh 'rm -f .env'

                        // Use absolute paths for copying the file
                        sh "cp $ENV_FILE '$WORKSPACE/.env'"
                }
            }
        }
        

        stage('Build') {
            steps {
                // Add build steps here (e.g., running tests, building artifacts, etc.)
                echo 'Building...'
                sh 'sudo docker ps'
                sh 'sudo docker build -t next-app .'
                sh 'sudo docker rm next -f'
                sh 'sudo docker run --name next -p 3000:3000 --restart unless-stopped --network pos-app -d next-app'
            }
        }

        stage('Deploy') {
            steps {
                // Add deployment steps here
                echo 'Deploying...'
                sh 'sudo docker image prune -f'
                sh 'sudo docker container prune -f'
            }
        }
    }
}

pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                    sh '''
                        eval "$(ssh-agent -s)"
                        echo "akudiaya" | ssh-add /tmp/id_rsa
                        ssh fajarnurwahid99@35.219.71.84 "cd ~/pos-app/next-sosmed-fe; git pull origin main; docker compose down; docker build -t next-app .;docker compose up -d; docker image prune -a -f"
                    '''
            }
        }
    }
}

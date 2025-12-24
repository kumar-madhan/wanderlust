pipeline {
  agent any

  environment {
    COMPOSE_DOCKER_CLI_BUILD = '1'
    DOCKER_BUILDKIT = '1'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Images') {
      steps {
        sh '''
          docker compose build
        '''
      }
    }

    stage('Start Stack') {
      steps {
        sh '''
          docker compose up -d
        '''
      }
    }

    stage('Smoke Test') {
      steps {
        sh '''
          sleep 10
          curl -f http://localhost:8080
          curl -f http://localhost:8080/api/posts
        '''
      }
    }
  }

  post {
    always {
      sh 'docker ps'
    }
    failure {
      sh 'docker compose logs'
    }
  }
}

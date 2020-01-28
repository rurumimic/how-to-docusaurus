pipeline {
  agent {
    docker {
      image 'node:lts-alpine'
    }

  }
  stages {
    stage('Build Project') {
      steps {
        sh '''yarn install
yarn run build'''
      }
    }

    stage('Build Image') {
      steps {
        sh 'docker build -t my-website .'
      }
    }

    stage('Check') {
      steps {
        sh 'docker images'
      }
    }

  }
}
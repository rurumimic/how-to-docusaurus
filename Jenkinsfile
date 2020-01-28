pipeline {
  agent any
  stages {
    stage('Build Project') {
      agent {
        docker {
          image 'node:lts-alpine'
        }

      }
      steps {
        sh '''yarn install
yarn run build'''
      }
    }

    stage('Build Image') {
      agent any
      steps {
        sh 'docker build -t my-website .'
      }
    }

    stage('Check') {
      agent any
      steps {
        sh 'docker images'
      }
    }

  }
}
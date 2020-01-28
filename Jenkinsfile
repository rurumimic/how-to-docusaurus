pipeline {
  agent any
  stages {
    stage('Build Image') {
      agent any
      steps {
        sh '''yarn install
yarn run build
docker build -t my-website .'''
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
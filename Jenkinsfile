pipeline {
  agent any
  stages {
    stage('Build Image') {
      steps {
        sh '''docker build -t my-website .
docker images'''
      }
    }

  }
}
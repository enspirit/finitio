pipeline {

  agent any

  triggers {
    issueCommentTrigger('.*build this please.*')
  }

  environment {
    SLACK_CHANNEL = '#opensource-cicd'
    DOCKER_REGISTRY = 'docker.io'
  }

  stages {

    stage ('Start') {
      steps {
        cancelPreviousBuilds()
        sendNotifications('STARTED', SLACK_CHANNEL)
      }
    }

    stage ('Building Docker Image') {
      steps {
        container('builder') {
          script {
            sh 'make image'
          }
        }
      }
    }

    stage ('Pushing Docker Image') {
      when {
        anyOf {
          branch 'master'
        }
      }
      steps {
        container('builder') {
          script {
            docker.withRegistry('', 'dockerhub-credentials') {
              sh 'make push-image'
            }
          }
        }
      }
    }
  }

  post {
    success {
      sendNotifications('SUCCESS', SLACK_CHANNEL)
    }
    failure {
      sendNotifications('FAILED', SLACK_CHANNEL)
    }
  }
}
pipeline {

  agent { label 'master' }

  options {

    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '10'))

  } // options

  parameters {

    string(name: 'SLACK_CHANNEL_2',
           description: 'Default Slack channel to send messages to',
           defaultValue: '#test123')           

  } // parameters

  environment {

    // Slack configuration
    SLACK_COLOR_DANGER  = '#E01563'
    SLACK_COLOR_INFO    = '#6ECADC'
    SLACK_COLOR_WARNING = '#FFC300'
    SLACK_COLOR_GOOD    = '#3EB991'

  } // environment

  stages {

    stage("Deliver for stage") {
        when {
                branch 'staging'
            }
      steps {
        script {
          //enable remote triggers
          properties([pipelineTriggers([pollSCM('* * * * *')])])
          // binaries - host machine
            sh 'rm -rf /var/www/staging/html/*'
            sh 'cp -r index.html /var/www/staging/html/'
        } // script
      } // steps
    } // stage

    stage("Deliver for prod") {
           when {
                branch 'master'
            }
      steps {
        script {
            //enable remote triggers
            properties([pipelineTriggers([pollSCM('* * * * *')])])
              sh 'npm instal'
              sh 'rm -rf /var/www/prod/html/*'
              sh 'cp -r index.html /var/www/prod/html/'
        } // script
      } // steps
    } // stage

  } // stages

  post {

    aborted {

      echo "Sending message to Slack"
      slackSend (color: "${env.SLACK_COLOR_WARNING}",
                 channel: "${params.SLACK_CHANNEL_2}",
                 message: "*ABORTED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${env.USER_ID}\n More info at: ${env.BUILD_URL}")
    } // aborted

    failure {

      echo "Sending message to Slack"
      slackSend (color: "${env.SLACK_COLOR_DANGER}",
                 channel: "${params.SLACK_CHANNEL_2}",
                 message: "*FAILED:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${env.USER_ID}\n More info at: ${env.BUILD_URL}")
    } // failure

    success {
      echo "Sending message to Slack"
      slackSend (color: "${env.SLACK_COLOR_GOOD}",
                 channel: "${params.SLACK_CHANNEL_2}",
                 message: "*SUCCESS:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${env.USER_ID}\n More info at: ${env.BUILD_URL}")
    } // success

  } // post
} // pipeline

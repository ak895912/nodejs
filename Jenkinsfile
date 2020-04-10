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
            sh 'ls'
            sh 'npm install'
            sh 'ssh ubuntu@3.15.210.81 "rm -rf /usr/src/app/*"'
            sh 'scp -r * ubuntu@52.34.212.214:/usr/src/app/'
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
            sh 'npm install'
            sh 'ssh ubuntu@3.15.210.81 "rm -rf /usr/src/app/*"'
            sh 'scp -r * ubuntu@52.34.212.214:/usr/src/app/'
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

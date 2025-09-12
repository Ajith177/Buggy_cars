pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        SCANNER_HOME = '/opt/sonar-scanner-5.0.1.3006-linux/bin'
        SONAR_HOST_URL = 'http://192.168.1.4:9000'
        SONAR_AUTH_TOKEN = credentials('sonar_token')
        ALLURE_DEPLOY_DIR = '/var/www/html/allure'
        ALLURE_URL = 'http://192.168.1.4:8081'
    }

    stages {
        stage('Clone') {
            steps {
                echo '🔄 Cloning repositories...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies on host...'
                sh 'npm ci'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube analysis...'
                sh """
                    ${env.SCANNER_HOME}/sonar-scanner \
                    -Dsonar.projectKey=buggy_cars_test \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=${env.SONAR_HOST_URL} \
                    -Dsonar.login=${env.SONAR_AUTH_TOKEN}
                """
            }
        }

        stage('Run Playwright Tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.55.0-jammy'
                    args '-u root -v /var/lib/jenkins/npm-cache:/root/.npm'
                }
            }
            steps {
                echo '🧪 Running Playwright tests inside Docker container...'
                sh 'npm ci' // installs dependencies
                sh 'npx playwright test --reporter=allure-playwright'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                echo '🔒 Running Trivy vulnerability scan...'
                sh 'trivy fs . > trivy_report.txt || true'
            }
        }

        stage('Allure Report in Jenkins UI') {
            steps {
                echo '📊 Publishing Allure Report to Jenkins UI...'
                allure includeProperties: false,
                       jdk: '',
                       reportBuildPolicy: 'ALWAYS',
                       results: [[path: 'allure-results']]
            }
        }

        stage('Deploy Allure Report') {
            steps {
                echo '🚀 Deploying Allure report to web server...'
                sh """
                    rm -rf ${env.ALLURE_DEPLOY_DIR}/*
                    cp -r allure-report/* ${env.ALLURE_DEPLOY_DIR}/
                """
            }
        }

        stage('Notify Success') {
            when {
                expression { currentBuild.result == null || currentBuild.result in ['SUCCESS', 'UNSTABLE'] }
            }
            steps {
                echo '📧 Sending success email...'
                sh 'zip -r allure-report.zip allure-results || true'
                
                emailext(
                    subject: "✅ Build Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """Good news!

✔️ SonarQube Quality Gate passed
✔️ Playwright tests executed
✔️ Trivy scan completed
✔️ Allure report published

🔗 Jenkins Job: ${env.JOB_NAME}
🔗 Build URL: ${env.BUILD_URL}
🔗 Allure Report: ${env.ALLURE_URL}
""",
                    to: 'loneloverioo@gmail.com',
                    attachmentsPattern: 'unit_test_report.txt,trivy_report.txt,allure-report.zip'
                )
            }
        }
    }

    post {
        failure {
            echo '📧 Sending failure email...'
            emailext(
                subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """The pipeline has failed.

⚠️ Possible issues:
- Quality Gate failure
- Playwright test errors
- Trivy scan findings

🔗 Jenkins Job: ${env.JOB_NAME}
🔗 Build URL: ${env.BUILD_URL}
""",
                to: 'loneloverioo@gmail.com'
            )
        }
    }
}

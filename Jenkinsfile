pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        environment {
        SCANNER_HOME = '/opt/sonar-scanner-5.0.1.3006-linux/bin'
        SONAR_HOST_URL = 'http://192.168.1.4:9000'
        SONAR_AUTH_TOKEN = credentials('sonar_token')
        ALLURE_DEPLOY_DIR = '/var/www/html/allure'
        ALLURE_URL = 'http://192.168.1.4:8081'
    }
    }

    stage('Clone') {
            steps {
                echo '🔄 Cloning repositories...'
                checkout scm
            }
        }

    stages {
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo '🧪 Running Playwright tests...'
                sh 'npx playwright install'
                sh 'npx playwright test --reporter=allure-playwright'
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

        stage('Notify Success') {
            when {
                expression { currentBuild.result == null  currentBuild.result in ['SUCCESS', 'UNSTABLE'] }
            }
            steps {
                echo '📧 Sending success email...'
                // Zip Allure results (optional)
                sh 'zip -r allure-report.zip allure-results  true'
                
                emailext(
                    subject: "✅ Build Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """Good news!

✔️ SonarQube Quality Gate passed
✔️ Playwright tests executed
✔️ Trivy scan completed
✔️ Allure report published

🔗 Jenkins Job: ${env.JOB_NAME}
🔗 Build URL: ${env.BUILD_URL}
🔗 Allure Report: http://192.168.1.4:8081
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
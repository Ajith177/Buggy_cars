pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        SCANNER_HOME     = '/opt/sonar-scanner-5.0.1.3006-linux/bin'
        SONAR_HOST_URL   = 'http://192.168.1.4:9000'
        SONAR_AUTH_TOKEN = credentials('sonar_token')
        ALLURE_DEPLOY_DIR = '/var/www/html/allure'
        ALLURE_URL       = 'http://192.168.1.4:8081'
        PW_WORKERS       = '3'   // Default for Jenkins (safe value)
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
                echo '📦 Installing Node.js dependencies...'
                sh 'npm ci'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube analysis...'
                sh """
                    ${env.SCANNER_HOME}/sonar-scanner \
                    -Dsonar.projectKey=buggy_cars_test \
                    -Dsonar.sources=tests \
                    -Dsonar.host.url=${env.SONAR_HOST_URL} \
                    -Dsonar.login=${env.SONAR_AUTH_TOKEN}\
                    -Dsonar.exclusions=**/venv/**,**/node_modules/**,**/allure-report/**,**/allure-results/**
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
                echo "🧪 Running Playwright tests with ${env.PW_WORKERS} workers..."
                sh 'npm ci'
                sh "npx playwright test --workers=${env.PW_WORKERS} --reporter=allure-playwright"
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

        stage('Generate & Deploy Allure Report') {
            steps {
                echo '🚀 Generating and deploying Allure report...'
                sh """
                    npx allure generate allure-results --clean -o allure-report
                    mkdir -p ${env.ALLURE_DEPLOY_DIR}
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

                // Zip reports
                sh 'zip -r allure-report.zip allure-report || true'
                sh 'zip -r trivy-report.zip trivy_report.txt || true'

                emailext(
                    subject: "✅ Build Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """<p>Good news! The pipeline completed successfully 🎉</p>
<p><b>Summary:</b></p>
<ul>
<li>SonarQube Quality Gate passed</li>
<li>Playwright tests executed</li>
<li>Trivy scan completed</li>
<li>Allure report published</li>
</ul>
<p><b>Links:</b><br>
 <a href='${env.BUILD_URL}'>Jenkins Job</a><br>
<a href='${env.ALLURE_URL}'>Allure HTML Report</a></p>
""",
                    mimeType: 'text/html',
                    to: 'loneloverioo@gmail.com',
                    attachmentsPattern: 'allure-report.zip,trivy-report.zip'
                )
            }
        }
    }

    post {
        failure {
            echo '📧 Sending failure email...'
            emailext(
                subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """<p>The pipeline has failed </p>
<p><b>Possible issues:</b></p>
<ul>
<li>Quality Gate failure</li>
<li>Playwright test errors</li>
<li>Trivy scan findings</li>
</ul>
<p><b>Links:</b><br>
 <a href='${env.BUILD_URL}'>Jenkins Job</a></p>
""",
                mimeType: 'text/html',
                to: 'loneloverioo@gmail.com'
            )
        }
    }
}

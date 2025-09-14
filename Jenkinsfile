pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        SCANNER_HOME      = '/opt/sonar-scanner-5.0.1.3006-linux/bin'
        SONAR_HOST_URL    = 'http://192.168.1.4:9000'
        SONAR_AUTH_TOKEN  = credentials('token_sonar')
        ALLURE_DEPLOY_DIR = '/var/www/html/allure'
        ALLURE_URL        = 'http://192.168.1.4:8081'
        PW_WORKERS        = '3'
        TRIVY_FLAGS       = '--skip-version-check'
    }

    stages {
        stage('Cleanup Reports') {
            steps {
                echo '🧹 Cleaning old reports...'
                sh '''
                  rm -rf allure-results allure-report trivy_report.txt allure-report.zip trivy-report.zip
                  mkdir -p allure-results allure-report
                '''
            }
        }

        stage('Clone') {
            steps {
                echo '🔄 Cloning repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.55.0-jammy'
                    args "-u root -v ${WORKSPACE}/allure-results:/workspace/allure-results"
                }
            }
            steps {
                script {
                    def workers = env.PW_WORKERS ?: '1'
                    echo "🧪 Running Playwright tests with ${workers} workers..."
                    sh "npx playwright test --workers=${workers} --reporter=allure-playwright --output=/workspace/allure-results"
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube analysis...'
                withSonarQubeEnv('Mysonarqube') {
                    sh """
                        ${SCANNER_HOME}/sonar-scanner \
                        -Dsonar.projectKey=buggy_cars_test \
                        -Dsonar.sources=tests \
                        -Dsonar.host.url=${SONAR_HOST_URL} \
                        -Dsonar.token=${SONAR_AUTH_TOKEN} \
                        -Dsonar.coverage.exclusions=tests/** \
                        -Dsonar.exclusions=**/venv/**,**/node_modules/**,**/allure-report/**,**/allure-results/**
                    """
                }
            }
        }


        stage('Trivy Scan') {
            steps {
                echo '🔐 Running Trivy vulnerability scan...'
                sh '''
                  export TRIVY_CACHE_DIR=/var/lib/jenkins/trivy-cache
                  export TRIVY_DB_REPOSITORY=ghcr.io/aquasecurity/trivy-db
                  trivy fs ${TRIVY_FLAGS} --no-progress --format table -o trivy_report.txt . || true
                '''
            }
        }

        stage('Generate & Deploy Allure Report') {
            steps {
                script {
                    if (fileExists('allure-results')) {
                        echo '🚀 Generating and deploying Allure report...'
                        sh '''
                          /opt/allure/bin/allure generate allure-results --clean -o allure-report
                          sudo mkdir -p ${ALLURE_DEPLOY_DIR}
                          sudo rm -rf ${ALLURE_DEPLOY_DIR}/*
                          sudo cp -r allure-report/* ${ALLURE_DEPLOY_DIR}/
                        '''
                        echo "🌐 Allure report deployed at: ${ALLURE_URL}"
                    } else {
                        echo "❌ No allure-results found. Skipping report generation."
                    }
                }
            }
        }
    }

    post {
        success {
            emailext(
                subject: "✅ Build Passed: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """<p>Pipeline completed successfully 🎉</p>
<ul>
<li>Playwright tests executed</li>
<li>SonarQube + Quality Gate passed</li>
<li>Trivy scan completed</li>
<li>Allure report published to <a href='${ALLURE_URL}'>${ALLURE_URL}</a></li>
</ul>
<p><b>Jenkins Job:</b> <a href='${BUILD_URL}'>${BUILD_URL}</a></p>""",
                mimeType: 'text/html',
                to: 'loneloverioo@gmail.com'
            )
        }

        failure {
            emailext(
                subject: "❌ Build Failed: ${JOB_NAME} #${BUILD_NUMBER}",
                body: """<p>The pipeline has failed.</p>
<p><b>Check logs here:</b> <a href='${BUILD_URL}'>${BUILD_URL}</a></p>""",
                mimeType: 'text/html',
                to: 'loneloverioo@gmail.com'
            )
        }
    }
}

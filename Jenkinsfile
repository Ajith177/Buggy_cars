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
                echo '🧹 Cleaning old reports (Allure + Trivy)...'
                sh '''
                  rm -rf allure-results allure-report trivy_report.txt trivy-report.zip allure-report.zip
                  mkdir -p allure-results allure-report
                  chmod -R 755 allure-results allure-report
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
                    args "-u root -v /var/lib/jenkins/npm-cache:/root/.npm -v ${WORKSPACE}/allure-results:/workspace/allure-results"
                }
            }
            steps {
                script {
                    def workers = env.PW_WORKERS ?: '1'
                    echo "🧪 Running Playwright tests with ${workers} workers..."

                    timeout(time: 15, unit: 'MINUTES') {
                        sh 'npm ci'
                        sh "npx playwright test --workers=${workers} --reporter=allure-playwright --output=/workspace/allure-results"
                    }
                }
            }
            post {
                always {
                    echo '🧹 Cleaning up Docker containers...'
                    sh 'docker ps -aq --filter "status=exited" | xargs -r docker rm -f || true'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube analysis...'
                withSonarQubeEnv('Mysonarqube') {
                    sh """
                        ${env.SCANNER_HOME}/sonar-scanner \
                        -Dsonar.projectKey=buggy_cars_test \
                        -Dsonar.sources=tests \
                        -Dsonar.host.url=${env.SONAR_HOST_URL} \
                        -Dsonar.token=${env.SONAR_AUTH_TOKEN} \
                        -Dsonar.cpd.exclusions=tests/** \
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
                  rm -f trivy_report.txt trivy-report.zip
                  export TRIVY_CACHE_DIR=/var/lib/jenkins/trivy-cache
                  export TRIVY_DB_REPOSITORY=ghcr.io/aquasecurity/trivy-db
                  trivy fs ${TRIVY_FLAGS} --no-progress --format table -o trivy_report.txt . || true
                '''
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
                script {
                    if (fileExists('allure-results')) {
                        echo '🚀 Generating and deploying Allure report...'
                        sh '''
                          /opt/allure/bin/allure generate allure-results --clean -o allure-report
                          sudo mkdir -p ${ALLURE_DEPLOY_DIR}
                          sudo rm -rf ${ALLURE_DEPLOY_DIR}/*
                          sudo cp -r allure-report/* ${ALLURE_DEPLOY_DIR}/
                        '''
                    } else {
                        echo "❌ No allure-results found. Skipping report generation."
                    }
                }
            }
        }

        stage('Notify Success') {
            when {
                expression { currentBuild.result == null || currentBuild.result in ['SUCCESS', 'UNSTABLE'] }
            }
            steps {
                script {
                    echo '📧 Sending success email...'
                    sh 'zip -r allure-report.zip allure-report || true'
                    sh 'zip -r trivy-report.zip trivy_report.txt || true'

                    emailext(
                        subject: "✅ Build Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """<p>Pipeline completed successfully 🎉</p>
<ul>
<li>Playwright tests executed</li>
<li>Trivy scan completed</li>
<li>Allure report published</li>
</ul>
<p><b>Links:</b><br>
<a href='${env.BUILD_URL}'>Jenkins Job</a><br>
<a href='${env.ALLURE_URL}'>Allure HTML Report</a></p>""",
                        mimeType: 'text/html',
                        to: 'loneloverioo@gmail.com',
                        attachmentsPattern: 'allure-report.zip,trivy-report.zip'
                    )
                }
            }
        }
    }

    post {
        failure {
            echo '📧 Sending failure email...'
            emailext(
                subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """<p>The pipeline has failed</p>
<ul>
<li>Playwright test errors</li>
<li>Trivy scan findings</li>
</ul>
<p><b>Links:</b><br>
<a href='${env.BUILD_URL}'>Jenkins Job</a></p>""",
                mimeType: 'text/html',
                to: 'loneloverioo@gmail.com'
            )
        }
    }
}

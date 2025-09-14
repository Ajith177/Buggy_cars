pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'Mysonarqube'      // Your SonarQube server config name
        ALLURE_DEPLOY_DIR = '/var/www/html/allure' // Web server dir for Allure
    }

    stages {
        stage('Cleanup Reports') {
            steps {
                echo '🧹 Cleaning old reports (Allure + Trivy)...'
                sh '''
                  # Allure cleanup
                  rm -rf allure-results allure-report
                  mkdir -p allure-results allure-report
                  chmod -R 755 allure-results allure-report

                  # Trivy cleanup
                  rm -f trivy_report.txt trivy-report.zip
                '''
            }
        }

        stage('Checkout Code') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        stage('Setup Python Env') {
            steps {
                echo '🐍 Setting up Python virtual environment...'
                sh '''
                  python3.11 -m venv venv
                  . venv/bin/activate
                  pip install --upgrade pip
                  pip install -r requirements.txt
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo '🧪 Running unit tests with pytest...'
                sh '''
                  . venv/bin/activate
                  pytest --alluredir=allure-results || true
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube analysis...'
                withSonarQubeEnv("${SONARQUBE_SERVER}") {
                    sh '''
                      . venv/bin/activate
                      sonar-scanner \
                        -Dsonar.projectKey=buggy_cars_test \
                        -Dsonar.sources=. \
                        -Dsonar.python.version=3.11 \
                        -Dsonar.host.url=http://192.168.1.4:9000 \
                        -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                echo '🔐 Running Trivy vulnerability scan...'
                sh '''
                  rm -f trivy_report.txt
                  export TRIVY_CACHE_DIR=/var/lib/jenkins/trivy-cache
                  export TRIVY_DB_REPOSITORY=ghcr.io/aquasecurity/trivy-db
                  trivy fs --skip-version-check --no-progress --format table -o trivy_report.txt . || true
                '''
            }
        }

        stage('Allure Report in Jenkins UI') {
            steps {
                echo '📊 Publishing Allure Report to Jenkins UI...'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }

        stage('Generate & Deploy Allure Report') {
            steps {
                echo '🚀 Generating and deploying Allure report...'
                sh '''
                  npx allure generate allure-results --clean -o allure-report
                  sudo mkdir -p ${ALLURE_DEPLOY_DIR}
                  sudo rm -rf ${ALLURE_DEPLOY_DIR}/*
                  sudo cp -r allure-report/* ${ALLURE_DEPLOY_DIR}/
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline finished successfully!'
            emailext to: 'loneloverioo@gmail.com',
                     subject: "✅ Buggy Cars Pipeline Success",
                     body: "All stages completed successfully. Allure report available at http://192.168.1.4:8081"
        }
        failure {
            echo '📧 Sending failure email...'
            emailext to: 'loneloverioo@gmail.com',
                     subject: "❌ Buggy Cars Pipeline Failed",
                     body: "Some stages failed. Please check Jenkins console output."
        }
    }
}

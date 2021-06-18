aws login --profile gmandava-sbx

npm run build
npx cdk bootstrap --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess
npx cdk bootstrap --profile gmandava-sbx

npx cdk synth
npx cdk diff

npx cdk deploy

aws login --profile gmandava-sbx

npm run build
npx cdk bootstrap --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess
npx cdk bootstrap --profile gmandava-sbx

npx cdk synth --profile gmandava-sbx
npx cdk diff --profile gmandava-sbx

npx cdk deploy --profile gmandava-sbx

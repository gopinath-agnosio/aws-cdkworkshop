# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkworkspaceStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


 ## CDK Execution Commands:

* `cdk init sample-app --language typescript` creation of new TypeScript CDK application project.

* `npm run watch` watch for changes and compile
* `cdk synth` Generate the CloudFormation Template
* `cdk bootstrap` to install the bootstrap stack into an environment.
* `cdk deploy`  to deploy a CDK App. Simillar to Apply.
* `cdk diff` to check the difference from previous deployed instances. Simillar to Plan.  



New Pipelines:
* `cdk synth`
* `npx cdk bootstrap --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess `


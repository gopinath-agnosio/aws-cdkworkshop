import * as cdk from '@aws-cdk/core';
import * as codeCommit from '@aws-cdk/aws-codecommit';
import { ConcreteDependable } from '@aws-cdk/core';

export class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
 
        //create a CodeCommit repository called 'WorkshopRepo'
        new codeCommit.Repository(this, 'WorkshopRepo', {
            repositoryName: "WorkshopRepo"
        });
    }
}
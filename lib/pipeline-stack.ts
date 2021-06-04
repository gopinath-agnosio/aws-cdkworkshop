import * as cdk from '@aws-cdk/core';
import { ConcreteDependable } from '@aws-cdk/core';
import * as codeCommit from '@aws-cdk/aws-codecommit';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { SimpleSynthAction, CdkPipeline } from '@aws-cdk/pipelines';

export class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
 
        //create a CodeCommit repository called 'WorkshopRepo'
        const repo = new codeCommit.Repository(this, 'WorkshopRepo', {
            repositoryName: "WorkshopRepo"
        });

        // Define the artifact representing the sourcecode
        const sourceArtifact = new codepipeline.Artifact();

        //Define the artifact representing the cloud assembly
        // (cloudformation template + all other assets)
        const cloudAssemblyArtifact = new codepipeline.Artifact();

        //The basic pipeline declaration. This sets the initial structure of our pipeline

    new CdkPipeline(this, 'Pipeline', {
        pipelineName: 'WorkshopPipeline',
        cloudAssemblyArtifact,

        //generates the source artifact from the repo we created in the last step
        sourceAction: new codepipeline_actions.CodeCommitSourceAction({
            actionName: 'CodeCommit', // Any Git-based source control
            output: sourceArtifact,   // Indicates where the artifact is stored.
            repository: repo
        }),

        //Builds our source code outlined above into a cloud assembly artifact
        synthAction: SimpleSynthAction.standardNpmSynth({
            sourceArtifact,                 // where to get the source code to build
            cloudAssemblyArtifact,          // where to place build source
            
            buildCommand: 'npm run build'   // Language specific build cmd

        })
    });

    }
}
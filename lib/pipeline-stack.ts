import * as cdk from '@aws-cdk/core';
import * as codecommit from '@aws-cdk/aws-codecommit';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { WorkshopPipelineStage } from './pipeline-stage';
import { SimpleSynthAction, CdkPipeline, ShellScriptAction } from '@aws-cdk/pipelines';
import { SecretValue } from '@aws-cdk/core';
//import * as ssm from '@aws-cdk/aws-ssm';

export class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
 
        //create a CodeCommit repository called 'WorkshopRepo'
        /*
        const repo = new codecommit.Repository(this, 'WorkshopRepo', {
            repositoryName: "WorkshopRepo"
        });
        */

        // Define the artifact representing the sourcecode
        const sourceArtifact = new codepipeline.Artifact('SourceArtifact');

        //Define the artifact representing the cloud assembly
        // (cloudformation template + all other assets)
        const cloudAssemblyArtifact = new codepipeline.Artifact("BuildArtifact");

        //const gitHubSecureToken = ssm.StringParameter.valueFromLookup(
        //    this, 'agnos-github-token');

        const oauthToken = SecretValue.secretsManager('agnos-github-token', {});

        //The basic pipeline declaration. This sets the initial structure of our pipeline
        const pipeline = new CdkPipeline(this, 'Pipeline', {
            pipelineName: 'WorkshopPipeline',
            cloudAssemblyArtifact: cloudAssemblyArtifact,
            
            /*
            //generates the source artifact from the repo we created in the last step
            sourceAction: new codepipeline_actions.CodeCommitSourceAction({
                actionName: 'CodeCommit', // Any Git-based source control
                output: sourceArtifact,   // Indicates where the artifact is stored.
                repository: repo
            }), 
            */
           
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: 'GitHubSource',
                output: sourceArtifact,
                oauthToken: oauthToken,
                trigger: codepipeline_actions.GitHubTrigger.WEBHOOK,
                owner: 'gopinath-agnosio',
                repo: 'aws-cdkworkshop',
                branch: 'main'
            }),

            //Builds our source code outlined above into a cloud assembly artifact
           
            synthAction: SimpleSynthAction.standardNpmSynth({
                sourceArtifact: sourceArtifact,                 // where to get the source code to build
                cloudAssemblyArtifact: cloudAssemblyArtifact,          // where to place build source
                //buildCommand: 'npm run build',   // Language specific build cmd
                //synthCommand: 'cdk synth'
            })
            
            /*
            synthAction: new SimpleSynthAction({
                sourceArtifact: sourceArtifact,                 // where to get the source code to build
                cloudAssemblyArtifact: cloudAssemblyArtifact,          // where to place build source
                installCommands: [ 
                   'npm install -g aws-cdk',
                   'npm install -g typescript' 
                ],
                buildCommands: [
                   'npm i --save', 
                   'npm run build' 
                ],   // Language specific build cmd
                synthCommand: 'npx cdk synth'
            })
            */

        });

        const deploy = new WorkshopPipelineStage(this, 'Deploy');
        const deployStage = pipeline.addApplicationStage(deploy);
        deployStage.addActions(new ShellScriptAction({
            actionName: 'TestViewerEndpoint',
            useOutputs: {
                ENDPOINT_URL: pipeline.stackOutput(deploy.hcViewerUrl)
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL'
            ]
        }));

        deployStage.addActions(new ShellScriptAction({
            actionName: 'TestAPIGatewayEndpoint',
            useOutputs: {
                ENDPOINT_URL: pipeline.stackOutput(deploy.hcEndpoint)
            },
            commands: [
                'curl -Ssf $ENDPOINT_URL/',
                'curl -Ssf $ENDPOINT_URL/hello',
                'curl -Ssf $ENDPOINT_URL/test'
            ]
        }));
    }
}
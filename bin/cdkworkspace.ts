#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { clearScreenDown } from 'readline';
//import { CdkworkspaceStack } from '../lib/cdkworkspace-stack';
import { WorkshopPipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();

const props = {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    },
};

//new CdkworkspaceStack(app, 'CdkworkspaceStack');
new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack', { ...props } );

app.synth();
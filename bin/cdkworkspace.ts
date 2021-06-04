#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
//import { CdkworkspaceStack } from '../lib/cdkworkspace-stack';
import { WorkshopPipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
//new CdkworkspaceStack(app, 'CdkworkspaceStack');
new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack');
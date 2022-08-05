import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class FirstStepCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new NodejsFunction(this, 'lamdbaId', {
      functionName: 'sum_numbers',
      description: 'example',
      memorySize: 32,
      runtime: Runtime.NODEJS_16_X,
      entry: 'code/sum_numbers/index.ts',
      handler: 'main'
    })
  }
}

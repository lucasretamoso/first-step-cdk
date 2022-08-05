import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RestApi, Cors, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class FirstStepCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new NodejsFunction(this, 'lambdaId', {
      functionName: 'sum_numbers',
      description: 'example',
      memorySize: 256,
      runtime: Runtime.NODEJS_16_X,
      entry: 'code/sum_numbers/index.ts',
      handler: 'main'
    })

    const api = new RestApi(this, 'restApiID', {
      restApiName: 'first_step_cdk_api',
      deployOptions: {
        stageName: 'staging',
      },
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
    })

    const resourceSumNumbers = api.root.addResource('sum_numbers')

    const integrations = new LambdaIntegration(lambdaFunction)

    resourceSumNumbers.addMethod('POST', integrations);
  }
}

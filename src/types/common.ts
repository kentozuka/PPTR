export interface dotEnvSchema extends NodeJS.ProcessEnv {
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: string;
  ABN: string;
  AAKI: string;
  ASAK: string;
}

export interface Environment {
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
}

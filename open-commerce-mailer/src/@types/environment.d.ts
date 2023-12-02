export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KAFKA_BROKERS: [string];
      SMTP_HOST: string;
      SMTP_PORT: number;
      SMTP_USER: string;
      SMTP_PASSWORD: string;
    }
  }
}

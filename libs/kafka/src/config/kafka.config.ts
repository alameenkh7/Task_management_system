export const kafkaConfig = {
  client: {
    brokers: ['localhost:9092'],
  },
  consumer: {
    groupId: 'default-group',
  },
};

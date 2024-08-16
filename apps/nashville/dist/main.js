"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const producer_service_1 = require("./producer.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const producerService = app.get(producer_service_1.ProducerService);
    await producerService.sendMessage('test-topic', { key: 'value' });
    const port = process.env.PORT || 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map
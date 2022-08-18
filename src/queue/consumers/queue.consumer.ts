import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('queue')
export class QueueConsumer {
    @Process()
    async transcode(job: Job<unknown>) {
        console.log(job.data);
        console.log('Do something with ', job.data);
    }
}

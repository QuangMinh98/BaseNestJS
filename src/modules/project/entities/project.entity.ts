import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { District } from 'src/modules/district';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ required: true })
    projectId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    districtId: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

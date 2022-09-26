import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { District } from 'src/modules/district';

export type WardDocument = Ward & Document;

@Schema()
export class Ward {
    @Prop({ required: true })
    wardId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    districtId: Types.ObjectId;
}

export const WardSchema = SchemaFactory.createForClass(Ward);

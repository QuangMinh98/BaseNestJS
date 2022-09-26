import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { City } from 'src/modules/city';

export type DistrictDocument = District & Document;

@Schema()
export class District {
    @Prop({ required: true })
    districtId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    cityId: Types.ObjectId;
}

export const DistrictSchema = SchemaFactory.createForClass(District);

DistrictSchema.virtual('city', {
    ref: City.name,
    localField: 'cityId',
    foreignField: '_id',
    justOne: true
});

DistrictSchema.set('toJSON', { virtuals: true });

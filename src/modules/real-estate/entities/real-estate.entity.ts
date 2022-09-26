import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type RealEstateDocument = RealEstate & Document;

@Schema()
export class RealEstate {
    @Prop({ required: true })
    realEstateId: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    price: number;

    @Prop({ required: true })
    area: number;

    @Prop()
    pricePerM2: number;

    @Prop()
    images: string[];

    @Prop()
    videoUrl: string;

    @Prop()
    description: string;

    @Prop()
    houseDirection: string;

    @Prop()
    balconyDirection: string;

    @Prop()
    numberOfBedRooms: number;

    @Prop()
    numberOfToilets: number;

    @Prop()
    juridical: string;

    @Prop()
    furniture: string;

    @Prop()
    moreInfomation: string;

    @Prop()
    contentItems: {
        key: string;
        value: string;
    }[];

    @Prop()
    keywords: string[];

    @Prop()
    ggMapUrl: string;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    districtId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    wardId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    streetId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId })
    projectId: Types.ObjectId;

    @Prop()
    postingDate: number;

    @Prop()
    expireDate: number;
}

export const RealEstateSchema = SchemaFactory.createForClass(RealEstate);

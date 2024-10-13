import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Customer{

    @Prop({ required: true })
    customerName: string;
    
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNo: string;

    @Prop({ required: true })
    password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Seller {

    @Prop({ required: true })
    sellerName: string;  

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNo: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    bankName:string;

    @Prop({ required: true })
    accountNo:string;

    @Prop({ required: true })
    ifscCode:string;
    
    @Prop({ required: true })
    gstno:string;

    @Prop({ required: true })
    password:string;


    @Prop()  
    refreshToken?: string;
}

export const SellerSchema = SchemaFactory.createForClass(Seller)
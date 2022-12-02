import mongoose from "mongoose";

interface IProduct {
  productName: string;
  productStock: number;
  productSaler: string;
}

interface ProductDoc extends mongoose.Document {
  productName: string;
  productStock: number;
  productSaler: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(product: IProduct): ProductDoc;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    productName: {
      type: String,
    },
    productStock: {
      type: Number,
    },
    productSaler: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

productSchema.statics.build=(productBody:IProduct)=>{
    return new Product(productBody);
}

const Product =mongoose.model<ProductDoc,ProductModel>('Product',productSchema)

export{ Product }
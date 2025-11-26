import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Boolean, default: false })
  published: boolean;

  @Prop({ type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' })
  status: string;

  @Prop({ type: Date, default: Date.now })
  publishedAt: Date;

  @Prop({ type: Types.ObjectId, required: true })
  authorId: Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// {
//   "_id": {
//     "type": "ObjectId",
//     "description": "MongoDB's unique identifier. Corresponds to Prisma's 'id' field, which is often an ObjectId in MongoDB connectors."
//   },
//   "title": {
//     "type": "String",
//     "description": "The title of the post."
//   },
//   "content": {
//     "type": "String",
//     "description": "The main body/content of the post."
//   },
//   "published": {
//     "type": "Boolean",
//     "default": false,
//     "description": "Whether the post is publicly visible."
//   },
//   "status": {
//     "type": "String",
//     "enum": ["DRAFT", "PUBLISHED", "ARCHIVED"],
//     "default": "DRAFT",
//     "description": "The current editorial status of the post."
//   },
//   "publishedAt": {
//     "type": "Date",
//     "default": "ISODate() (Timestamp of creation)",
//     "description": "The date and time the post was created or last updated. Note: The Prisma default 'now()' usually maps to the document creation timestamp."
//   },
//   "authorId": {
//     "type": "ObjectId",
//     "description": "The ID of the User document who authored this post. This is the foreign key for the 'author' relation."
//   }
// }

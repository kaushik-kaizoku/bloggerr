import { Injectable } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument, Blog } from './schema/blogs.schema';
import { Types } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllBlogs(): Promise<BlogDocument[]> {
    const blogs = await this.blogModel
      .find()
      .where('status')
      .equals('PUBLISHED')
      .exec();
    return blogs;
  }

  async getBlogById(id: string): Promise<BlogDocument> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new Error(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async createBlog(blog: BlogDto): Promise<BlogDocument> {
    const newBlog = new this.blogModel({
      ...blog,
      authorId: new Types.ObjectId(blog.authorId),
    });
    return await newBlog.save();
  }

  async deleteBlog(id: string) {
    const blog = await this.blogModel.findByIdAndDelete(id).exec();
    return blog;
  }

  async updateBlog(id: string, blog: BlogDto): Promise<BlogDocument> {
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(
        id,
        { ...blog, authorId: new Types.ObjectId(blog.authorId) },
        { new: true },
      )
      .exec();
    if (!updatedBlog) {
      throw new Error(`Blog with id ${id} not found`);
    }
    return updatedBlog;
  }
}

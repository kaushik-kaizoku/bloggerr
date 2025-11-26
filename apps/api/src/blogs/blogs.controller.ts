import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  async fetchAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  async fetchBlogById(@Query('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Post()
  async createBlog(@Body() blog: BlogDto) {
    return this.blogService.createBlog(blog);
  }

  @Delete(':id')
  async deleteBlog(@Query('id') id: string) {
    return this.blogService.deleteBlog(id);
  }

  @Patch(':id')
  async updateBlog(@Query('id') id: string, @Body() blog: BlogDto) {
    return this.blogService.updateBlog(id, blog);
  }
}

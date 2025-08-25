import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = new this.blogModel(createBlogDto);
    return blog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true });
    if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);
    return blog;
  }

  async replace(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.findOneAndReplace({ _id: id }, updateBlogDto, { new: true });
    if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);
    return blog;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Blog with ID ${id} not found`);
  }
}

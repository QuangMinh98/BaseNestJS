import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/modules/project';
import { BaseRepository } from '../base-repository';

@Injectable()
export class ProjectRepository extends BaseRepository<ProjectDocument> {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {
        super(projectModel);
    }
}

import { NotFoundException } from '@nestjs/common';
import {
    AnyKeys,
    Document,
    FilterQuery,
    InsertManyOptions,
    MergeType,
    Model,
    QueryOptions,
    RequireOnlyTypedId,
    UpdateQuery,
    UpdateWithAggregationPipeline,
    UpdateWriteOpResult
} from 'mongoose';

export abstract class BaseRepository<T extends Document> {
    private _repository: Model<T>;

    constructor(private readonly model: Model<T>) {
        this._repository = model;
    }

    get name() {
        return this._repository.collection.name;
    }

    async countDocuments(entityFilterQuery?: FilterQuery<T>, options?: QueryOptions<T>): Promise<number> {
        return this._repository.countDocuments(entityFilterQuery, options);
    }

    async create(...docs: (T | AnyKeys<T>)[]): Promise<T[]> {
        return this._repository.create(docs);
    }

    async insertMany(
        docs: T[],
        options: InsertManyOptions & {
            lean: true;
        }
    ): Promise<MergeType<MergeType<T, T>, RequireOnlyTypedId<T>>[]> {
        return this._repository.insertMany(docs, options);
    }

    async findAndPaging(
        pagingOptions: { page: number; limit: number },
        entityFilterQuery?: FilterQuery<T>,
        projection?: Record<string, unknown>,
        options?: QueryOptions<T>
    ): Promise<T[]> {
        const { page, limit } = pagingOptions;
        const skip = (page - 1) * limit;

        return this._repository.find(
            entityFilterQuery,
            {
                _v: 0,
                ...projection
            },
            {
                ...options,
                limit,
                skip
            }
        );
    }

    async find(
        entityFilterQuery?: FilterQuery<T>,
        projection?: Record<string, unknown>,
        options?: QueryOptions<T>
    ): Promise<T[]> {
        return this._repository.find(
            entityFilterQuery,
            {
                _v: 0,
                ...projection
            },
            options
        );
    }

    async findAndCountAll(
        entityFilterQuery?: FilterQuery<T>,
        projection?: Record<string, unknown>,
        options?: QueryOptions<T>
    ): Promise<{
        rows: T[];
        totalDocuments: number;
    }> {
        const [rows, totalDocuments] = await Promise.all([
            this.find(entityFilterQuery, projection, options),
            this.countDocuments(entityFilterQuery)
        ]);

        return { rows, totalDocuments };
    }

    async findOneOrFailed(
        entityFilterQuery?: FilterQuery<T>,
        projection?: Record<string, unknown>,
        options?: QueryOptions<T>,
        err?: any
    ): Promise<T> {
        const data = await this.findOne(entityFilterQuery, projection, options);
        if (!data) throw new NotFoundException(err);

        return data;
    }

    async findByIdOrFailed(
        _id: string,
        projection?: Record<string, unknown>,
        options?: QueryOptions<T>,
        err?: any
    ): Promise<T> {
        const data = await this.findById(_id, projection, options);
        if (!data) throw new NotFoundException(err);

        return data;
    }

    async findByIdAndUpdateOrFailed(
        _id: string,
        update?: UpdateQuery<T>,
        options?: QueryOptions<T>,
        err?: any
    ): Promise<T> {
        const data = await this.findByIdAndUpdate(_id, update, options);
        if (!data) throw new NotFoundException(err);

        return data;
    }

    async findOneAndUpdateOrFailed(
        filter?: FilterQuery<T>,
        update?: UpdateQuery<T>,
        options?: QueryOptions<T>,
        err?: any
    ): Promise<T> {
        const data = await this.findOneAndUpdate(filter, update, options);
        if (!data) throw new NotFoundException(err);

        return data;
    }

    async findByIdAndDeleteOrFailed(_id: string, options?: QueryOptions<T>, err?: any): Promise<T> {
        const data = await this.findByIdAndDelete(_id, options);
        if (!data) throw new NotFoundException(err);

        return data;
    }

    async findOneAndDeleteOrFailed(filter?: FilterQuery<T>, options?: QueryOptions<T>, err?: any): Promise<T> {
        const data = await this.findOneAndDelete(filter, options);
        if (!data) throw new NotFoundException(err);

        return data;
    }

    async findOne(
        entityFilterQuery?: FilterQuery<T>,
        projection?: Record<string, unknown>,
        options?: QueryOptions<T>
    ): Promise<T> {
        return this._repository.findOne(
            entityFilterQuery,
            {
                _v: 0,
                ...projection
            },
            options
        );
    }

    async findById(_id: string, projection?: Record<string, unknown>, options?: QueryOptions<T>): Promise<T> {
        return this._repository.findById(
            _id,
            {
                _v: 0,
                ...projection
            },
            options
        );
    }

    async findByIdAndUpdate(_id: string, update?: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T> {
        return this._repository.findByIdAndUpdate(_id, update, options);
    }

    async findOneAndUpdate(filter?: FilterQuery<T>, update?: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T> {
        return this._repository.findOneAndUpdate(filter, update, options);
    }

    async findOneAndDelete(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<T> {
        return this._repository.findOneAndDelete(filter, options);
    }

    async findByIdAndDelete(_id: string, options?: QueryOptions<T>): Promise<T> {
        return this._repository.findByIdAndDelete(_id, options);
    }

    async updateMany(
        filter?: FilterQuery<T>,
        update?: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions<T>
    ): Promise<UpdateWriteOpResult> {
        return this._repository.updateMany(filter, update, options);
    }

    async deleteMany(filter?: FilterQuery<T>, options?: QueryOptions<T>) {
        return this._repository.deleteMany(filter, options);
    }
}

import {
    AnyKeys,
    Document,
    FilterQuery,
    HydratedDocument,
    InsertManyOptions,
    MergeType,
    Model,
    Query,
    QueryOptions,
    RequireOnlyTypedId,
    Types,
    UpdateQuery,
    UpdateWithAggregationPipeline,
    UpdateWriteOpResult
} from 'mongoose';

type resultType<T> = T & Document & { _id: Types.ObjectId };

export abstract class BaseRepository<T extends Document> {
    private _repository: Model<T>;

    constructor(private readonly model: Model<T>) {
        this._repository = model;
    }

    get name() {
        return this._repository.collection.name;
    }

    countDocuments(
        entityFilterQuery?: FilterQuery<T>,
        options?: QueryOptions<T>
    ): Query<number, HydratedDocument<T, any, any>, any, T> {
        return this._repository.countDocuments(entityFilterQuery, options);
    }

    create(...docs: (T | AnyKeys<T>)[]): Promise<HydratedDocument<T, any, any>[]> {
        return this._repository.create(docs);
    }

    insertMany(
        docs: T[],
        options: InsertManyOptions & {
            lean: true;
        }
    ): Promise<MergeType<MergeType<T, T>, RequireOnlyTypedId<T>>[]> {
        return this._repository.insertMany(docs, options);
    }

    findAndPaging(
        pagingOptions: { page: number; limit: number },
        entityFilterQuery?: FilterQuery<T>,
        projection?: Record<string, unknown>,
        options?: QueryOptions<T>
    ): Query<resultType<T>[], resultType<T>> {
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

    find(
        entityFilterQuery?: FilterQuery<T>,
        projection?: Record<string, unknown>
    ): Query<resultType<T>[], resultType<T>> {
        return this._repository.find(entityFilterQuery, {
            _v: 0,
            ...projection
        });
    }

    findOne(
        entityFilterQuery?: FilterQuery<T>,
        projection?: Record<string, unknown>
    ): Query<resultType<T>, resultType<T>> {
        return this._repository.findOne(entityFilterQuery, {
            _v: 0,
            ...projection
        });
    }

    findById(_id: string, projection?: Record<string, unknown>): Query<resultType<T>, resultType<T>> {
        return this._repository.findById(_id, {
            _v: 0,
            ...projection
        });
    }

    findByIdAndUpdate(
        _id: string,
        update?: UpdateQuery<T>,
        options?: QueryOptions<T>
    ): Query<resultType<T>, resultType<T>> {
        return this._repository.findByIdAndUpdate(_id, update, options);
    }

    findOneAndUpdate(
        filter?: FilterQuery<T>,
        update?: UpdateQuery<T>,
        options?: QueryOptions<T>
    ): Query<resultType<T>, resultType<T>> {
        return this._repository.findOneAndUpdate(filter, update, options);
    }

    findOneAndDelete(filter?: FilterQuery<T>, options?: QueryOptions<T>) {
        return this._repository.findOneAndDelete(filter, options);
    }

    findByIdAndDelete(_id: string, options?: QueryOptions<T>) {
        return this._repository.findByIdAndDelete(_id, options);
    }

    updateMany(
        filter?: FilterQuery<T>,
        update?: UpdateWithAggregationPipeline | UpdateQuery<T>,
        options?: QueryOptions<T>
    ): Query<UpdateWriteOpResult, HydratedDocument<T, any, any>, any, T> {
        return this._repository.updateMany(filter, update, options);
    }

    deleteMany(filter?: FilterQuery<T>, options?: QueryOptions<T>) {
        return this._repository.deleteMany(filter, options);
    }
}

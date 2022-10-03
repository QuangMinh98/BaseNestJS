export interface IResponse<T> {
    data: T[];
    metaData: {
        page: number;
        limit: number;
        totalDocuments: number;
        totalPages: number;
    };
}

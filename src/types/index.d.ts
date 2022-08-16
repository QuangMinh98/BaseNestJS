/* eslint-disable @typescript-eslint/ban-types */
export {};

declare global {
    interface reqUser {
        id: string;
        name: string;
        email: string;
    }
}

declare module 'mongoose' {
    interface DocumentQuery<T, DocType extends import('mongoose').Document, QueryHelpers = {}> {
        mongooseCollection: {
            name: any;
        };
    }

    interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType> extends DocumentQuery<any, any> {
        paging(limit: number, page: number): Query<ResultType, DocType, {}, RawDocType>;

        cache(): Query<ResultType, DocType, {}, RawDocType>;
    }

    interface Document<T, TQueryHelpers = any, DocType = any> {
        cache(): this;
    }
}

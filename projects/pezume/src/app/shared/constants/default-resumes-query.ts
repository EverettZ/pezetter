import { QueryConfig } from '../models/resume-query.model';
import { Collections } from './collections';

export const defaultQuery: QueryConfig = {
    path: Collections.RESUMES,
    field: 'about',
    limit: 10,
    reverse: false,
    start: 0,
    size: 0,
    search: ''
}
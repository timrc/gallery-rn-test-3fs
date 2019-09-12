// @flow
export const AVAILABLE_ACTION_STATUSES = {
    REQUEST: 'REQUEST',
    // action is being processed
    REQUESTED: 'REQUESTED',
    // e.g. http status 201 Created
    SUCCESS: 'SUCCESS',
    // api error e.g. http status 403 Forbidden
    FAILURE: 'FAILURE',
    // unavailable backend e.g. http status 504 Gateway timeout
    ERROR: 'ERROR',
    // call finished
    DONE: 'DONE',
};

export const HTTP_VERB_MAPPING = {
    LOAD: 'GET',
    UPDATE: 'PUT',
    CREATE: 'POST',
    REMOVE: 'DELETE',
};

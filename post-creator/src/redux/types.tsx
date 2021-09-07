export interface IInitialState {
    posts: ({
        title: string;
        body: string;
        id: number;
        comments?: (IComments)[] | []
    })[] | [],
    selectedPost: ({
        title: string;
        body: string;
        id: number;
        comments?: (IComments)[] | []
    })[] | []
}

export interface IComments {
    id: number;
    postId: number;
    body: string;
}

export enum UserActionTypes {
    CREATE_POST = "CREATE_POST",
    DELETE_POST = "DELETE_POST",
    SELECT_POST = "SELECT_POST",
    DISPLAY_ALL_POSTS = "DISPLAY_ALL_POSTS",
    UPDATE_POST = "UPDATE_POST",
    CREATE_COMMENT = "CREATE_COMMENT",
}

export interface CreatePostAction {
    type: UserActionTypes.CREATE_POST;
    payload: {
        title: string;
        body: string;
    };
}

export interface DeletePostAction {
    type: UserActionTypes.DELETE_POST;
    payload: number;
}

export interface SelectPostAction {
    type: UserActionTypes.SELECT_POST;
    payload: number;
}

export interface DisplayAllPostsAction {
    type: UserActionTypes.DISPLAY_ALL_POSTS;
}

export interface UpdatePostAction {
    type: UserActionTypes.UPDATE_POST;
    payload: {
        title: string,
        body: string,
        id: number
    }
}

export interface CreateComment {
    type: UserActionTypes.CREATE_COMMENT;
    payload: {
        id: number,
        body: string,
        postId: number
    }
}

export type UserAction =
    | CreateComment
    | CreatePostAction
    | DeletePostAction
    | SelectPostAction
    | DisplayAllPostsAction
    | UpdatePostAction;

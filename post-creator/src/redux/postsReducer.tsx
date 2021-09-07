import {IInitialState, UserAction, UserActionTypes} from "./types";

let initialState: IInitialState = {
    posts: [],
    selectedPost: [],
};

export const postReducer = (
    state = initialState,
    action: UserAction
): IInitialState => {
    switch (action.type) {
        case UserActionTypes.CREATE_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        title: action.payload.title,
                        body: action.payload.body,
                        id: state.posts.length,
                        comments: []
                    },
                ],
            };
        case UserActionTypes.DELETE_POST:
            return {
                ...state,
                // @ts-ignore
                posts: state.posts.filter((post) => {
                    return post.id != action.payload;
                }), selectedPost: state.selectedPost.filter((post) => {
                    return post.id != action.payload;
                })
            };
        case UserActionTypes.SELECT_POST:
            return {
                ...state,
                selectedPost: [state.posts[action.payload]],
            };

        case UserActionTypes.DISPLAY_ALL_POSTS:
            return {
                ...state,
                selectedPost: state.posts,
            };
        case UserActionTypes.UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id == action.payload.id) {
                        return {
                            title:String( action.payload.title),
                            body:String( action.payload.body),
                            id:Number( action.payload.id),
                        };
                    }
                    return post;
                }),
            };
        case UserActionTypes.CREATE_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id == action.payload.postId) {

                        if ( post.comments instanceof Array && post.comments.length > 0) {
                            return {
                                ...post,
                                comments: [
                                    ...post.comments,
                                    {
                                        body:String( action.payload.body),
                                        postId: Number(action.payload.id),
                                        id: Number(post.comments.length),
                                    },
                                ],
                            };
                        }
                    }
                    return post;
                }),
                // @ts-ignore
                selectedPost: state.selectedPost.map((post) => {
                    if (post.id == action.payload.postId &&  post.comments instanceof Array) {
                        return {
                            ...post,
                            comments: [
                                ...post.comments,
                                {
                                    body: action.payload.body,
                                    postId: action.payload.id,
                                    id: post.comments.length,
                                },
                            ],
                        };
                    }
                    return post;
                }),
            };
        default:
            return state;
    }
};

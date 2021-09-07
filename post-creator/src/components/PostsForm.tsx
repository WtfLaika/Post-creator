import {useAppSelector} from "../app/hooks";
import {JSXElementConstructor, ReactElement, ReactNodeArray, useState} from "react";
import {useDispatch} from 'react-redux';
import {IComments, UserActionTypes} from "../redux/types";
import {Post} from "./Post";

interface IPost {
    title: string;
    body: string;
    id: number;
    comments?: ({
        id: number;
        postId: number;
        body: string;
    }) [];
}

interface ISelectedPost {
    selectedPost: ({
        title: string;
        body: string;
        id: number;
        comments?: IComments
    })[] | []
}

export const PostsForm: React.FC = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isSelectedAll,setIsSelectedAll] = useState(false)
    const posts = useAppSelector((state) => state.properties.posts);
    const selectedPost = useAppSelector((state) => state.properties.selectedPost);
    // @ts-ignore
    const PostTitles = posts.map((post, index) => {
        // @ts-ignore
        return (<option key={`2-${index}`}  value={post.id}>{post.title}</option>);
    });

    function changeHandlerTitle(e: React.ChangeEvent<HTMLInputElement>): void {
        setTitle(e.target.value)
    }

    function changeHandlerBody(e: React.ChangeEvent<HTMLInputElement>): void {
        setBody(e.target.value)
    }

    function submitHandler(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (title.trim() && body.trim()) {
            dispatch({type: UserActionTypes.CREATE_POST, payload: {title: title, body: body}})
            if(isSelectedAll){
                dispatch({type:UserActionTypes.DISPLAY_ALL_POSTS})
            }
            setTitle('');
            setBody('')
        }
    }
    function selectChangeHandler(e:React.ChangeEvent<HTMLSelectElement>):void{
        const value = e.target.value;
        if(value == "Выбрать все посты"){
            dispatch({type:UserActionTypes.DISPLAY_ALL_POSTS})
            setIsSelectedAll(true);
        } else if(value == 'null'){
            setIsSelectedAll(false);
        }
        else{
           dispatch({type:UserActionTypes.SELECT_POST,payload:value})
            setIsSelectedAll(false);
        }

    }

    return (
        <>
            <form className="post-creator" onSubmit={submitHandler}>
                <div className="input-container">
                    <label htmlFor="title">Заголовок поста</label>
                    <input type="text" name='title' value={title} onChange={changeHandlerTitle}/>
                    <label htmlFor="body">Пост</label>
                    <input type="text" name="body" value={body} onChange={changeHandlerBody}/>
                </div>
                <input type='submit' className={'create-post'} value="Создать пост"/>
            </form>
            <select onChange={selectChangeHandler}>
                {posts.length < 1 && <option>Постов пока нету. Создайте пост</option>}
                {posts.length > 0 && (
                    <>
                        <option  value="null">Выбирите пост</option>
                        <option value="Выбрать все посты">Выбрать все посты</option>
                        <>{PostTitles}</>
                    </>
                )}
            </select>
            <div className="result">
                {posts.length < 1 && <div>Постов пока нету. Создайте пост</div>}
                {posts.length > 0 &&
                // @ts-ignore
                <div>{selectedPost.map((post: IPost, index: number): ReactComponentElement<IPost> => <Post post={post} key={`1-${index}`}/>)}</div>}
            </div>
        </>
    );
};

import React, {useState} from 'react';
import {IComments, UserActionTypes} from "../redux/types";
import {useDispatch} from "react-redux";

interface Ipost {
    post: {
        title: string;
        body: string;
        id: number;
        comments?: IComments
    }
}


export const Post: React.FC<Ipost> = ({post}) => {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [isChangePressed, setChangePressed] = useState(false);
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();

    const commentsTitles = () => {
        if (typeof post.comments != "undefined") {
            // @ts-ignore
           return post.comments.map(( comment,index)=>{
               return (<div key={`3-${index}`}>{comment.body}</div>)
           })
        }
    }
    function changePost(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!isChangePressed) {
            setChangePressed(true);
        } else {
            if (title.trim() && body.trim) {
                setChangePressed(false)
                dispatch({type: UserActionTypes.UPDATE_POST, payload: {title: title, body: body, id: post.id}})

            }
        }
    }

    function changeHandlerTitle(e: React.ChangeEvent<HTMLInputElement>): void {
        setTitle(e.target.value)
    }

    function changeHandlerBody(e: React.ChangeEvent<HTMLInputElement>): void {
        setBody(e.target.value)
    }

    function deleteHandler(e: React.SyntheticEvent<HTMLButtonElement>): void {
        e.preventDefault();
        dispatch({type: UserActionTypes.DELETE_POST, payload: post.id})
    }

    function setCommentName(e: React.ChangeEvent<HTMLInputElement>){
        setComment(e.target.value)
    }

    function createComment(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        if(comment.trim()){
            dispatch({type:UserActionTypes.CREATE_COMMENT,payload:{postId:post.id,body:comment}})
           setComment('')
        }

    }

    // @ts-ignore
    return (
        <div className="post">
            <input type="text" value={title} className='post-title' onChange={changeHandlerTitle}
                   disabled={!isChangePressed}/>
            <input type="text" name="" id="" disabled={!isChangePressed} onChange={changeHandlerBody} value={body}/>
            <button type="submit" onClick={deleteHandler}>Удалить</button>
            <button type="submit"
                    onClick={changePost}>{!isChangePressed && "Изменить"}{isChangePressed && "Сохранить"}</button>

            <div className="comment">
                {/* @ts-ignore */}
                <div className="comment-titles">{commentsTitles()}</div>

                <input type='text' value={comment} onChange={setCommentName}/>
                <button type="submit" onClick={createComment}>Создать коммент</button>
            </div>
        </div>
    )
}
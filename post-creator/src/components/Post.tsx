import React, {useState} from 'react';
import {IComments, UserActionTypes} from "../redux/types";
import {useDispatch} from "react-redux";
import {Button} from "react-bootstrap";

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
            return post.comments.map((comment, index) => {
                return (<div key={`3-${index}`}>{index+1+". "}{String(comment.body)}</div>)
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

    function changeHandlerBody(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        setBody(e.target.value)
    }

    function deleteHandler(e: React.SyntheticEvent<HTMLButtonElement>): void {
        e.preventDefault();
        dispatch({type: UserActionTypes.DELETE_POST, payload: post.id})
    }

    function setCommentName(e: React.ChangeEvent<HTMLInputElement>) {
        setComment(e.target.value)
    }

    function createComment(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (comment.trim()) {
            dispatch({type: UserActionTypes.CREATE_COMMENT, payload: {postId: post.id, body: comment}})
            setComment('')
        }

    }

    return (
        <div className="post">
            <input type="text" value={title} className='post-title' onChange={changeHandlerTitle}
                   disabled={!isChangePressed}/>
            <textarea   id="post-body" disabled={!isChangePressed} onChange={changeHandlerBody} value={body}
                      placeholder='Введите ваш комментар'/>

            <button type="submit" className='post-change'
                    onClick={changePost}>
                <div>
                    {!isChangePressed && '✎'}{isChangePressed && "\t💾"} &#173;</div>
            </button>
            <button type="submit" className="post-delete" onClick={deleteHandler}><div>❌ </div></button>


            <div className="comment">
                <div className="comment-titles">{commentsTitles()}</div>

                <input type='text' value={comment} onChange={setCommentName}/>
                <Button variant="outline-primary" type="submit" className="create-comment" onClick={createComment}>Создать коммент</Button>
            </div>
        </div>
    )
}
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../store/articles/actions";
import { selectArticles, selectArticlesIsLoading, selectError } from "../../store/articles/selectors";


export const Articles=()=>{
    const dispatch = useDispatch()
    const error = useSelector(selectError);
    const isLoading = useSelector(selectArticlesIsLoading)
    const articles = useSelector(selectArticles)

    const getData= async () =>{
        dispatch(getArticles())
    }
    useEffect(() => {
        getData()
    }, []);
    return(
        <div>
            <h3>lesson8</h3>
            <button onClick={getData}>Refresh</button>
            {isLoading ?( <CircularProgress />):(
            <ul>{articles.map((art)=>(
                <li key={art.id}>{art.name}</li>

            ))}</ul>
            )}
        </div>
    )
}
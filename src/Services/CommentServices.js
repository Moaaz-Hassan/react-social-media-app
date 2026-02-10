import axios from "axios"
export async function createCommentApi(content , post ){
    try{
        const {data} = await axios.post("https://linked-posts.routemisr.com/comments" , {content,post} 
            ,{ headers : {token : localStorage.getItem("token") }}
        )

        return data ;

    }catch(err){
        console.log(err)
    }
}


export async function UpdateCommentApi(content , commintId ){
    try{
        const {data} = await axios.put("https://linked-posts.routemisr.com/comments/"+commintId , {content} 
            ,{ headers : {token : localStorage.getItem("token") }}
        )

        return data ;

    }catch(err){
        console.log(err)
    }
}


export async function getCommentsApi(PostId){
    try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${PostId}/comments` ,
            { headers : {token : localStorage.getItem("token") }}
        )

        return data ;

    }catch(err){
        console.log(err)
    }
}



export async function DeleteCommentApi(commintId ){
    try{
        const {data} = await axios.delete("https://linked-posts.routemisr.com/comments/"+commintId  
            ,{ headers : {token : localStorage.getItem("token") }}
        )

        return data ;

    }catch(err){
        console.log(err)
    }
}
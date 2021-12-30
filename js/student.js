var ans;
$(document).ready(function(){
      

    let xhr=new XMLHttpRequest();

    xhr.onload=function(){
        if(this.status==200)
        {
            let obj1=JSON.parse(this.responseText);
            ans=obj1;
            let obj=[];
            let i=0;
            for(key of obj1.articles)
            {
                if(i>=3)
                break;
                if(key.urlToImage!=null)
                {
                     obj.push({url:key.urlToImage,title:key.title,description:key.description});
                     i++;
                }
            }


             $('#first').html(`<img src="${obj[0].url}" alt="">
             <div>
                        <h5 >${obj[0].title}</h5>
                        <p>${obj[0].description}</p>
                        </div>`);
             $('#second').html(`<img src="${obj[1].url}" alt="">
             <div>
                        <h5>${obj[1].title}</h5>
                        <p>${obj[1].description}</p>
                        </div>`);
             $('#third').html(`<img src="${obj[2].url}" alt="">
             <div>
                        <h5>${obj[2].title}</h5>
                        <p>${obj[2].description}</p>
                        </div>`);

             str="";
             i=1;
            
             for(key of obj1.articles)
             {
            
                if(key.urlToImage!=null){
                 str+=`<div class="card mt-3" style="width: 20rem;" id="">
                 <div class="card-body">
                     <div style="color:rgb(24, 21, 21);"><i class="fas fa-newspaper fa-2x"></i></div>
                     <div class="news" >
                     <img style="height:100%;width:100%;" src="${key.urlToImage}" alt="" />
 
                     </div>
                    
                     <p class="card-text" style="color:black;">${key.title}</p>
                     <div class="btn1 d-flex justify-content-around">
                     
                     
                       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onclick="myfunc(${i});">Read More</button>
                       
                       <button type="button " class="btn btn-danger"><a href="${key.url}" style="text-decoration:none; color:black;" >Visit Website</a></button>
                     </div>
 
                 </div>
             </div>`;
             i++;
                }

             }
             $('.card1').html(str);

             
             
             
            }
            else
            {
                console.log("${this.status} found");
            }
        }
        
        xhr.open('GET','https://newsapi.org/v2/top-headlines?country=in&apiKey=4dee5b107da0417b9f038c62ccf6b8c3',true);
    xhr.send();
});
function myfunc(index)
{
  // console.log(ans);
  let key=ans.articles[index-1];
    $('.modal-title').html(`${key.title}`);
    $('.modal-body' ).html(
        `<h2>Description</h2>
        <p>${key.description}</p>
        <h2>Content</h2>
        <p>${key.content}</p>`
    
    );

    $('#website').html(`<a style="text-decoration:none; color:black;" href="${key.url}">Visit Website</a>`);
}
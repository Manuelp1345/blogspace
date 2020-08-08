let name = localStorage.getItem("name")
const RenderPost = ()=>{
    const FormPost = $("#posts")[0]
    const pub = $("#pub")[0]

    FormPost.onsubmit=(e)=>{
        e.preventDefault()
        const post = $("#msg").val()
        const error = $("#error")[0]
        if(post === ""){
            error.innerHTML = '<p class="errorp">Por favor ingrese un texto en su publicacion</p>'
        }else{
            error.innerHTML = ''
            const btn =$("#btn-post")[0]
            btn.setAttribute("disabled",true)
            $.ajax({
                url:"https://api.manuelp1345.vercel.app/api/posts/",
                method: "POST",
                contentType:"application/json",
                data: JSON.stringify({name: "Manuel Puente", post})
            })
            .then(respuesta => {
                pub.insertAdjacentHTML('afterbegin', `<div class="post"><img src="avatar.png" alt=""> <p class="name"> ${respuesta.name} </p> <p class="text">${respuesta.post}</p> </div>`)
                error.innerHTML = '<p class="nicep">Publicado con exito</p>'
                setTimeout(()=> error.innerHTML = '', 5000)
                const post = document.getElementById("msg")
                post.value= ""
                btn.removeAttribute("disabled")
            })
        }
    }
}
const renderposts = ()=>{
    const btn =$("#btn-post")[0]
    btn.setAttribute("disabled",true)
    $.ajax({
        url:"https://api.manuelp1345.vercel.app/api/posts/",
        method: "GET",
        contentType:"application/json"
    })
    .then(data => {
            respuesta = data.map(x =>`<div class="post"><img src="avatar.png" alt=""> <p class="name"> ${x.name} </p> <p class="text">${x.post}</p> </div>`).reverse().join("")
            pub.innerHTML = respuesta
            RenderPost()
            btn.removeAttribute("disabled")
            refreshposts()
            setInterval(()=> refreshposts(), 2000)
    })
}
const refreshposts = ()=>{
    $.ajax({
        url:"https://api.manuelp1345.vercel.app/api/posts/",
        method: "GET",
        contentType:"application/json"
    })
    .then(data => {
            respuesta = data.map(x =>`<div class="post"><img src="avatar.png" alt=""> <p class="name"> ${x.name} </p> <p class="text">${x.post}</p> </div>`).reverse().join("")
            pub.innerHTML = respuesta
    })
}
window.onload = () =>{
    renderposts()
}
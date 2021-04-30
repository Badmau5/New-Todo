
console.log("test")

/*const foo = a=>a*a;
const bar = function(a){
    return a*a;
};
console.log(foo);
console.log(foo(1));
console.log(foo(2));
console.log(bar(2));*/
const style =  `
div[class^="entry"]{
    color: rgb(120, 248, 0);
}
`;
class TodoElement extends HTMLElement{
    list;
    form;
    constructor() {
        super();       
        console.log('created');
        fetch('/todo').then((response)=>{
            //console.log('response',response);      
            response.json().then(result =>{
                this.attachShadow({
                    mode:'open',
                }); 
                //CSS
                const css = document.createElement('style');
                css.innerHTML = style;
                this.shadowRoot.append(css);
                //list
                this.list=document.createElement('div');
                this.shadowRoot.append(this.list);
                result.forEach(this.addElement); 
                            
                this.form=document.createElement('form');
                this.shadowRoot.append(this.form);
                //title
                const labelTitle = document.createElement('label');
                const labelTitleSpan = document.createElement('span');
                labelTitleSpan.innerHTML = 'title';
                const labelTitleInput = document.createElement('input');
                labelTitleInput.classList.add('title-input');
                labelTitle.append(labelTitleSpan);
                labelTitle.append(labelTitleInput);
                this.form.append(labelTitle);
                //Body
                const labelBody = document.createElement('label');
                const labelBodySpan = document.createElement('span');
                labelBodySpan.innerHTML = 'body';
                const labelBodyInput = document.createElement('input');
                labelBodyInput.classList.add('body-input');
                labelBody.append(labelBodySpan);
                labelBody.append(labelBodyInput);
                this.form.append(labelBody);
                // button
                const submit=document.createElement('button');
                submit.innerHTML = 'create';
                submit.type = 'button';
                this.form.append(submit);
                submit.addEventListener('click',this.add);
            });         
        });
        
    }

    add = () => {
        const title = this.form.querySelector('.title-input');
        const body = this.form.querySelector('.body-input');
        const data = { };
        data.title = title.value;
        data.body = body.value;

        fetch(
            '/todo', 
            {
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
            },
        ).then(async (response)=>{
            const result = await response.json()
            console.log('created', result);
            data.id = result.id ;
            this.addElement (data);
            this.form.querySelector('.title-input').value = '';
            this.form.querySelector('.body-input').value = '';
        },()=>{
            console.log('error');
        });
        
    }
    addElement =  (element) => {
        const entry = document.createElement ('div');
        this.list.append(entry);
        entry.classList.add(`entry-${element.id}`);

        const id = document.createElement('div');
        id.innerHTML = `id: ${element.id}`;
        entry.append(id);

        const title = document.createElement('div');
        title.innerHTML = `title: ${element.title}`;
        entry.append(title);

        const body = document.createElement('div');
        body.innerHTML = `body: ${element.body}`;
        entry.append(body);

        //Кнопка удалений   

        const remove = document.createElement('button');
        remove.innerHTML = 'x';
        remove.type = 'button';
        entry.append(remove);
        remove.addEventListener('click',() => this.remove(element.id));
    }
    remove = (id) =>{
        fetch(
            `/todo/${id}`,
            {
                method:'DELETE',                    
            },
        ).then(()=>{
            console.log('deleted')
            this.list.querySelector(`.entry-${id}`).remove();
        },()=>{
            console.log('notdeleted')
        })
        console.log(id);    
    }
}

customElements.define ('todo-element', TodoElement);

/* const test = new Promise((resolve, reject)=>{ 
    console.log(2);
    setTimeout(()=>{
        resolve();
    },2000);
});
test.then(()=>{
    console.log(3);
}).catch
console.log(1);*/
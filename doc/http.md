import {http} from './js/http' #相对路径

##  get method case
##  params:
        url @string require
        params @object optional
        options  @object optional  
```
1).   http.GET('http://www.xxx.com')
        .then(response=>response.json())
        .then(json=>{
            //handle things
        })

2).   http.GET('http://www.xxx.com',{id:1})
        .then(response=>response.json())
        .then(json=>{
            //handle things
        })

3).   http.GET('http://www.xxx.com',{id:1},{
             headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
        })
        .then(response=>response.json())
        .then(json=>{
            //handle things
        })
```


###################################################################################################


##  post method case
##  params:
        url @string require
        params @object optional
        options  @object optional  
```
1).   http.POST('http://www.xxx.com')
        .then(response=>response.json())
        .then(json=>{
            //handle things
        })

2).   http.POST('http://www.xxx.com',{id:1})
        .then(response=>response.json())
        .then(json=>{
            //handle things
        })

3).   http.POST('http://www.xxx.com',{id:1},{
             headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
        })
        .then(response=>response.json())
        .then(json=>{
            //handle things
        })


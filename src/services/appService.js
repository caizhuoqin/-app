import API from '../api'
import http from '../utils/http'

export function getCityListData(){
	return new Promise((resolve,reject)=>{
		http({
			url:API.CITY_LIST_API,
			method:'GET'
		})
		.then(({data,status})=>{
			
			if(status!=200){
				//请求失败				
			}
			else{
				//请求成功		
				let map ={}
				data.cts.map(item=>{	
					
					let letter = item.py[0];
					
					if(!map[letter]){
						map[letter]=[];
					}					
					map[letter].push(item);					
				})
				let keys = Object.keys(map);
				//排序
				for(let i=0;i<keys.length;i++){
					for(let j=i+1;j<keys.length;j++){
						if(keys[i]>keys[j]){
							let tmp = keys[i];
							keys[i]=keys[j];
							keys[j] = tmp;
						}
					}
				}
				let newData = keys.map(item=>{
					return {
						key:item,
						value:map[item]
					}
				})
				console.log(newData)
				resolve({					
					data:newData,
					keys:keys
					
				})
			}
		})
		.catch(error=>{
			//请求失败
		})
		
	})
}

export function getfilteraData(message,cityID){
	return new Promise((resolve,reject)=>{
		http({
			url:API.SEARCH_API,
			method:'GET',
			data:{
				kw:message,
				cityId:cityID,
				stype:-1
			}
		})
		.then(({data,status})=>{
			console.log(data)
			if(status!=200||data==''){
				//请求失败	
				resolve(newData)
				return;
			}
			else{
				 let newData = data.movies.list.map(item=>{            	
                let {cat,img,nm,enm,rt,sc} = item;
                img = img.replace(/w.h/, '128.180');
                return {cat,img,nm,enm,rt,sc};
            })
            resolve(newData);
			}
		})
		.catch(error=>{
			//请求失败
		})
	})
}
//获取电影影院的接口请求
export function getsearchData(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CINEMAIST_API,
            method: 'GET',
            data: {               
                cityId:10
            }
        })
        .then(({data, status})=>{
        	
            if(status != 200){
                //请求失败
                return;
            }
            else{
            //请求成功
            console.log(data)
            }
            
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

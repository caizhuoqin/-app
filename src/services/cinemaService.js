import http from '../utils/http'
import API from '../api'

export function getCinameData(city){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CINEMAIST_API,
            method: 'GET',
            data: {
				cityID:city,
            }
        })
        .then(({data, status})=>{
        	console.log(data);
            if(status != 200){
                //请求失败
                return;
            }
            
            else{
            let newData = data.cinemas.map(item=>{           	
                let {addr,distance,nm,sellPrice,tag} = item;
                
                return {addr,distance,nm,sellPrice,tag};
            })
            resolve(newData);
            }
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

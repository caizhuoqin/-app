import http from '../utils/http'
import API from '../api'


//请求正在热映的电影数据
export function getPlayingList(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.PLAYING_API,
            method: 'GET',
            data: {
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            
            let newData = data.movieList.map(item=>{
            	
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve({
                data: newData,
                ids: data.movieIds
               
            });
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


//请求更多正在热映的电影数据
export function getMorePlayingList(ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MORE_PLAYING_API,
            method: 'GET',
            data: {
                token: '',
                movieIds: ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.coming.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve(newData);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 请求最受期待的电影数据
export function getMostExpectedData(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOST_EXPECTED_API,
            method: 'GET',
            data: {
                ci: 30,
                limit: 10,
                offset: 0,
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200)
                //请求失败
                return;
            //请求成功
            resolve(data.coming);
        })
        .catch(error=>{
            //请求失败
        })
    })
}
 
//请求即将上映的电影数据

export function getComingList(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.COMING_API,
            method: 'GET',
            data: {
                ci: 30,
                token: '',
                limit: 10
            }
        })
        .then(({data, status})=>{
//      	console.log(data)
            if(status != 200){
                //请求失败，提醒用户
                return;
            }
            //请求成功
            //过滤数据
            let newData = data.coming.map(item=>{
                let {showst,comingTitle, img, nm, wish, star, showInfo, globalReleased, version} = item;
                
                let str =comingTitle.replace(/月/, '-').split('日',1);
                
				let  arr = ['2018-',...str,'上映']
                comingTitle = arr[0]+arr[1]+arr[2]	
                return {showst,comingTitle, img, nm, wish, star, showInfo, globalReleased, version};
            })
            //对数据进行分类
            let dataMap = {};
            newData.map(item=>{
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item);
            })
            resolve({
            	data:dataMap,
            	ids: data.movieIds
            	
            });
        })
        .catch(error=>{
            //请求失败
        })
    })
}

//请求更多即将上映的电影
export function getMoreComingList(ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MORELOADCOMING_API,
            method: 'GET',
            data: {
                token: '',
                movieIds: ids,
                limit: 10               
            }
        })
        .then(({data, status})=>{
//      	console.log(data)
            if(status != 200){
                //请求失败，提醒用户
                return;
            }
            //请求成功
            //过滤数据
            let newData = data.coming.map(item=>{
                let {showst,comingTitle, img, nm, wish, star, showInfo, globalReleased, version} = item;
                
                let str =comingTitle.replace(/月/, '-').split('日',1);
                
				let  arr = ['2018-',...str,'上映']
                comingTitle = arr[0]+arr[1]+arr[2]	
                return {showst,comingTitle, img, nm, wish, star, showInfo, globalReleased, version};
            })
            //对数据进行分类
            let dataMap = {};
            newData.map(item=>{
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item);
            })
            resolve(dataMap);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

//请求电影商品详情页的接口请求

export function getdetailmovieData(id){
	return new Promise((resolve, reject)=>{
		http({
			url:API.DETAILMOVIE,
			method:'GET',
			data:{
				movieId:id,
			}			
		})
			.then(({data,status})=>{
				if(status!=200){
					//请求失败
				}
				console.log(data)
				let img = data.detailMovie.img.replace(/w.h/, '128.180');
				data.detailMovie.img=img;
//				let newData = data.detailMovie.map(item=>{
//					console.log(item)
//              let {id, nm, img,enm,sc,snum,cat,fra,dur,pubDesc,version} = item;
//              
//              img = img.replace(/w.h/, '128.180');               
//              return {id, nm, img,enm,sc,snum,cat,fra,dur,pubDesc,version};
//              
//          })
				
            resolve(data.detailMovie);
       
			})
			.catch(error=>{
				//请求失败
			})
	
		})
}

//商品详情页的购票时间列表
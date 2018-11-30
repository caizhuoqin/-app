//开发环境
const SAT_HOST = 'http://localhost:8080';
//测试
const UAT_HOST = 'http://10.213.12.98:8080';
//生产
const PRO_HOST = 'https://m.maoyan.com';


/*
正在热映的接口
参数： token 用户标识
*/
const PLAYING_API = '/ajax/movieOnInfoList';

/*
更多正在热映数据的接口
/ajax/moreComingList?ci=30&token=&limit=10&movieIds
    token 用户标识
    movieIds  请求的电影id
*/
const MORE_PLAYING_API = '/ajax/moreComingList';

/*
最受期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';
/*
即将上映的接口
参数： ci   城市id
      token   用户标识
      limit   数据长度
*/
const COMING_API = '/ajax/comingList';


/*
    //请求更多即将上映的电影
    参数 ：token 用户标识
    movieIds  请求的电影id
*/
const MORELOADCOMING_API = '/ajax/moreComingList'
/*
 城市列表接口
 * 
 * 
 //m.maoyan.com/dianying/cities.json
 * 
 * */
const CITY_LIST_API = 'dianying/cities.json'

/*
 搜索电影和影院接口
 http://m.maoyan.com/ajax/search
 * 
 * */
const SEARCH_API = '/ajax/search'
/*
 * 影院的接口请求
 http://m.maoyan.com/ajax/cinemaList
 day=2018-11-19
offset=0&
limit=20
&districtId=-1
&lineId=-1
&hallType=-1
&brandId=-1&
serviceId=-1
&areaId=-1
&stationId=-1
&item=&
updateShowDay=true
&reqId=1542599996402&
cityId=30
 
 参数
 	day
 * 
 * */
const CINEMAIST_API = 'ajax/cinemaList'


/*
 * 	正在热映的电影详情页请求
 * http://m.maoyan.com/ajax/detailmovie?movieId=42964
 		参数   movieId
 * */
const DETAILMOVIE = 'ajax/detailmovie'

export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    MORE_PLAYING_API,
    MOST_EXPECTED_API,
    COMING_API,
    MORELOADCOMING_API,
    CITY_LIST_API,
    SEARCH_API,
    CINEMAIST_API,
    DETAILMOVIE
}



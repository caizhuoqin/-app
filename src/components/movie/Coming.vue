<template>
<app-content :style="{top: '88px', bottom: '49px'}"@loadmore="loadMoreData" :canLoadMore="canLoadMore">
<div class="coming">
    <div class="expected">
        <p>最受期待的电影：</p>
        <h-scroll class="expected-list">
            <li  class="expected-item" v-for="item in expectedList" :key="item.id"> 
                <img :src="item.img | replaceWH(85,115)"/>
                <h3>{{item.nm}}</h3>
                <h4>{{item.comingTitle}}</h4>
                <span class="coming">{{item.wish}}人想看</span>
            </li>
        </h-scroll>
    </div>

    <div v-for="(list, key) in comingMap" :key="key">
        <p class="comingMap_key">{{key}}</p>
        <ul>
            <li class="comingMap_item" v-for="item in list" :key="item.id">
                <div class="comingMap_item_img">
                <img :src="item.img | replaceWH(64,90)"/>
                </div>
                <div class="item-content">
            <h3><span class="h_left">{{item.nm}} </span><span class="h_right">{{item.version}}</span></h3>
            <p class="item_list1"><span>{{item.wish}}</span>人想看</p>
            <p class="item_list2">主演：{{item.star}}</p>
            <p class="item_list3">{{item.comingTitle}}</p>
             
        </div>
                <div class="comingMap_item_btn">
                	<span class="playing_btn1" v-if="item.showst==1">想看</span>
       <span class="playing_btn2" v-if="item.showst==4">预售</span>
                </div>
            </li>
        </ul>
    </div>
    <!--https://p0.meituan.net/128.180/movie/5bd4ec1cded88c7cd48f0b58589bd505610552.jpg-->

</div>
</app-content>
</template>


<script>
import '../../utils/filter'
import {getComingList, getMostExpectedData,getMoreComingList} from '../../services/movieService'
export default {
    data(){
        return {
            comingMap: {},
            expectedList: [],           
            comingMapIDS: [],
            canLoadMore: true,
            num:10,
        }
    },
    methods:{
    	loadMoreData(){
//  		console.log('加载更多');  		
    		 let ids = [...this.comingMapIDS];
            ids = ids.splice(this.num,10);
			this.num+=10;
        let movieIds = ids.join(',');
        this.canLoadMore = false;
        getMoreComingList(movieIds).then((result)=>{
//              console.log(result);
//              this.comingMap = [...this.comingMap, ...result];
				 for(var a in result){
                	if(result.hasOwnProperty(a) && (!this.comingMap.hasOwnProperty(a) )){
                		this.comingMap[a]=result[a];
                	}else{
                		this.comingMap[a]=[...this.comingMap[a], ...result[a]]
                	}
                }	
                //判断是否可以继续加载更多
                if(this.num>= this.comingMapIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
              
            })
    		
    	}
    },
    created(){
        getComingList().then(({data,ids})=>{
            this.comingMap = data;
            this.comingMapIDS=ids
//         console.log(this.comingMap)
        })

        getMostExpectedData().then(result=>{
            this.expectedList = result;
//          console.log(this.expectedList)
            
        })
       
        
    }
}
</script>

<style lang="scss" scoped>
.expected{
    padding: 10px 15px;
    .expected-item{
    	position: relative;
        display: inline-block;
        width: 85px;
        /*height: 115px;*/
        margin-left: 10px;
        
        img{
            width:100%;
            height: 115px;
        }
          h3,h4{
          	    margin: 0 0 3px;
			    font-size: 13px;
			    color: #222;
          overflow: hidden;
        text-overflow:ellipsis; 
        	white-space:nowrap
          }
          h4{
          	    margin: 0;
		    font-size: 12px;
		    color: #999;
          }
          .coming{
          	    position: absolute;
			    left: 4px;
			    bottom:40px;
			    z-index: 1;
			    color: #faaf00;
			    font-size: 11px;
			    font-weight: 600;
          }
    }
}
		.comingMap_key{
			display: flex;
			display: inline;
			padding: 0 6px;
		}
		.comingMap_item{
			display: flex;
			justify-content: space-between;
			width: 100%;
			/*padding: 10px;*/
			padding: 10px;
			img{
				width:64;
				
			}
			.item-content{
    	/*width: 9rem;*/
        flex: 1;
        margin-left: 5px;
        border-bottom: 1px solid #e6e6e6;
        h3{
        	width: 10rem;
        	display: flex;
        	justify-content: space-between;
        	line-height: 16px;
        }
        h3 .h_left{
        	display: block;
        	width: 5.5rem;
        	overflow:hidden; 
        	text-overflow:ellipsis; 
        	white-space:nowrap;
        	    font-size: 17px;
			    color: #333;
			    font-weight: 700;
			    padding-right: 5px;
			    flex-shrink: 1;
        	
        }
        h3 .h_right{
        	/*height: 14px;
        	display:block;*/
        	background: aqua;
        	font-size: 12px;
        }
        .item_list1,.item_list2,.item_list3{
        	font-size: 14px;
        	width:10rem;
        	/*height: 20px;*/
        	line-height: 25px;
        	display: block;
        	overflow:hidden; 
        	text-overflow:ellipsis; 
        	white-space:nowrap;
        	       		
        	span{
		    color: #faaf00;
		    font-size: 15px;
		    font-weight: 600;
        	.item_list2{
        		    font-size: 13px;
    				color: #666;
        	}
        	.item_list3{
        		font-size: 13px;
    				color: #666;
        	}
        	}
        	
        }
      
    }
		.comingMap_item_btn{
    		width: 4rem;
    		display: flex;
    		padding: 20px 20px;
    	}
      .comingMap_item_btn .playing_btn1,.comingMap_item_btn .playing_btn2{
        	width: 3rem;
		    height: 27px;
		    /*margin-left: 30px;*/
		    /*margin-top: 20px;*/
		    line-height: 28px;
		    text-align: center;
		    box-sizing: border-box;
		    background-color: #faaf00;
		    color: #fff;
		    border-radius: 4px;
		    white-space: nowrap;
		    font-size: 12px;
		    cursor: pointer;
        }
       .comingMap_item_btn .playing_btn2{
        	background-color: #3c9fe6;
        }
			
		}
</style>
<template>
<app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
<ul class="playing">
    <li class="playing-item" v-for="(item,index) in playingList" :key="item.id">
        <div class="item-img">
            <img :src="item.img"/>
        </div>
        <div class="item-content">
            <h3><span class="h_left">{{item.nm}} </span><span class="h_right">{{item.version}}</span></h3>
            <p class="item_list1">{{item.sc}}</p>
            <p class="item_list2">主演：{{item.star}}</p>
            <p class="item_list3">{{item.showInfo}}</p>
             
        </div>
       <div class="playing_btn">
       	<span class="playing_btn1" v-if="item.globalReleased==true" @click="shopping_playingList(index)"  moveList="item">购票</span>
       <span class="playing_btn2" v-if="item.globalReleased==false" @click="shopping_playingList(index)">预购</span>
       </div>
    </li>
</ul>
</app-content>
</template>

<script>
import {getPlayingList, getMorePlayingList} from '../../services/movieService'
export default {
    data(){
        return {
            playingList: [],
            playingIDS: [],
            canLoadMore: true, 
        }
    },
    
    methods: {
        //加载更多数据
        loadMoreData(){
//          console.log('执行加载更多');
            //取出ids
            let ids = [...this.playingIDS];
            ids = ids.splice(this.playingList.length, 10);
            //组装ids
            let movieIds = ids.join(',');
            // 发送请求
            this.canLoadMore = false;
            getMorePlayingList(movieIds).then(result=>{
//              console.log(result);

//			遍历下拉更多的数据,判断是否是预约的还是购票的
  			result.map((item,index)=>{
  					
            	if(item.globalReleased==true){
            		result[index].sc = '观众评:'+item.sc;
//          		console.log(index)
            	}
            	if(item.globalReleased==false){
            		result[index].sc = '预约人数:'+item.wish;
            	}
            	return
            	
            })

                this.playingList = [...this.playingList, ...result];

                //判断是否可以继续加载更多
                if(this.playingList.length >= this.playingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
              
            })
            
        },
        shopping_playingList(index){
//      	console.log('点击了',index)
        	this.$router.push({
        		path:'/movie/cominglist',
        		query:{
        			id:this.playingList[index].id,
        			nm:this.playingList[index].nm
        		}
        	})
        }
    },
    created(){
        //初始化请求数据
        getPlayingList().then(({data, ids})=>{
//      	console.log(data)
            this.playingList = data;
            this.playingIDS = ids;  
           
//      遍历数据更多的数据,判断是否是预约的还是购票的进行分类
        data.map((item,index)=>{
//          	console.log(this.playingList[index])
            	if(item.globalReleased==true){
            		this.playingList[index].sc = '观众评:'+item.sc;
            		
            	}
            	if(item.globalReleased==false){
            		this.playingList[index].sc = '预约人数:'+item.wish;
            	}
            	return this.playingList[index].sc
            	
            })
        })
    }
}
</script>

<style lang="scss" scoped>
.playing-item{
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: space-between;
    .item-img{
        width: 64px;
        img{
            width: 100%;
        }
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
        	height: 20px;
        	display: block;
        	overflow:hidden; 
        	text-overflow:ellipsis; 
        	white-space:nowrap
        }
      
    }
    	.playing_btn{
    		width: 4rem;
    		display: flex;
    		padding: 20px 20px;
    	}
      .playing_btn .playing_btn1,.playing_btn .playing_btn2{
        	width: 3rem;
		    height: 27px;
		    /*margin-left: 30px;*/
		    /*margin-top: 20px;*/
		    line-height: 28px;
		    text-align: center;
		    box-sizing: border-box;
		    background-color: #f03d37;
		    color: #fff;
		    border-radius: 4px;
		    white-space: nowrap;
		    font-size: 12px;
		    cursor: pointer;
        }
       .playing_btn .playing_btn2{
        	background-color:blue;
        }
}
</style>


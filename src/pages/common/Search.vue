<template>
<div id="search" class="page search">
	<span class="searsh_letf" @click="backmovie"></span>
    <app-header title="猫眼电影"></app-header>
    <div class="search-btn">
    	<div class="search-btn-left">
    	<img src="../../assets/search.png"/>
    	<input name="name" type="text" placeholder="搜电影、搜影院" v-model="message"/>
    	<span v-if="message!=''" @click="reset">x</span>
    </div>
    	<span class="cancle_btn" @click="cancleBtn">取消</span>
    </div>
    <div class="hot-search">
    	<ul>
    		<li class="message-list" v-for="(item,index) in messageList" ><span>☆</span><span class="message-list-center" @click=" recordsLise(index)">{{item}}</span><span @click="deleteAction(index)">x</span></li>
    	</ul>
    	<h3>热门搜索</h3>
    </div>
    <div class="moreList" v-if="moreDel==true">
    	<ul>
    		<li v-for="(item,index) in moreList" class="moreList-list">
    			<div class="moreListimg">
    				<img :src="item.img"/>
    			</div>
    				<div class="moreList-right" >
    					<h3><span class="left">{{item.nm}}</span><span class="right">{{item.sc}}分</span></h3>
    					<h4>{{item.enm}}</h4>
    					<h5>{{item.cat}}</h5>
    					<h6>{{item.rt}}</h6>
    					<!--cat,img,nm,enm,rt,sc-->
    				</div>
    		</li>
    	</ul>
    	<div class="loadmore">
    		<h3>查看全部影视</h3>
    	</div>
    </div>
    
</div>
</template>

<script>
	import {getfilteraData}from '../../services/appService'
	import {mapState} from 'vuex'
export default {
	data(){
		return {
			message:'',
			messageList:[],
			stype:-1,
			moreList:'',
			moreDel:false
		}
	},
	computed:{
     	...mapState(['cityID'])
     },
    methods:{
    	cancleBtn(){
    		this.$router.back();
    	},
    	backmovie(){
    		this.$router.back();
    	},
    	reset(){
    		
    			if(this.message==''){
    				console.log('messages为空')
    			}
    			else{    	
    				
    			}   
    		this.messageList.unshift(this.message);
    		this.message='';
    	},
    	deleteAction(index){
//  		点击x删除历史记录
    		this.messageList.splice(index,1)
    	},
    	//点击历史记录  搜索框里的内容为历史记录内容
    	recordsLise(index){
    		this.message=this.messageList[index]
    	}
    	
    },
    watch:{
    	message(){
    		console.log('111');
    		getfilteraData(this.message,this.cityID).then(result=>{
            this.moreList = result;
            console.log(result)
            this.moreDel=true;
            if(this.message==''){
            	this.moreList=[]
    		this.moreDel=false;
    	}
       })
    	}
    	
    }
    
}
</script>

<style lang="scss" scoped> 
	.page{
		background: #f5f5f5;
		}
	.searsh_letf{
			position: absolute;
			width: 15px;
			height: 15px;
			top: 13px;
			left: 20px;
			z-index:1;
			display: inline-block;
		    border-top: 2px solid #fff;
		    border-left: 2px solid #fff;
		    transform: rotate(-45deg);		    
		}
	.search-btn{
		position: absolute;
			top: 44px;
			width: 100%;
			height: 44px;
			display: flex;
			justify-content: space-between;
			.search-btn-left{
				padding: 0 10px;
				margin-top: 5px;
				margin-left: 10px;
				height: 30px;
			    border: 1px solid #e6e6e6;
			    border-radius: 5px;
			    background-color: #fff;
			    -webkit-box-flex: 1;
			    flex-grow: 1;				
				display: flex;
				justify-content: space-between;
				img{
					width: 15px;
			    height: 15px;
			    margin-right: 6px;
			    float: left;
			    position: relative;
			    top: 6px;
				}
				input{
					width: 60%;
					-webkit-box-flex: 1;
					height: 22px;
				    flex: 1;
				    border: none;
				    font-size: 13px;
				    outline:none; 
				    color: #333;
				    line-height: 20px;
				    padding: 4px 0;
				    width: calc(100% - 40px);
				}
			}
			.cancle_btn{
				display: block;
				margin-top: 10px;
				    height: 30px;
				    line-height:20px;
				    padding: 0 10px;
				    font-size: 16px;
				    color: #f03d37;
			}
		   
	}
	.hot-search{
		position: absolute;
		top: 88px;
		width: 100%;		
		    background: #fff;
		    .message-list{
		    	display: flex;
		    	justify-content: space-between;
		    	padding: 0 10px;
		    	.message-list-center{
		    		display: flex;
		    		display: block;
		    		flex: 1;
		    		padding: 0 10px;
		    	}
		    }
		    h3{
		    line-height: 61px;
			font-size: 15px;
		    color: #666;	
		    margin-left: 20px;
		    font-weight: normal;
		    }
	}
	.moreList{
		position: absolute;	
		width: 100%;
		/*height: 60%;*/
		left: 0;
		bottom: 0;
		top: 88px;
		background:#fff;
		
		.moreList-list{
			display:flex;
			padding: 10px;
			.moreListimg{
			width: 64px;
			height: 90px;
			img{
			width:100%;
		}
		}
		.moreList-right{
			flex: 1;
			h3{
				display: flex;
				justify-content: space-between;
				line-height: 20px;
				.left{
					 display: inline-block;
				    font-weight: 700;
				    font-size: 17px
				}
				.right{
					    color: #fa0;
    					font-size: 10px;
				}
			}
			h4,h5,h6{
				    font-size: 13px;
				    color: #666;
				    margin-top: 2px;
			}
		}
		}
		.loadmore{
			h3{
				text-align: center;
				color: orange;
			}
		}
		
		
	}
</style>



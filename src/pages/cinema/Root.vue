<template>
<div>
    <div class="page" id="cinema">
        <app-header title="影院"></app-header>
        <div class="grap-bar">
        	<div class="grap-bar-left" @click="goCitylist">{{city}}</div>
        	<div class="grap-bar-inp">
        		<img src="../../assets/search.png"/><span>搜影院</span>
        	</div>
        </div>
        <div class="grap-list">
        	<ul class="grap-list-list">
        		<li v-for="item in grapList">{{item}}</li>
        	</ul>
        </div>
    </div>
			<div class="cinemaList">
 				<app-content :style="{top:0, bottom:0}" ref="content">
		    	<ul>
		    		<li v-for="item in cinemaList" class="cinemaList-list">
		    				<div class="cinemaList-one"><span class="one">{{item.nm}}</span>&nbsp;&nbsp;&nbsp;<span class="two">{{item.sellPrice}}元</span></div>
		    				<div class="cinemaList-two">{{item.addr}}</div>
		    				<div class="cinemaList-three" v-if="item.endorse!=0">
		    					<span class="one" v-if="item.tag.allowRefund==1">改签</span>
		    					<span class="two" v-if="item.tag.endorse==1">小吃</span>
		    					<span class="two" v-if="item.tag.vipTag!=0">{{item.tag.vipTag}}</span>
		    					
		    				</div>
		    				<div class="cinemaList-four">
		    					<span class="one">卡</span><span class="two">开卡特惠，首单2张立减15元</span>
		    				</div>
		    		</li>
		    	</ul>
		    	  </app-content>
   			 </div>

   
    <router-view></router-view>
</div>
</template>

<script>
	import {getCinameData} from '../../services/cinemaService'
import {mapState} from 'vuex'
export default {
	data(){
		return{
			grapList:['全城','品牌','特色'],
			cinemaList:''
		}
	},
     computed:{
     	...mapState(['city'])
     },
     methods:{
     	goCitylist(){
     		this.$router.push('/movie/city-list')
     	}
     },
     created(){
     	getCinameData(this.city).then((data)=>{
     		this.cinemaList=data
     		console.log(data)
     	});
     },
     
}
</script>

<style lang="scss" scoped>
.grap-bar{
	position: absolute;
	top: 44px;
	left: 0px;
	width: 100%;
	height: 44px;
	background: #f5f5f5;;
	display: flex;
	justify-content: space-between;
	.grap-bar-left{	
		margin:0 10px;
		font-size: 15px;	
        text-align: center;
        line-height: 44px;
        &::after{
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top: 6px solid #666;
            transform: translateY(4px);
        }
    
	}
	.grap-bar-inp{
		flex: 1;
		display: flex;
		margin-top: 5px;
		-webkit-box-pack: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    align-items: center;
	    height: 28px;
	    font-size: 13px;
	    color: #b2b2b2;
	    margin-left: 18px;
	    border: .5px solid #e6e6e6;
	    border-radius: 5px;
	    margin-right: 15px;
		img{
			width: 15px;
			height: 15px;
		}
		.span{
			display: block;
			margin-left: 5px;
		}
	}
}
.grap-list{
	position: absolute;
	top: 88px;
	left: 0;
	width: 100%;
	height: 40px;
	border-bottom:1px solid #B2B2B2;
	.grap-list-list{
		display: flex;
		justify-content: space-between;
		li{
			width: 33%;
			height: 40px;
			text-align: center;
			line-height: 40px;
			&::after{
				content: '';
				display:inline-block;
				width: 0;
				height: 0;
				border: 6px solid transparent;
				border-top: 6px solid #666666;
				transform: translateX(4px) translateY(4px);
			}
		}
	}
}
.cinemaList{
	position: absolute;
	top: 128px;
	left: 0;
	bottom: 44px;
	width: 100%;
	.cinemaList-list{
		display: flex;
		padding: 10px;
		border-bottom:1px solid #999999;
		flex-direction: column;
		.cinemaList-one{
			width: 100%;
			.one{
				    line-height: 23px;
				    font-size: 14px;
				    color: #000;
			}
			.two{
				color: red;
			}
		}
		.cinemaList-two{
			font-size: 14px;
		}
		.cinemaList-three{
			.one,.two,.three{
				/*display: flex;*/				
				font-size: 12px;
				margin: 0 5px;
				
			}
			.one{
				border: 1px solid #589daf;
				color:#589daf;
			}
			.two{
				border: 1px solid #f90;
				color:#f90;
			}
			.three{
				border: 1px solid #f90;
				color:#f90;
			}
			
		}
		.cinemaList-four{
			.one{
				background-color: blue;
				font-size: 11px;
			}
			.two{
				font-size: 11px;
			}
		}
	}
}

</style>

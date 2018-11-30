<template>
	<div class="mage">
		<app-header :title="nm">
			<span slot="left" @click="goPlaying">返回</span>
		</app-header>
		<div class="movie-list">
			<div class="movie-list-left">
				<img :src="detailmovieList.img"/>
			</div>
			<div class="movie-list-center">
				<div class="one">{{detailmovieList.nm}}</div>
				<h2>{{detailmovieList.enm}}</h2>
				<h3><span class="left">{{detailmovieList.sc}}</span><span class="right">({{detailmovieList.snum}}人评)</span></h3>
				<h4><span class="left">{{detailmovieList.cat}}</span><span class="right">{{detailmovieList.version}}</span></h4>
				<h5><span>{{detailmovieList.fra}}</span>/<span>{{detailmovieList.dur}}分钟</span></h5>
				<h6>{{detailmovieList.pubDesc}}</h6>					
			</div>
			<div class="movie-list-right">
				<span></span>
			</div>
		</div>
		<div class="Data-list">
			<h-scroll class="Data" >
			
				<li class="Date-li" :class="{active: navIndex==index}" v-for="(item,index) in dataList" :key="index" @click="btnAction(index)" >{{item}}</li>
			
			</h-scroll>
			<div class="cityList">
				<ul class="cityList-list">
					<li v-for="item in citydataList"><span>{{item}}</span></li>
				</ul>
			</div>
		</div>
			<div class="cinema-h">
					<app-content :style="{top: 0, bottom: 0}">
							<div class="wrap">
									<li class="cinemaList-list" v-for="(item,index) in cinemaList" :key="index">
									
									<h1><p>{{item.nm}}</p><span>{{item.sellPrice}}元起</span></h1>
									<h2><p>{{item.addr}}</p><span>{{item.distance}}</span></h2>
									
								</li>
							</div>
					</app-content>


			</div>
		
	</div>
</template>

<script>
	import {getdetailmovieData} from '../../services/movieService'
		import {getCinameData} from '../../services/cinemaService'
	export default {
		data(){
			return{
				nm:'',
				movieId:'',
				detailmovieList:'',
				dataList:['今天11月23日','明天11月24日','后天11月25','周一11月26日','周二11月27日','周三11月28日','周四11月29日','周五11月30日'],
				navIndex:0,
				citydataList:['全城','品牌','特色'],
				cinemaList:[]
			}
		},
		 mounted(){
        //动态计算需要滚动的宽度
        this.contentScroll = new IScroll(this.$refs.content, {

        });

   },
		 created(){
		 	//编程式导航传值
		this.nm=this.$router.history.current.query.nm
		this.movieId=this.$router.history.current.query.id


 		getdetailmovieData(this.movieId).then((data)=>{
 			this.detailmovieList=data
     		console.log(this.detailmovieList);
            
        })
 		getCinameData(this.city).then((data)=>{
     		this.cinemaList=data
     		console.log(data)
     	});
		
		 },
			methods:{
				goPlaying(){
					this.$router.back()
				},
				btnAction(index){
//					console.log('点击了',index)
					this.navIndex=index
				}
			}
	}
	
</script>

<style lang="scss"scoped>
	.mage{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0px;
    overflow: hidden;
    background: red;
    z-index: 10;
	}
	.movie-list{
		position: absolute;
		width: 100%;
		top: 44px;
		left: 0;
		display: flex;
		padding: 10px;
		background: #333333;
		justify-content: space-between;
		.movie-list-left{
			width: 110px;
			height: 150px;
			img{
				width: 100%;
			}
			}
		.movie-list-center{
			/*display: flex;*/
			flex:1;
			padding-left: 10px;
			.one{
				width: 90%;
				 overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
				font-size: 20px;
			    margin-top: 2px;
			    font-weight: 700;
			    overflow: hidden;
			    color: #fff;
			    
			}
			h2{
				margin-top: 5px;
				font-size: 12px;
			    color: #fff;
			    opacity: .8;
			}
			h3{
				margin-top: 5px;
				.left{
					font-size: 16px;
					color: orange;
				}
				.right{
					    font-size: 12px;
					    color: #fff;
					    opacity: .8;
				}
			}
			h4{
				margin-top: 5px;
				.left{
					font-size: 12px;
					    color: #fff;
					    opacity: .8;
				}
				.right{
					font-size: 12px;
					    color: #fff;
					    opacity: .8;
					    background-color: #3C9FE6;
				}
			}
			h5{
				    margin-top: 5px;
				    font-size: 12px;
				    color: #fff;
				    opacity: .8;
			}
			h6{
				 margin-top: 5px;
				    font-size: 12px;
				    color: #fff;
				    opacity: .8;
			}
		}
		.movie-list-right{
			width: 40px;
			span{
				position: absolute;
				top: 50%;
				display: block;
				width: 10px;
				height: 10px;
				border-top:2px solid #fff;
				border-right:2px solid #fff;
				transform: rotate(45deg);
			}
		}
		
	}
	
	.Data-list{
		position: absolute;
		width: 100%;
		height: 87px;
		top:214px;
		left: 0;
		background:#fff;
		
		.Data{
		border-bottom:1px solid #777777;
			.Date-li{
				display: inline-block;
				width: 115px;
				height: 43px;
				text-align: center;
				line-height: 43px;
				font-size: 14px;
			    color: #666;
				
			}
		.active{
			color: red;
			border-bottom:1px solid red;
		}
		}
		.cityList{
			width: 100%;
			height: 40px;
			border-bottom:1px solid #777777;
			.cityList-list{
				display: flex;
				li{
					display: inline-block;
					width: 33%;
					border-right:1px solid #777777;
					text-align: center;
					span{
						flex: 1;	
						display: block;					
				        text-align: center;
				        line-height: 40px;
				        &::after{
				            content: '';
				            display: inline-block;
				            width: 0;
				            height: 0;
				            border: 6px solid transparent;
				            margin-left: 5px;
				            border-top: 6px solid #666;
				            transform: translateY(4px);
				        }
					}
				}
			}
		}
	}
	.cinema-h{
		position:absolute;
		top:300px;
		left:0px;
		bottom:0;
		width:100%;	
		background:#fff;
		.cinemaList-list{
			border-bottom:1px solid #ccc;
		h1,h2{
			display:flex;
			p{
				display: block;
				width: 80%;
				height: 20px;
				line-height: 23px;
				margin-top: 10px;
				    line-height: 23px;
				     color: #666;
					font-size: 16px;
					color: #000;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
			}
			span{
				margin-top: 10px;
				font-size:14px;
				color:red;
			}
		}
	}
	}
</style>
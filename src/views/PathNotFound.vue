<template>
  <section class="page_404 h-screen grid place-items-center ">
	<div class="container ">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		ดูเหมือนว่าคุณกำลังหลงทางนะ..
		</h3>
		
		<p>ทางที่คุณกำลังมองหาอยู่ยังไม่เปิดให้เข้าใช้งาน!</p>
		
		<router-link :to="{ name: 'Home' }" class="link_404 rounded-xl">กลับหน้าหลัก</router-link>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
</template>

<script>
export default {

}
</script>

<style scoped>
/*======================
    404 page
=======================*/


.page_404{ padding:40px 0; background:#fff; font-family: 'Arvo', serif;
}

.page_404  img{ width:100%;}

.four_zero_four_bg{
 
 background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
    background-repeat: no-repeat;
 }
 
 
 .four_zero_four_bg h1{
 font-size:80px;
 }
 
  .four_zero_four_bg h3{
			 font-size:80px;
			 }
			 
			 .link_404{			 
	color: #fff!important;
    padding: 10px 20px;
    background: #246d1f;
    margin: 20px 0;
    display: inline-block;}
	.contant_box_404{ margin-top:-50px;}

  .link_404:hover {
    background: #2c7826;
  }

  ::selection {
    outline: none;
  }
</style>
<template>
	<div>
		<ul class="SneakerList">
			<SneakerList v-for="item in items"
				:name = "item.name"
				:thumb = "item.thumb"
				@item-clicked="handleItemClick"
			/>	
		</ul>
	</div>
</template>
<script setup>
definePageMeta({
  layout: 'sneaker'
})
const items = ref([
	{
		name: 'Sneaker-1',
		thumb: '/nuxt3/images/sneaker/1.png',
		isSelected: false
	},
	{
		name: 'Sneaker-2',
		thumb: '/nuxt3/images/sneaker/2.png',
		isSelected: false
	},
	{
		name: 'Sneaker-3',
		thumb: '/nuxt3/images/sneaker/3.png',
		isSelected: false
	},
]);
const handleItemClick = (itemInfo) => {
	console.log(itemInfo);
}
</script>
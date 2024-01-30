<template>
	<div class="section-container css-grid" :class="{ 'unique-width-wrapping': uniqueWidthWrapping }">
		<div class="title">CSS Grid</div>
		<div>
			<input type="checkbox" name="min-width" v-model="uniqueWidthWrapping"/>
			<label for="min-width">Toggle Unique Column Widths With Wrapping</label>
		</div>
		<div>
			<input type="checkbox" name="min-width" v-model="wrapElementsTwoAtOnce"/>
			<label for="min-width">Toggle Wrapping 2 At Once</label>
		</div>
		<div class="resize-container" ref="resize-container">
			<div class="item">1</div>
			<div class="item">2</div>
			<div class="item">3</div>
			<div class="item">4</div>
			<div class="item">5</div>
			<div class="item">6</div>
		</div>
		<div>
			To have CSS Grid behave like a flex row, you need one line for the parent container: <br><br>"grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));"<br>
			<br> This says, create X number of columns that have a width of at least 100px, but will fill remaining space if there is extra.
			If there is 400px of space, there will be four columns. If there is 499px of available space. There will still be 4 columns, but the 99px will be split between each of the four columns. When there is 500px of available space, there will be 5 columns and so on.
		</div>
		<div v-if="uniqueWidthWrapping">
			It is possible to have unique column widths that wrap. The issue is that the number of unqiue column widths is also the min numbers of columns that will always show: you cant continue shinking to render one column is you defined two unqie column widths. (There are work arounds, like media queries to change the value)
		</div>
	</div>
</template>

<script>
import ManualResize from '_mixins_/ManualResize';
export default {
	name: 'css-grid',
	data() {
		return {
			uniqueWidthWrapping: false,
			wrapElementsTwoAtOnce: false
		}
	},
	mixins: [ ManualResize ],
	methods: {
		mutationCallback(mutationsList) {
			// Use traditional 'for loops' for IE 11
			for(let mutation of mutationsList) {
				if (mutation.attributeName == 'style' &&
					this.$refs['resize-container'].getBoundingClientRect().width <= 680  &&
					this.wrapElementsTwoAtOnce && 
					![...this.$refs['resize-container'].classList].includes('wrap-two-at-once')) {

					this.$refs['resize-container'].classList.add('wrap-two-at-once');

				} else if (mutation.attributeName == 'style' &&
					this.$refs['resize-container'].getBoundingClientRect().width > 680  &&
					this.wrapElementsTwoAtOnce && 
					[...this.$refs['resize-container'].classList].includes('wrap-two-at-once')) {

					this.$refs['resize-container'].classList.remove('wrap-two-at-once');

				}
			}
		}
	}
};
</script>
<style lang='scss' type='text/css'>
.css-grid {
	.resize-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		.item {
			line-height: 70px;
			text-align: center; 
			height: 80px;
			border: 5px solid black;
			margin-right: 10px;
			margin-lefT: 10px;
		}
	}
	&.unique-width-wrapping {
		.resize-container {
			grid-template-columns: repeat(auto-fit, minmax(50px, 1fr) minmax(150px, 1fr));
		}
	}
	.resize-container.wrap-two-at-once {
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr) minmax(150px, 1fr));
	}
}
</style>

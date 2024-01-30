<template>
	<div class="section-container flex-row">
		<div class="title">4 in a row</div>
		<div>
			<input type="checkbox" name="min-width" v-model="minWidth"/>
			<label for="min-width">Toggle Min-Width</label>
		</div>
		<div>
			<input type="checkbox" name="min-width" v-model="wrapElements"/>
			<label for="min-width">Toggle Wrapping Elements</label>
		</div>
		<div>
			<input type="checkbox" name="min-width" v-model="wrapElementsTwoAtOnce"/>
			<label for="min-width">Toggle Wrapping Elements: Two at once</label>
		</div>
		<div class="resize-container" ref="resize-container"  :class="{'min-width': minWidth, 'wrap-elements': wrapElements }">
			<div class="item">1</div>
			<div class="item">2</div>
			<div class="item">3</div>
			<div class="item">4</div>
		</div>
		<div>To achieve a set number of elements in a row, you can use the "flex-basis" property with calculation of 100/n where n = number of elements on the row</div>
		<div v-if="minWidth">A min-width has been added to each element to prevent further shrinking</div>
		<div v-if="wrapElements">A min-width has been added, as well as flex-wrap: wrap to the parent container. This forces elements onto the next row when the parent shirnks below a width large enough to hold the elements at their min width on a single row</div>
		<div v-if="wrapElementsTwoAtOnce">A watcher has been added to see changes to the width of the parent container. When the parent container reaches a specific width, a class is applied that changes the flex-basis of the flex items, to a value that forces two to wrap at once</div>
	</div>
</template>

<script>
import ManualResize from '_mixins_/ManualResize';
export default {
	name: 'four-in-a-row',
	data() {
		return {
			minWidth: false,
			wrapElements: false,
			wrapElementsTwoAtOnce: false
		}
	},
	methods: {
		resize(event) {
			if (this.dragging) {
				if (this.dragSide == 'left') {
					let parentOffSetLeft = this.$refs['resize-container'].parentNode.getBoundingClientRect().left;
					let val = (((this.parentWidth/2) + this.parentPaddingLeft) - (event.pageX - parentOffSetLeft + this.clickOffSet)) / (this.parentWidth/2);
					val = Math.min(val * 100, 100);
					this.$refs['resize-container'].style.width = `${val}%`;
				}else {
					let val = ((event.pageX - (this.$refs['resize-container'].offsetLeft) - this.clickOffSet) / this.parentWidth) * 100
					val = Math.min(val, 100);
					this.$refs['resize-container'].style.width = `${val}%`;
				}
			}
		}
	},
	mixins: [ ManualResize ],
	watch: {
		wrapElementsTwoAtOnce(val) {
			if (val) {
				this.minWidth = false;
				this.wrapElements = false;
			}
		}
	}
};
</script>
<style lang='scss' type='text/css'>
.flex-row {
	.resize-container {
		display: flex;
		justify-content: space-between;
		.item {
			line-height: 70px;
			text-align: center; 
			height: 80px;
			border: 5px solid black;
			//n number of elements in a row should use the flex basis property with calculation of 100/n where n = number of elements on the row
			//that calculation does not allow for margins and borders and such. The best calculation is (100/n-1)+ 1
			//5 elements on a row would be 20% so if you want four on a row, you would get 21%
		
			flex-basis: 21%;
			flex-grow: 1;
			margin-right: 10px;
			margin-lefT: 10px;
		}
		&.min-width {
			.item {
				min-width: 100px;
			}
		}
		&.wrap-elements {
			flex-wrap: wrap;
			.item {
				min-width: 100px;
			}
		}
		&.wrap-two-at-once {
			flex-wrap: wrap;
			.item {
				flex-basis: 34%;
				min-width: 100px;
			}
		}
	}
}

</style>

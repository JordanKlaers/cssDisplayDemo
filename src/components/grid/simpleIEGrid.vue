<template>
	<div class="section-container simple-ie-grid" :class="{'unique-width-wrapping': uniqueWidthWrapping, 'wrap-two-at-once': wrapElementsTwoAtOnce}">
		<div class="title">IE CSS Grid</div>
		<div class="resize-container" ref="resize-container">
			<div class="item">
				<div class="number">1</div>
			</div>
			<div class="item">
				<div class="number">2</div>
			</div>
			<div class="item">
				<div class="number">3</div>
			</div>
			<div class="item">
				<div class="number">4</div>
			</div>
			<div class="item">
				<div class="number">5</div>
			</div>
			<div class="item">
				<div class="number">6</div>
			</div>
		</div>
	</div>
</template>

<script>
import ManualResize from '_mixins_/ManualResize';
export default {
	name: 'simple-ie-grid',
	data() {
		return {
			uniqueWidthWrapping: false,
			// wrapElements: false,
			wrapElementsTwoAtOnce: false
		}
	},
	mixins: [ ManualResize ],
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
				if (this.$refs['resize-container'].offsetWidth < 500) {
					this.$refs['resize-container'].classList.add('small-layout');
				} else {
					this.$refs['resize-container'].classList.remove('small-layout');
				}
			}
		}
	}
};
</script>
<style lang='scss' type='text/css'>
.simple-ie-grid {
	.resize-container {
		display:-ms-grid;
		display: grid;
		-ms-grid-columns: 1fr 1fr 1fr 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		.item {
			text-align: center; 
			height: 100%;
			border: 5px solid black;
			margin-right: 10px;
			margin-lefT: 10px;
			display: flex;
			justify-content: center;
			.number {
				align-self: center;
			}
			&:nth-child(1) {
				background-color: #F9A952;
				grid-column: 1 / span 1;
				grid-row: 1 / span 2;

				-ms-grid-column: 1;
				-ms-grid-column-span: 1;
				-ms-grid-row: 1;
				-ms-grid-row-span: 2;
			}
			&:nth-child(2) {
				background-color: #2DAFD6;
				grid-column: 2 / span 2;
				grid-row: 1 / span 1;

				-ms-grid-column: 2;
				-ms-grid-column-span: 2;
				-ms-grid-row: 1;
				-ms-grid-row-span: 1;
			}
			&:nth-child(3) {
				background-color: #EC7272;
				grid-column: 4 / span 1;
				grid-row: 1 / span 2;

				-ms-grid-column: 4;
				-ms-grid-column-span: 1;
				-ms-grid-row: 1;
				-ms-grid-row-span: 2;
			}
			
			//only having the -ms syntax supports IE's need for explicit placement
			//chrome matches the behavior implicitly for this layout
			&:nth-child(4) {
				background-color: #74C576;
				-ms-grid-column: 2;
				-ms-grid-column-span: 1;
				-ms-grid-row: 2;
				-ms-grid-row-span: 1;
			}
			&:nth-child(5) {
				background-color: #f952f2;
				-ms-grid-column: 3;
				-ms-grid-column-span: 1;
				-ms-grid-row: 2;
				-ms-grid-row-span: 1;
			}
			&:nth-child(6) {
				background-color: #b7fb19;
				grid-column: 1 / span 4;
				grid-row: 3 / span 3;
				
				-ms-grid-column: 1;
				-ms-grid-column-span: 4;
				-ms-grid-row: 3;
				-ms-grid-row-span: 3;
			}
		}
		&.small-layout {
			display:-ms-grid;
			display: grid;
			-ms-grid-columns: 1fr 1fr 1fr;
			grid-template-columns: 1fr 1fr 1fr;
			//if you do not define the rows, the content will control the height

			.item {
				&:nth-child(1) {
					background-color: #F9A952;
					grid-column: 1 / span 1;
					grid-row: 1 / span 2;

					-ms-grid-column: 1;
					-ms-grid-column-span: 1;
					-ms-grid-row: 1;
					-ms-grid-row-span: 2;

				}
				&:nth-child(2) {
					background-color: #2DAFD6;
					grid-column: 2 / span 2;
					grid-row: 1 / span 1;

					-ms-grid-column: 2;
					-ms-grid-column-span: 2;
					-ms-grid-row: 1;
					-ms-grid-row-span: 1;

				}
				&:nth-child(3) {
					background-color: #EC7272;
					grid-column: 2 / span 1;
					grid-row: 2 / span 1;

					-ms-grid-column: 2;
					-ms-grid-column-span: 1;
					-ms-grid-row: 2;
					-ms-grid-row-span: 1;

				}
				&:nth-child(4) {
					background-color: #74C576;
					grid-column: 1 / span 1;
					grid-row: 4 / span 1;

					-ms-grid-column: 1;
					-ms-grid-column-span: 1;
					-ms-grid-row: 4;
					-ms-grid-row-span: 1;

				}
				&:nth-child(5) {
					background-color: #f952f2;
					grid-column: 2 / span 1;
					grid-row: 4 / span 3;

					-ms-grid-column: 2;
					-ms-grid-column-span: 1;
					-ms-grid-row: 4;
					-ms-grid-row-span: 3;

				}
				&:nth-child(6) {
					background-color: #b7fb19;
					grid-column: 3 / span 1;
					grid-row: 2 / span 3;

					-ms-grid-column: 3;
					-ms-grid-column-span: 1;
					-ms-grid-row: 2;
					-ms-grid-row-span: 3;
				}
			}
		}
	}
}
</style>

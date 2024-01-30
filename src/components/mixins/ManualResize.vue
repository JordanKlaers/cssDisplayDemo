<script>
export default {
	name: 'manual-resize-mixin',
	data() {
		return {
			dragging: false,
			previousPosition: null,
			parentWidth: null,
			parentPaddingLeft: null,
			clickOffSet: null,
			dragSide: null
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
		},
		mouseUp() {
			this.dragging = false;
			document.removeEventListener('mousemove', this.resize);
			document.removeEventListener('mouseup', this.mouseUp);
		},
		mutationCallback(mutationsList) {
			// Use traditional 'for loops' for IE 11
			for(let mutation of mutationsList) {
				if (mutation.attributeName == 'style' &&
					this.$refs['resize-container'].getBoundingClientRect().width <= 400  &&
					this.wrapElementsTwoAtOnce) {
					this.$refs['resize-container'].classList.add('wrap-two-at-once');
				} else if (mutation.attributeName == 'style' &&
					this.$refs['resize-container'].getBoundingClientRect().width > 400  &&
					this.wrapElementsTwoAtOnce) {
					this.$refs['resize-container'].classList.remove('wrap-two-at-once');
				}
			}
		}
	},
	mounted() {
		let row = this.$refs['resize-container'];
		const that = this;
		row.onmousedown = function(event) {
			document.addEventListener('mousemove', that.resize);
			document.addEventListener('mouseup', that.mouseUp);
			// console.log('event.offsetX', event.offsetX, row.getBoundingClientRect().left);
			if (event.offsetX < 0) that.dragSide = 'left';
			if (event.offsetX > row.getBoundingClientRect().width) that.dragSide = 'right';
			if (that.dragSide) {
				that.dragging = true;
				let computedParent = window.getComputedStyle(this.parentElement, null);
				that.parentWidth = Number(computedParent.getPropertyValue("width").replace('px', '')) - Number(computedParent.getPropertyValue('padding-left').replace('px', '')) * 2;
				that.parentPaddingLeft = Number(computedParent.getPropertyValue('padding-left').replace('px', ''));
				if (that.dragSide == 'right') that.clickOffSet = event.clientX - (row.offsetLeft + row.clientWidth);
				if (that.dragSide == 'left') that.clickOffSet = row.offsetLeft - event.clientX 
			}
		}
		
		//The mutation observer works to detect changes on the dom element. I am watching attributes which fires when the style attribute is changed via the dragging.
		//In the callback I can apply classes that will allow for more then one element to wrap at a time
		
		/*Alternatives: 
				resizeObserver: this would directly provide the values needed and would work if the size changed for any reason, not just if the style attribute changes.
								There is not full support, so I am using mutation observer since it works in my case.
				ResizeSensor: This is a library that does what resizeObserver does but should work accross all browsers. (was not tested)
								found this option at this stackoverflow question: https://stackoverflow.com/questions/6492683/how-to-detect-divs-dimension-changed
				Media Query: Simply adding a media query in the css. This would work if the layout was changed only via the window width changing.
							Would need to consider/calculate the width of the window at what point you would want the items in the row to resize to shift to the next row
							(This does not work for my current example because the element is resized manually not by the window width)
		*/
		const config = { attributes: true, childList: true, subtree: true };
		const observer = new MutationObserver(this.mutationCallback);
		observer.observe(this.$refs['resize-container'], config);
	}
};
</script>


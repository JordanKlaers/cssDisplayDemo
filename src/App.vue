<template>
	<div id="app" class="m">
		<div class="container p-lft-30 p-rgt-30">
			<simple-ie-grid></simple-ie-grid>
			<flex-row></flex-row>
			<css-grid-wrap></css-grid-wrap>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import FlexRow from './components/flex/FlexRow';
import CSSGridWrap from './components/grid/CSSGridWrap';
import SimpleIeGrid from './components/grid/simpleIEGrid';
export default {
	name: 'app',
	components: {
		'flex-row': FlexRow,
		'css-grid-wrap': CSSGridWrap,
		'simple-ie-grid': SimpleIeGrid
	},
	data() {
		return {
			count: 1
		}
	},
	mounted() {
	},
	computed: {
		...mapGetters([''])
	},
	methods: {
	}
};
</script>
<style lang='scss' type='text/css'>
@import '~_scss_/app';
#app {
	background-color: $LightModeBackground;
	padding-top: 60px;
}
</style>
<style type='text/css'>
@import '~_icomoon_/style.css';
</style>

<script lang="ts">
	export let rotate: number;
	export let targetPathId: string;
</script>

<!-- Added g for issue in Safari -->
<g style="transform: rotate({rotate}deg)">
	<text dy="-3" text-anchor="start">
		<textPath xlink:href={targetPathId} startOffset="50%">
			<slot />
		</textPath>
	</text>
</g>

<style>
	g {
		transform-origin: 50% 50%;
	}

	text {
		text-anchor: middle;
		fill: black;
		font-size: 5px;
		pointer-events: none;
	}
</style>

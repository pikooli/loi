<script lang="ts">
	import '../app.css';
	import { PUBLIC_DOMAIN_EMAIL, PUBLIC_DOMAIN_NAME } from '$env/static/public';
</script>

<div class="flex h-screen flex-col">
	<header class="bg-blue-600 text-white p-4">
		<h1 class="text-xl font-bold capitalize">
			<a href="/">letter of intent</a>
		</h1>
	</header>

	<main class="max-w-2xl mx-auto p-4">
		<slot />
	</main>

	<footer class="bg-gray-800 text-white p-4 mt-auto">
		<div class="flex flex-col justify-between">
			<a href="/terms-and-conditions">Terms and Conditions</a>
			<a href="/privacy-policy">Privacy Policy</a>
		</div>
		<div class="flex flex-row justify-between">
			<div>
				<span>&copy; 2024 {PUBLIC_DOMAIN_NAME}</span>
			</div>
			<div>
				<span>Contact us at:</span>
				<span>
					<a href={`mailto:${PUBLIC_DOMAIN_EMAIL}`} class="text-blue-400 hover:underline">
						{PUBLIC_DOMAIN_EMAIL}
					</a>
				</span>
			</div>
		</div>
	</footer>
</div>
